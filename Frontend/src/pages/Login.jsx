import axios from 'axios';
import React, { useState } from 'react'

function Login() {
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const handelLogin = async () => {
        axios.post("http://localhost:7000/api/check-user",{user,pass})
        
    }
  return (
    <div>
        <h1>LOGIN PAGE</h1>
        <input type="text"  onChange={(e) => setUser(e.target.value)}/>
        <input type="password" onChange={(e) => setPass(e.target.value)} />
        <button onClick={handelLogin}>Login</button>
    </div>
  )
}

export default Login