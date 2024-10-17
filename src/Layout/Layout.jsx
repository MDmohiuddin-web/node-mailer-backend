import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Toaster } from "react-hot-toast";
// import Footer from "../../Footer/Footer";


const Layout = () => {
    return (
        <div className="capitalize">
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
            <Toaster position="top-center" reverseOrder={false} />
            
        </div>
    );
};

export default Layout;