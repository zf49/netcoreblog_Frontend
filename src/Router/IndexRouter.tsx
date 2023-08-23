import React from 'react'
import { Navigate, useNavigate, useRoutes } from 'react-router'
import Login from '../views/Login'
import Home from '../views/Home'



export default function IndexRouter() {


    const element = useRoutes([
        {
            path:'/login',
            element:<Login/>
        },
        {
          path:'/',
          element:<Home/>
        }
    ])





  return (
    <div>
      {element}
    </div>  )
}


