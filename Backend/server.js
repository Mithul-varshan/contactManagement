const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const app = express()
const db = require("./src/config/db") 
const PORT  = process.env.PORT || 9000;

app.use(cors());
app.use(bodyparser.json())
app.use(express.json())

app.post("/api/add-role",(req,res) => {
    const {username,password} = req.body;
    const query = `insert into signup (username,password) values(?,?)`;
    db.query(query,[username,password], (err) => {
        if(err){
            console.log(err)
            return res.status(500).json({error : "Something went wrong"})
        }
        else{
            res.status(200).json({message : "user details added successfully"})
        }
    })

})

app.post("/api/check-user",(req,res) => {
    const{user,pass} = req.body;
    const query = `select * from signup where username = ? and password = ?`;
    db.query(query,[user,pass],(err,result) => {
        if(err){
            console.log(err);
            return res.status(500).json({error : "Database Error"})
        }
        if(result.length >0){
            res.status(200).json({message : "Login Successful"})
        }
        else{
            res.status(401).json({error:"Invalid cedentials"})
        }
    })
})




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})