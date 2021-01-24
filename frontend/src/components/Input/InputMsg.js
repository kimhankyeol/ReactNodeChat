import React from "react";
import { Input } from "antd";
import { SendOutlined } from '@ant-design/icons'
const InputMsg = ({ message, setMessage, sendMessage })=>{ 
    return(
        <>
            <Input.Search placeholder="입력해주세요" defaultValue={message} onChange={(e)=>{setMessage(e.target.value)}} onPressEnter={(e)=>{sendMessage(e)}} enterButton={<SendOutlined />} />
        </>
    )
}
export default InputMsg;

