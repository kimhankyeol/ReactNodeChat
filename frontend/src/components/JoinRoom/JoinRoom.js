import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const JoinRoom = ()=>{
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    return (
        <>
            <div style={{ background: 'url("./img/apart.jpg")',height:"100%"}}>
                <div className="loginForm">
                    <Form  className="loginInForm">
                        <Form.Item
                            label="사용자명"
                            name="userName"
                            rules={[
                            {
                                required: true,
                                message: '사용자명을 입력해주세요.',
                            },
                            ]}
                        >
                            <Input onChange={(e)=>{setName(e.target.value)}} />
                        </Form.Item>
                        <Form.Item
                            label="방 번호"
                            name="roomNum"
                            rules={[
                            {
                                required: true,
                                message: '방번호를 입력해주세요.',
                            },
                            ]}
                        >
                            <Input onChange={(e)=>{setRoom(e.target.value)}} />
                        </Form.Item>
                        <div style={{textAlign:"center"}}>
                            <Link
                                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                                to={`/JoinRoom/Chat?name=${name}&room=${room}`}
                            >
                                <Button type="submit">입장</Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default JoinRoom;