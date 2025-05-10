import React from 'react'
import { useState } from 'react'

function Signup() {
  const[username,setUsername] = useState("")
  const[password,setPassword] = useState("")
  console.log(username)
  console.log(password)
  const handelLogin = async () => {
    axios.post("http://localhost:7000/api/add-role", {username,password})
  }

return (
  <div>
    <h1>SignUp</h1>
    <input type="text" onChange={(e) => setUsername(e.target.value)}/>
    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={handelLogin}>SignUp</button>
  </div>
)
}

export default Signup