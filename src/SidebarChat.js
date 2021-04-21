import { Avatar } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import './SidebarChat.css';
import db from './Firebase';
import { Link } from 'react-router-dom';
export default function SidebarChat({id, name, addnewchat}) {
    const [seed,setSeed] = useState('');
    const [messages,setMessages] = useState("");
    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map(doc =>doc.data()))
            ));
        }
    },[id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const createChat =()=>{
        const roomName = prompt('Please Enter Your Good Name');
        if(roomName){
            db.collection('rooms').add({
                name:roomName,
            })
        }
    };

    return !addnewchat ? (
        <Link to ={`/rooms/${id}`}>
            <div className="sidebarchat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarchat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarchat">
            <h2>Add New Chat</h2>
        </div>
    );
}
