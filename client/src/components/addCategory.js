import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AddCategory=()=> {
    const [category,setCategory] = useState();
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/auth/add_category',{category})
            .then(res=>{
                if(res.data.Status){
                    navigate("/dashboard/category");
                }else{
                    alert(res.data.Error)
                }
            })
           .catch(err=>{
                console.log(err);
            })
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='addCatagoryContainer p-3 rounded w-25% border px-5 bg-white'>
                <h3 className='text-center m-3'>Add Category</h3>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category" className='my-2'><b>Category:</b></label>
                        <input type="text" name="category" placeholder="Enter category" autoComplete='off'
                               className='form-control rounded-0'
                               onChange={(e)=>setCategory(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Add Category</button>
                </form>
            </div>
        </div>
  )
}
