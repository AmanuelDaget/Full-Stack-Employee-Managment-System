import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const EmployeeLogin=()=> {
    const [error,setError] = useState(null);
    const [values,setValues]=useState({
        email:'',
        password:''
    });
    const navigate=useNavigate();

    axios.defaults.withCredentials=true;
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post("http://localhost:3001/employee/employee_login",values)
            .then(res=>{
                if(res.data.loginStatus){
                    window.localStorage.setItem("isLogin",true);
                    navigate('/employeeprofile/'+res.data.id);
                }else{
                    setError(res.data.Error);
                }
            })
            .catch(err=>console.log(err));
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25% border loginForm'>
        <div className='text-warning text-center '>
            {error && error}
        </div>
        <h1 className='text-center'>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Enter email" autoComplete='off'
                       className='form-control rounded-0'
                       onChange={(e)=>setValues({...values,email:e.target.value})}
                />
            </div>
            <div  className='mb-3'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Enter password"
                       className='form-control rounded-0'
                       onChange={(e)=>setValues({...values,password:e.target.value})}
                />
            </div>
            <div  className='mb-3'>
               <input type='checkbox' name='tick' className='me-2' id='tick' />
               <label htmlFor='tick'>You are agree with the terms and conditions</label>
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
        </form>
    </div>
</div>
  )
}
