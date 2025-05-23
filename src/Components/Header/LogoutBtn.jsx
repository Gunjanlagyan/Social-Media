import React from "react";
import authService from "../../Appwrite/Auth";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/AuthSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <button
      className="inline-block sm:px-6 px-2 sm:text-[16px] text-[15px]  font-medium py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
