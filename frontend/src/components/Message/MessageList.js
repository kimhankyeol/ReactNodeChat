import React from "react";
import Message from "./Message/Message";
const MessageList = ({messages,name})=>{
    console.log(messages[0])
    return (
        <>
        {messages.map((message, i) => (
            <div key={i}>
                <Message message={message} name={name} />
            </div>
        ))}
        </>
    )
}
export default MessageList;


    