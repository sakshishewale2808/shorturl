import ReactDOM from 'react-dom/client';
import './index.css';
import Home from "./views/Home/Home.js";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
// import Signup from "./views/SignUp/SignUp.js";
// import Login from './views/Login/Login.js';
const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    // { 
    //     path:'/signup',
    //     element:<Signup/>
    //   },
    //   {
    //      path:'/login',
    //     element:<Login/>
    //   },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);
