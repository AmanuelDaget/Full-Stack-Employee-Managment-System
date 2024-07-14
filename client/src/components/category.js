import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Category=()=>{
    const [category,setCategory]=useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:3001/auth/category')
           .then(res=>{
                if(res.data.Status){
                    setCategory(res.data.Result);
                }else{
                    alert(res.data.Error)
                }
            })
           .catch(err=>{
                console.log(err);
            })
    },[]);
    return(
        <div className="px-5 mt-5">
            <div className="d-flex justify-content-center">
                <h4>Category</h4>
            </div>
            <div className="catagory-container mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="fw-bold bg-secondary text-white">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map(c=>(
                            <tr>
                                <td>{c.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to='/dashboard/add_category' className="btn btn-success">Add Category</Link>
        </div>
    )
}