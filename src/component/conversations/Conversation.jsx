import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation(conversation) {
  const user_id = localStorage.getItem("user");
  const [user, setUser] = useState("");
  useEffect(() => {
    const friendId = conversation.conversation.members.find(
      (m) => m !== user_id
    );
    const getUsers = async () => {
      try {
        const res = await axios.get(
          "https://shielded-river-80459.herokuapp.com/users/" + friendId
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [conversation]);

  return (
    <div>
      <div className="conversation">
        <img
          className="conversationImg"
          src="https://res.cloudinary.com/dhxlhkgog/image/upload/v1650942802/rl3tjlquwimskhybnmu7.jpg"
        />
        <span className="conversationName">{user?.email}</span>
      </div>
    </div>
  );
}
