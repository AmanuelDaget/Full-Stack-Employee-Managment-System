import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Emplyee=()=>{
    const [employee,setEmployee]=useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:3001/auth/employee')
           .then(res=>{
                if(res.data.Status){
                    setEmployee(res.data.Result);
                }else{
                    alert(res.data.Error)
                }
            })
           .catch(err=>{
                console.log(err);
            })
    },[]);
    const handleDelete=(id)=>{
        axios.delete("http://localhost:3001/auth/delete_employee/"+id)
            .then(res=>{
                if(res.data.Status){
                    window.location.reload();
                }else{
                    console.log(res.data.Error)
                }
            })
    }
    return(
        <div className="px-5 mt-5 w-75">
            <div className="d-flex justify-content-center">
                <h4 className="fw-bold">Emplyoyees</h4>
            </div>
            <Link to='/dashboard/add_employee' className="btn btn-success mt-4">Add Employee</Link>
            <div className="mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Address</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map(e=>(
                            
                            <tr key={e.id}>
                                <td><img src={`http://localhost:3001/Images/` + e.image} className="employee_image" alt=""/></td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.salary}</td>
                                <td>{e.address}</td>
                                <td className="d-flex justify-content-center align-items-center">
                                    <Link to={`/dashboard/edit_employee/` + e.id} className="btn btn-primary me-2">Edit</Link>
                                    <button onClick={()=>handleDelete(e.id)} className="btn btn-danger">Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}