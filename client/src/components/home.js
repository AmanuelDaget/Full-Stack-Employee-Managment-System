import axios from 'axios';
import React, { useLayoutEffect } from 'react';
import { useNavigate } from'react-router-dom';

export const Home=()=> {
  const navigate=useNavigate();

  axios.defaults.withCredentials=true;
  useLayoutEffect(()=>{
     axios.get("http://localhost:3001/verify")
          .then(res=>{
           if(res.data.Status){
              if(res.data.role === "admin"){
                  navigate("/dashboard")
              }else{
                navigate("/employeeprofile/"+res.data.id)
              }
           }else{
             console.log(res.data.Error)
           }
        })
        .catch(err=>console.log(err));
  },[])
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25% border loginForm'>
        <h2 className='text-center'>Login As</h2>
        <div className='d-flex justify-content-between mt-5 mb-2 p-3'>
            <button type='button' className='btn btn-primary me-5' onClick={()=>navigate("/employeelogin")}>Employee</button>
            <button type='button' className='btn btn-success ' onClick={()=>navigate("/adminlogin")}>Admin</button>
        </div>
    </div>
</div>
  )
}
