import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Allpost from "./AllPost/Allpost";
import authService from "../Appwrite/Auth";
import { login, logout } from "../Store/AuthSlice";
import Loader from "./Loader";


export const Home = () => {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
   const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader />
   
  ) : (
    <div>
      {authStatus ? (
        <div className="w-full  ">
          <div className="flex flex-wrap ">
            <Allpost />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[450px]">
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to read posts
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
