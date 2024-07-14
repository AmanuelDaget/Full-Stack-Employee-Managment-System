import axios from "axios";
import React, { useEffect, useState } from "react";
import './style.css';

export const AdminHome = () => {
    const [adminTotal, setAdminTotal] = useState(0);
    const [employeeTotal, setEmployeeTotal] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        adminCount();
        employeeCount();
        totalSalaryCount();
        adminList();
    }, []);

    const adminCount = () => {
        axios.get("http://localhost:3001/auth/admin_count")
            .then(res => {
                if (res.data.Status) {
                    setAdminTotal(res.data.Result);
                } else {
                    console.log(res.data.Error);
                }
            });
    };

    const employeeCount = () => {
        axios.get("http://localhost:3001/auth/employee_count")
            .then(res => {
                if (res.data.Status) {
                    setEmployeeTotal(res.data.Result);
                } else {
                    console.log(res.data.Error);
                }
            });
    };

    const totalSalaryCount = () => {
        axios.get("http://localhost:3001/auth/total_salary")
            .then(res => {
                if (res.data.Status) {
                    setTotalSalary(res.data.Result);
                } else {
                    console.log(res.data.Error);
                }
            });
    };

    const adminList = () => {
        axios.get("http://localhost:3001/auth/admin_list")
            .then(res => {
                if (res.data.Status) {
                    setAdmins(res.data.Result);
                } else {
                    console.log(res.data.Error);
                }
            });
    };

    return (
        <div className="allAdminHomeContainer container-fluid m-4">
            <div className="row d-flex justify-content-around mt-5 w-75">
                <div className="card col-md-3 col-sm-12 px-3 pt-2 pb-3 border shadow-sm mb-3">
                    <div className="text-center pb-1">
                        <h5>Admin</h5>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h6>Total:</h6>
                        <h6>{adminTotal}</h6>
                    </div>
                </div>
                <div className="card  col-md-3 col-sm-12 px-3 pt-2 pb-3 border shadow-sm mb-3">
                    <div className="text-center pb-1">
                        <h5>Employee</h5>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h6>Total:</h6>
                        <h6>{employeeTotal}</h6>
                    </div>
                </div>
                <div className="card  col-md-3 col-sm-12 px-3 pt-2 pb-3 border shadow-sm mb-3">
                    <div className="text-center pb-1">
                        <h5>Salary</h5>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h6>Total:</h6>
                        <h6>${totalSalary}</h6>
                    </div>
                </div>
            </div>
            <div className="table-container mt-4 pt-3">
                <h3 className="table-header-text mb-3">List of Admins</h3>
                <table className="adminListTable table w-75">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map(a => (
                            <tr key={a.id}>
                                <td>{a.email}</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-primary me-3">Edit</button>
                                    <button className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
