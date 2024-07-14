const express=require("express");
const router=express.Router();
const con=require('../utils/db.js');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const path=require("path");
const multer=require("multer");

router.post('/adminlogin',(req,res)=>{
    const sql="SELECT * FROM admin WHERE email=? AND password=?";
    con.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:"Query error!!!"});
        if(result.length > 0){
            const email=result[0].email;
            const token=jwt.sign({role:'admin',email:email,id:result[0].id},"jwt_secret_key",{expiresIn:'1d'});
            res.cookie("token",token);
            return res.json({loginStatus:true})
        }else{
            return res.json({loginStatus:false,Error:"Incorrect email or passeword"})
        }
    })
});

router.get('/category',(req,res)=>{
     const sql="SELECT *FROM category";
     con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query error"})
        else return res.json({Status:true,Result:result});
     })
})
// image upload

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Public/Images")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})
const upload=multer({
    storage:storage
})

// Add Employees 

router.post('/add_employee',upload.single('profilePic'),(req,res)=>{
    const sql=`INSERT INTO employee (name,email,password,salary,address,image,category_id) VALUES (?)`;
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hashing error"});
        else {
            const values=[
                req.body.name,
                req.body.email,
                hash,
                req.body.salary,
                req.body.address,
                req.file.filename,
                req.body.category_id
            ]
            con.query(sql,[values],(err,result)=>{
                if(err) return res.json({Status:false,Error:"Query Error"});
                else return res.json({Status:true,Result:result});
            })
        }
    })
})
// Get Employees

router.get("/employee",(req,res)=>{
    const sql="SELECT *FROM employee";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error to fetch employees"});
        else return res.json({Status:true,Result:result});
    })
})

// Edit Employee
router.get("/employee/:id",(req,res)=>{
    const id=req.params.id;
    const sql="SELECT *FROM employee WHERE id=?";
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error to fetch employee by id"});
        else return res.json({Status:true,Result:result});
    })
})

// Update Employee

router.put('/update_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql=`UPDATE employee  SET name=?,email=?,salary=?,address=?,category_id=? WHERE id=?`;
    const values=[
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ];

    con.query(sql,[...values,id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query error to update employee"});
        else return res.json({Status:true,Result:result});
    })
})

// Add catagory for employees like Manager , IT

router.post('/add_category',(req,res)=>{
    const sql="INSERT INTO category (name) VALUES (?)";
    con.query(sql,[req.body.category],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query error"});
        else return res.json({Status:true})
    })
})

// Delete Employee 

router.delete('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql="DELETE FROM employee WHERE id=?";
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error to delete the employee"});
        else return res.json({Status:true,Result:result});
    })

})

// Admin count

router.get('/admin_count',(req,res)=>{
    const sql="SELECT COUNT(id) AS admin FROM admin";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error to count number of admin"});
        else return res.json({Status:true,Result:result[0].admin});
    })
})

// Employee count

router.get('/employee_count',(req,res)=>{
    const sql="SELECT COUNT(id) AS employee FROM employee";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error to count number of admin"});
        else return res.json({Status:true,Result:result[0].employee});
    })
})

// Total salry

router.get('/total_salary',(req,res)=>{
    const sql="SELECT SUM(salary) AS total_salary FROM employee";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error to count number of admin"});
        else return res.json({Status:true,Result:result[0].total_salary});
    })
})

// List Admins 

router.get('/admin_list',(req,res)=>{
    const sql="SELECT *FROM admin";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error to count number of admin"});
        else return res.json({Status:true,Result:result});
    })
})

// Logout

router.get('/logout',(req,res)=>{
    res.clearCookie("token");
    return res.json({Status:true});
})




module.exports=router;
