import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      path: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <nav className="flex">
        <div className="ml-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className="flex ml-auto">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                {" "}
                <button
                  className="inline-block font-medium sm:px-6 px-2 sm:text-[16px] text-[15px] py-2 duration-200 hover:bg-blue-100 rounded-full"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
