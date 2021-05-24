import React, {useEffect} from 'react';
import {io} from "socket.io-client";
export const privateSocket = io("/private") // fetch to the path
import {useSelector} from 'react-redux';
// import {useHistory} from "react-router-dom"
import "./Messaging.css"

function Messaging(){
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state.session.user)



    return(
        <>
        <form onSubmit={sendChat}>
            <input
                value={chatInput}
                onChange={updateChatInput}
            />
            <button type="submit">Send</button>
        </form>
        </>
    )
}
export default Messaging;
