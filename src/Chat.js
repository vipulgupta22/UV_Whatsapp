import { Avatar,IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router';
import './Chat.css';
import db from './Firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';
export default function Chat() {
    const [input,setInput] = useState('');
    const [seed,setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName,setRoomname] = useState('');
    const [messages,setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomname(snapshot.data().name)
            ))
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    },[roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [])
    const sendMessage =(e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last Seen{" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map(message =>(
                    <p className={`chat_message ${message.name===user.displayName && 'chat_receiver'}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticon/>
                <form action="">
                    <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type Your Message" type="text"/>
                    <button onClick={sendMessage} type="sumbit">Send a Message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}
