import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee=()=> {
    const [category,setCategory]=useState([]);
    const {id} =useParams();
    const [employee,setEmployee]=useState({
        name:'',
        email:'',
        category_id:'',
        address:'',
        salary:'',
    });
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

        axios.get('http://localhost:3001/auth/employee/'+id)
           .then(res=>{
              setEmployee({
                ...employee,
                name:res.data.Result[0].name,
                email:res.data.Result[0].email,
                address:res.data.Result[0].address,
                salary:res.data.Result[0].salary
            })
           }).catch(err=>console.log(err))
    },[]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put('http://localhost:3001/auth/update_employee/'+id,employee)
            .then(res=>{
                if(res.data.Status){
                    navigate("/dashboard/employee");
                }else{
                    alert(res.data.Error)
                }
            })
            .catch(err=>console.log(err))
    }
  return (
 <div className='d-flex justify-content-center align-items-center mt-5'>
    <div className='editContainer p-3 w-50 rounded border bg-white'>
        <h3 className='text-center'>Edit Employee</h3>
        <form className='row g-1' onSubmit={handleSubmit}>
            <div className='col-12'>
                <label htmlFor="name" className='form-label'><b>Name</b></label>
                <input type="text" placeholder="Enter name" id='name' className='form-control rounded-0'
                        value={employee.name}
                        onChange={(e)=>setEmployee({...employee,name:e.target.value})} 
                />
            </div>
            <div className='col-12'>
                <label htmlFor="email" className='form-label'><b>Email</b></label>
                <input type="email" placeholder="Enter email" id='email' className='form-control rounded-0' autoComplete="off"
                     onChange={(e)=>setEmployee({...employee,email:e.target.value})}
                     value={employee.email}
                />
            </div>
            <div className='col-12'>
                <label htmlFor="salary" className='form-label'><b>Salary</b></label>
                <input type="text" placeholder="Enter salary" id='salary' className='form-control rounded-0'
                    onChange={(e)=>setEmployee({...employee,salary:e.target.value})}
                    value={employee.salary}
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
                    value={employee.address}
                />
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-0'>Update Employee</button>
        </form>
    </div>
</div>
  )
}

export default EditEmployee;