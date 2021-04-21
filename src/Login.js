import React from 'react'
import './Login.css';
import {Button} from '@material-ui/core';
import { auth, provider } from './Firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function Login() {
    const [{},dispatch] = useStateValue();
    const signIn = () =>{
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        }).catch((error)=>alert(error.message));
    };
    return (
        <div className="login">
            <div className="login_container">
                <img src="https://img.icons8.com/cotton/2x/whatsapp--v4.png" alt=""/>
                <div className="login_text">
                    <h1>Signin to UVWhatsapp</h1>
                </div>
                <Button onClick={signIn}>
                    Signin with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
