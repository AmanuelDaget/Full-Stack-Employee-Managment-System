const express=require("express");
const cors=require("cors");
const app=express();
const AdminRouter=require("./routes/adminRouter.js");
const EmployeeRouter=require("./routes/employeeRouter.js");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(cookieParser());

app.use('/auth',AdminRouter);
app.use('/employee',EmployeeRouter);

app.use(express.static('Public'));

// to verify that the user already login

const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;
    if(token){
        jwt.verify(token,"jwt_secret_key",(err,decoded)=>{
            if(err) return res.json({Status:false,Error:"Wrong token"})
            else{
                req.id=decoded.id;
                req.role=decoded.role;
                next();
            }
        })
    }else{
        return res.json({Status:false,Error:"Can not authenticate token"})
    }
}

app.get('/verify',verifyUser,(req,res)=>{
    return res.json({Status:true,role:req.role,id:req.id});
})


app.listen('3001',()=>{
    console.log("Server is running successfully on port 3001");
});