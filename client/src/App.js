import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminLogin } from './components/adminLogin';
import {createBrowserRouter,createRoutesFromElements,Route,Outlet,RouterProvider } from 'react-router-dom';
import { Dashboard } from './components/dashboard';
import { Emplyee } from './components/employee';
import { Category } from './components/category';
import { Profile } from './components/profile';
import {AddCategory } from './components/addCategory';
import AddEmployee from './components/addEmployee';
import EditEmployee from './components/editEmployee';
import { AdminHome } from './components/adminHome';
import {Home} from './components/home';
import { EmployeeLogin } from './components/employeeLogin';
import { EmployeProfile } from './components/employeeprofile';
import { PrivateRoute } from './components/privateRoute';

function App() {
  const router=createBrowserRouter(
     createRoutesFromElements(
        <Route path='/' element={<Root />} >
           <Route index element={<Home/>} />
           <Route path='employeelogin' element={<EmployeeLogin />} />
           <Route path='adminlogin' element={<AdminLogin />} />
           <Route path='employeeprofile/:id' element={
               <PrivateRoute>
                  <EmployeProfile />
               </PrivateRoute>
            } />
           <Route path='dashboard' element={
               <PrivateRoute>
                  <Dashboard />
               </PrivateRoute>
               
           }>
              <Route index element={<AdminHome />} />
              <Route path='employee' element={<Emplyee />} />
              <Route path='category' element={<Category />} />
              <Route path='profile' element={<Profile />} />
              <Route path='add_category' element={<AddCategory />} />
              <Route path='add_employee' element={<AddEmployee />} />
              <Route path='edit_employee/:id' element={<EditEmployee />} />
           </Route>
        </Route>
     )
  )
  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;

const Root=()=>{
  return(
    <>
       <Outlet />
    </>
  )
}