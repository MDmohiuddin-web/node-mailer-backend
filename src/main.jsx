import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Test from "./Components/Test.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Home from "./Pages/Home.jsx";
import AuthProvider from "./AUTHPROVIDER/AuthProvider.jsx";
import Signin from "./UserAuth/Signin.jsx";
import Profile from "./UserAuth/Profile.jsx";
import Sigup from "./UserAuth/Sigup.jsx";
import Dataform from "./Components/Dataform.jsx";
import Calpine from "./Pages/Calpine.jsx";
import Massages from "./Pages/Massages.jsx";
import SmtpPage from "./Pages/SmtpPage.jsx";
import Setting from "./Pages/Setting.jsx";
import LIsts from "./Pages/LIsts.jsx";
import AddUser from "./Components/AddUser.jsx";

import AddStuent from "./Components/AddStuent.jsx";
import Student from "./Components/Student.jsx";
import SmtpAdd from "./Components/SmtpAdd.jsx";
import SmtpUpdate from "./Components/SmtpUpdate.jsx";

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
        path: "/Calpine",
        element: <Calpine></Calpine>,
      },
      {
        path: "/messages",
        element: <Massages></Massages>,
      },
      {
        path: "/SmtpPage",
        element: <SmtpPage></SmtpPage>,
      },
      {
        path: "lists",
        element: <LIsts></LIsts>,
      },
      {
        path: "/setting",
        element: <Setting></Setting>,
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
      },
      {
        path: "/sendmail",
        element: <Dataform></Dataform>,
      },
      {
        path: "/AddUser",
        element: <AddUser></AddUser>,
      },
      {
        path: "/addStudent",
        element: <AddStuent></AddStuent>,
      },
      {
        path: "/Student",
        element: <Student></Student>,
      },
      {
        path: "/SmtpAdd",
        element: <SmtpAdd></SmtpAdd>,
      },
      {
        path: "/SmtpUpdate/:id",
        element: <SmtpUpdate></SmtpUpdate>,
      },{
        path:'/SendEmail',
        element:<Test></Test>
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
