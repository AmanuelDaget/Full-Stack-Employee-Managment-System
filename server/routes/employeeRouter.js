const express=require("express");
const router=express.Router();
const con=require('../utils/db.js');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
// const { EmployeeLogin } = require("../../client/src/components/employeeLogin.js");

router.post('/employee_login',(req,res)=>{
    const sql="SELECT * FROM employee WHERE email=?";
    con.query(sql,[req.body.email],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:"Query error for employee to login!!!"});
        if(result.length > 0){
            bcrypt.compare(req.body.password,result[0].password,(err,response)=>{
               if(err) return res.json({loginStatus:false,Error:"Incorrect password !"})
                if(response){
                    const email=req.body.email;
                    const token=jwt.sign({role:"employee",email:email,id:result[0].id},"jwt_secret_key",{expiresIn:'1d'});
                    res.cookie("token",token);
                    res.json({loginStatus:true,id:result[0].id});
                }else{
                    return res.json({loginStatus:false,Error:"Incorrect password !"})
                }
            })
        }else{
            return res.json({loginStatus:false,Error:"Incorrect email or passeword"})
        }
    })
});

// Employee profile

router.get('/employee_detail/:id',(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM employee WHERE id=?";
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query error to show employee profile"});
        else return res.json({Status:true,Result:result[0]});
    })
})

// Employee Logout
router.get('/employee_logout',(req,res)=>{
    res.clearCookie('token');
    res.json({Status:true})
})
module.exports=router;