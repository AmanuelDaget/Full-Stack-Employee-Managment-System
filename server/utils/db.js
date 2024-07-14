const mysql=require("mysql");

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'fullstackemployeems'
})

con.connect((err)=>{
    if(err) console.log("Connection error");
    else console.log("Database connected");
})

module.exports=con;