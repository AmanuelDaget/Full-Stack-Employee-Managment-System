import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export const Dashboard=()=>{
    const navigate=useNavigate();
    axios.defaults.withCredentials=true
    const handleLogOut=()=>{
        axios.get("http://localhost:3001/auth/logout")
            .then(res=>{
                if (res.data.Status) {
                    localStorage.removeItem("isLogin")
                    navigate("/");
                }else{
                    console.log(res.data.Error);
                }
            })
    }
    return(
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="container col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="sidebar-container d-flex flex-column align-items-center align-items-sm-start px-2 pt-2  text-white min-vh-100">
                        <Link to='/dashboard' className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
                        </Link>
                        <ul className="ul nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-start list-style-type-none">
                            <li className="w-100 pe-2">
                                <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                                   <i className="fs-4 bi-speedometer2 ms-2"></i>
                                   <span className="ms-2 d-none d-sm-inline ">Dashboard</span>
                                </Link>
                            </li>
                            <li className="w-100 pe-2">
                                <Link to="/dashboard/employee" className="nav-link text-white px-0 align-middle">
                                   <i className="fs-4 bi-people ms-2"></i>
                                   <span className="ms-2 d-none d-sm-inline ">Manage Employees</span>
                                </Link>
                            </li>
                            <li className="w-100 pe-2">
                                <Link to="/dashboard/category" className="nav-link text-white px-0 align-middle">
                                   <i className="fs-4 bi-columns ms-2"></i>
                                   <span className="ms-2 d-none d-sm-inline ">Category</span>
                                </Link>
                            </li>
                            <li className="w-100 pe-2">
                                <Link to="/dashboard/profile" className="nav-link text-white px-0 align-middle">
                                   <i className="fs-4 bi-person ms-2"></i>
                                   <span className="ms-2 d-none d-sm-inline ">Profile</span>
                                </Link>
                            </li>
                            <li className="w-100 pe-2" onClick={handleLogOut}>
                                <Link  className="nav-link text-white px-0 align-middle">
                                   <i className="fs-4 bi-power ms-2"></i>
                                   <span className="ms-2 d-none d-sm-inline ">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="content p-0 m-0">
                    <div className="content-header p-2  shadow">
                        <h3 className="fw-bold mx-5">Employee Management System</h3>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}