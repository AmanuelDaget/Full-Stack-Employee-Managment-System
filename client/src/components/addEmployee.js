import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee=()=>{
    const [employee,setEmployee]=useState({
        name:'',
        email:'',
        category_id:'',
        password:'',
        address:'',
        salary:'',
        image:''
    })
    const [category,setCategory]=useState([]);
    const navigate=useNavigate();
    
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

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('category_id', employee.category_id);
        formData.append('address', employee.address);
        formData.append('salary', employee.salary);
        formData.append('profilePic', employee.image);
        axios.post("http://localhost:3001/auth/add_employee",formData)
            .then(res=>{
                if(res.data.Status){
                    navigate("/dashboard/employee");
                }else{
                    alert(res.data.Error)
                }
            })
            .catch((err)=>console.log(err));
    }
  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 w-50 rounded border'>
                <h3 className='text-center'>Add Employee</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="name" className='form-label'><b>Name</b></label>
                        <input type="text" placeholder="Enter name" id='name' className='form-control rounded-0'
                                onChange={(e)=>setEmployee({...employee,name:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="email" className='form-label'><b>Email</b></label>
                        <input type="email" placeholder="Enter email" id='email' className='form-control rounded-0' autoComplete="off"
                             onChange={(e)=>setEmployee({...employee,email:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="password" className='form-label'><b>password</b></label>
                        <input type="password" placeholder="Enter password" id='passeword' className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,password:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="salary" className='form-label'><b>Salary</b></label>
                        <input type="text" placeholder="Enter salary" id='salary' className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,salary:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="category" className='form-label'><b>Category</b></label>
                        <select className='form-select rounded-0' id='category' name='category' 
                            onChange={(e)=>setEmployee({...employee,category_id:e.target.value})}
                        >
                            <option value=''>Select category</option>
                            {
                                category.map(c=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor="address" className='form-label'><b>Address</b></label>
                        <input type="text" placeholder="Enter address" id='address' className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,address:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="profilePic" className='form-label'><b>Select image</b></label>
                        <input type="file" name='profilePic' id='profilePic' className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,image:e.target.files[0]})}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary w-100 rounded-0'>Add Employee</button>
                </form>
            </div>
        </div>
  )
}

export default AddEmployee;