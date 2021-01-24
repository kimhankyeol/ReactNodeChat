import { Avatar } from "antd";
import React from "react";
import "./Message.css";
const Message = ({message,name})=>{
    let {user , text} = message;
    let isSendUser = false;
    const trimName = name.trim().toLowerCase();
    if (user === trimName) {
        isSendUser = true;
    }
    return (
        <div className="message-list-container">
            {
            user === 'admin'
            ?
                <div className="messageRoomJoin"> 
                    {text}
                </div>
            :
                (
                    isSendUser
                    ?
                    <div className="message mine">
                        <div className="msgContent">
                            {text}
                        </div>
                    </div>
                    :
                    <div className="message">
                        <div className="msgContent">
                        {name}:{text}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default Message;


    