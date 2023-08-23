import React from 'react'
import { Navigate, useNavigate, useRoutes } from 'react-router'
import Login from '../views/Login/Login'
import Home from '../views/Home'
import SignUp from '../views/SignUp/SignUp'



export default function IndexRouter() {


    const element = useRoutes([
        {
            path:'/login',
            element:<Login/>
        },
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        }
    ])





  return (
    <div>
      {element}
    </div>  )
}


