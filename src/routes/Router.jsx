import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Register from "../components/Register";
import Login from "../components/Login";
import Dashboard from "../layouts/Dashboard";
import Products from "../pages/Dashboard/Products";
import User from "../pages/Dashboard/User";
import Users from "../pages/Dashboard/Users";
import Product from "../pages/Dashboard/Product";
import Home from "../pages/Home/Home";



const Router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        children:[
            {
              path:'/',
              element:<Home/>
            },
            {
              path:'/register',
              element:<Register/>
            },
            {
              path:'/login',
              element:<Login/>
            },
          ]
    },

    {
        path:'/dashboard',
        element: <Dashboard/>,
        children:[
            {
                path:'/dashboard/users',
                element:<Users/>
            },
            {
                path:'/dashboard/user/:id',
                loader: ({params})=> fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`),
                element:<User/>
            },
            {
                path:'/dashboard/products',
                element:<Products/>
            },
            {
                path:'/dashboard/product/:id',
                loader: ({params})=> fetch(`https://api.restful-api.dev/objects/${params.id}`),
                element:<Product/>
            },

        ]
    }
])

export default Router