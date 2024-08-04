import ReactDOM from 'react-dom/client';
import './index.css';
import Home from "./views/Home/Home.js";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);
