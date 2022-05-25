import React, { useRef } from "react";
import "./messenger.css";
import { useState, useEffect } from "react";

import Message from "../../component/message/Message";
import Conversation from "../../component/conversations/Conversation";
import ChatOnline from "../../component/chatOnline/ChatOnline";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const user_id = localStorage.getItem("user");
  const [conversations, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  //tin nhan den
  const [arrivalMessage, setArrivalMessage] = useState("");

  //socket
  useEffect(() => {
    socket.current = io("https://whispering-anchorage-37001.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user_id);
    socket.current.on("getUsers", (users) => {
      console.log("users:", users);
    });
  }, [user_id]);

  //get conversation
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `https://shielded-river-80459.herokuapp.com/conversations/${user_id}`
        );
        console.log("res", res);
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user_id]);

  //get message
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "https://shielded-river-80459.herokuapp.com/messages/" + currentChat._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user_id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== user_id);

    socket.current.emit("sendMessage", {
      senderId: user_id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("https://shielded-river-80459.herokuapp.com/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <Message
                      message={message}
                      own={message.sender === user_id}
                    />
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
