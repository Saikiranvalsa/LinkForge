import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi";
import { FaLink, FaSignInAlt } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { setToken } = useStoreContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    setLoader(true);

    try {
      // Call backend login API
      const { data: response } = await api.post(
        "/api/auth/public/login",
        data
      );

      // Backend returns JWT token
      console.log("JWT TOKEN:", response);

      // Store token in Context
      setToken(response);

      // Store token in localStorage
      localStorage.setItem(
        "JWT_TOKEN",
        JSON.stringify(response)
      );

      toast.success("Login Successful!");

      reset();

      // Navigate to Dashboard
      navigate("/dashboard");

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      toast.error("Login Failed!");

    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex justify-center items-center px-4 py-10">

      <form
        onSubmit={handleSubmit(loginHandler)}
        className="
          w-full
          max-w-md
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-xl
          shadow-slate-900/5
          p-6
          sm:p-8
        "
      >

        {/* Logo */}
        <div className="flex justify-center mb-5">

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-blue-50
              flex
              items-center
              justify-center
            "
          >
            <FaLink className="text-blue-600 text-xl" />
          </div>

        </div>

        {/* Heading */}
        <div className="text-center">

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome to{" "}
            <span className="text-blue-600">
              LinkForge
            </span>
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Login to manage your shortened URLs and analytics.
          </p>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-6" />

        {/* Form Fields */}
        <div className="flex flex-col gap-4">

          {/* Username */}
          <TextField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          {/* Password */}
          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            min={6}
            errors={errors}
          />

        </div>

        {/* Login Button */}
        <button
          disabled={loader}
          type="submit"
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-blue-400
            disabled:cursor-not-allowed
            text-white
            font-semibold
            py-3
            rounded-xl
            shadow-lg
            shadow-blue-600/20
            transition-all
            duration-200
            mt-5
          "
        >
          <FaSignInAlt />

          {loader ? "Signing In..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-slate-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              font-semibold
              text-blue-600
              hover:text-blue-700
              transition-colors
            "
          >
            Create an account
          </Link>

        </p>

      </form>

    </div>
  );
};

export default LoginPage;