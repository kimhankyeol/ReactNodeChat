import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Typography } from "antd";
import MessageList from "../Message/MessageList";
import InputMsg from "../Input/InputMsg";
import "./Chat.css";
import io from "socket.io-client";

let socket;

const Chat = ({location})=>{
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState("");

    const serverUrl = "http://localhost:4002";
    useEffect(() => {
     
        // 다시 정리
        const { name, room } = queryString.parse(location.search);
    
        socket = io(serverUrl); // 소켓 연결
    
        setName(name);
        setRoom(room);
    
        //socket.emit  join 하면 server.js 에 있는  socket.on join이 이벤트를 받음
        socket.emit("join", { name, room }, (error) => {
          // console.log("error");
          // 에러 처리
          if (error) {
            alert(error);
          }
        });
    
        // return () => {
        //   socket.emit("disconnect");
    
        //   socket.off();
        // };
    }, [serverUrl, location.search]); // 방입장시 한번만 부름 

    useEffect(() => {
        // 서버에서 message 이벤트가 올 경우에 대해서 `on`
        socket.on("message", (message) => {
          setMessages([...messages, message]);
        });
    
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, [messages]);
    
     // 메세지 보내기 함수
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit("sendMessage", message, setMessage(""));
        }
    };


    return(
        <>
            <div className="chatScreen">
                <div className="chatHeadTitle">
                    <Typography>
                        <Typography.Title level={5}>Chat</Typography.Title>
                    </Typography>
                </div>
                <div className="chatBodyMessage">
                    <MessageList messages={messages} name={name}/>
                </div>
                <div className="chatFootInput">
                    <InputMsg 
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </div>
            </div>
        </>
    )
}
export default Chat;