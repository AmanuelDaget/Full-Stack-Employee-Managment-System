import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

export const EmployeProfile=()=>{
    const [employee,setEmployee]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3001/employee/employee_detail/"+id)
            .then(res=>{
                setEmployee(res.data.Result)
            })
            .catch(err=>console.log(err));
    })
    const handleLogout=()=>{
        axios.get("http://localhost:3001/employee/employee_logout")
            .then(res=>{
                if(res.data.Status){
                    localStorage.removeItem("isLogin")
                    navigate("/")
                }else{
                    console.log("Error to logout")
                }
            })
            .catch(err=>console.log(err));
    }
  return (
    <div>
        <div className='header d-flex justify-content-center p-2 shadow'>
            <h2 id='headerText'>Employee Management System</h2>
        </div>
        <div className='employeeInfoContainer d-flex flex-column justify-content-center align-items-center mt-3'>
            <img src={`http://localhost:3001/Images/`+ employee.image} className='employee_profile_image mt-3' alt='' />
            <div className='employeeInfoTextContainer d-flex align-items-center flex-column mt-5'>
                <h5 className='employeeInfo mt-2'><strong>Name: </strong>{employee.name}</h5>
                <h5 className='employeeInfo mt-2'><strong>Email: </strong>{employee.email}</h5>
                <h5 className='employeeInfo mt-2'><strong>Salary: $</strong>{employee.salary}</h5>
            </div>
            <div className='d-flex mt-5'> 
                <button type='button' className='btn btn-primary px-4 me-5'>Edit </button>
                <button type='button' className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
    
  )
}
