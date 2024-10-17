import { useContext } from "react";
import { AuthContext } from "../AUTHPROVIDER/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/IOP.png";
import userLogo from "../assets/profile.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const logout = () => {
    logOut()
      .then(() => {
        //   toast.success("sign out success full");
        // window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        //   toast.error("User logOut Unsuccessfully");
        // alert("User logOut successfully");
      });
  };

  const links = (
    <>
      <li className="">
        <NavLink to="/" className="hover:text-blue-400">
          Home
        </NavLink>
      </li>
      <li className="">
        <NavLink to="/sendmail" className="hover:text-blue-400">
        sendmail
        </NavLink>
      </li>

      <li className="">
        <NavLink to="/ContactUs" className="hover:text-blue-400">
          Contact Us
        </NavLink>
      </li>

      {user?.email ? (
        <></>
      ) : (
        <li className="">
          <NavLink to="/Login">Log in</NavLink>
        </li>
      )}
      {/*  */}
    </>
  );
  return (
    <div className="navbar mx-auto md:px-20 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} alt="" className="max-w-[100px]  rounded-md " />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">{links}</ul>
      </div>

      <div className="navbar-end">
        {/*  */}
        <div className="flex gap-5 text-black">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  // className="tooltip tooltip-left" data-tip={user?.displayName}
                  title={user?.displayName}
                  src={user?.photoURL || userLogo}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user?.email ? (
                <>
                  <li className="">
                    <NavLink to="/Profile">Profile</NavLink>
                  </li>
                  <li>
                    <Link onClick={logout}>Logout</Link>
                  </li>
                </>
              ) : (
                <li className="">
                  <NavLink to="/Login">Log in</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
