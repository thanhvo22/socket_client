import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {io} from 'socket.io-client';
import './Join.css';

const socket = io('localhost:3001');

export const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleJoinRoom = ()=>{
    socket.emit('join',{name, room})
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} onClick={handleJoinRoom} type="submit">Join Room</button>
        </Link>
      </div>
    </div>
  );
}