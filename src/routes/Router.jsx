import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Users from "../../pages/Users/Users";
import Products from "../../pages/Products/Products";
import User from "../../pages/Users/User";
import Product from "../../pages/Products/Product";
import Home from "../../pages/Home/Home";

const Router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>,
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