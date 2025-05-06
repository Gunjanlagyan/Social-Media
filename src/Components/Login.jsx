import React, { useState } from "react";
import Logo from "./Logo";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Appwrite/Auth";
import { login as storeLogin } from "../Store/AuthSlice";
import { useDispatch } from "react-redux";
import Loaderwithtext from "./Loaderwithtext";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          setLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/5">
          <Loaderwithtext text="Login..." />
        </div>
      )}
      <div
        className={`flex items-center justify-center w-full ${
          loading ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div
          className={`my-5 mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {/* form submission code */}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email: "
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Enter your email address",
                  },
                })}
              />
              <p className="text-red-600 mt-8 text-center">
                {" "}
                {errors.email?.message}
              </p>

              <Input
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: {
                    value: true,
                    message: " Enter your password",
                  },
                })}
              />
              <p className="text-red-600 mt-8 text-center">
                {" "}
                {errors.password?.message}
              </p>
              {error && (
                <p className="text-red-600 mt-8 text-center">{error}</p>
              )}
              <Button type="submit" classname="w-full">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
