import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaLink } from "react-icons/fa";
import api from "../api/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);

    try {
      const { data: response } = await api.post(
        "/api/auth/public/register",
        data
      );

      reset();

      navigate("/login");

      toast.success("Registration Successful!");
    } catch (error) {
      console.log(error);

      toast.error("Registration Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex justify-center items-center px-4 py-10">

      <form
        onSubmit={handleSubmit(registerHandler)}
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
            Create your{" "}
            <span className="text-blue-600">
              LinkForge
            </span>{" "}
            account
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Start creating and managing your shortened URLs.
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

          {/* Email */}
          <TextField
            label="Email"
            required
            id="email"
            type="email"
            message="*Valid email is required"
            placeholder="Enter your email"
            register={register}
            errors={errors}
            pattern={{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            }}
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

        {/* Register Button */}
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
          <FaUserPlus />

          {loader ? "Creating Account..." : "Create Account"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              font-semibold
              text-blue-600
              hover:text-blue-700
              transition-colors
            "
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default RegisterPage;