import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Users from "../../pages/Users/Users";
import Products from "../../pages/Products/Products";
import User from "../../pages/Users/User";

const Router = createBrowserRouter([
    {
        path:'/',
        element: <Dashboard/>,
        children:[
            {
                path:'/users',
                element:<Users/>
            },
            {
                path:'/user/:id',
                loader: ({params})=> fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`),
                element:<User/>
            },
            {
                path:'/products',
                element:<Products/>
            },

        ]
    }
])

export default Router