import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Home from "./Pages/Home.jsx";
import AuthProvider from "./AUTHPROVIDER/AuthProvider.jsx";
import Signin from "./UserAuth/Signin.jsx";
import Profile from "./UserAuth/Profile.jsx";
import Sigup from "./UserAuth/Sigup.jsx";
import Dataform from "./Components/Dataform.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>, 
      },
      {
        path: "/ContactUs",
        element: <Home></Home>,
      },
      {
        path: "/Login",
        element: <Signin></Signin>,
      },
      {
        path: "/Profile",
        element: <Profile></Profile>,
      },
      {
        path: "/Signup",
        element: <Sigup></Sigup>,
      },{
        path: "/sendmail",
        element:<Dataform></Dataform>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
