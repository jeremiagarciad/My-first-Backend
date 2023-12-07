import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/context";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isAuthenticated, error: signInErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    signIn(data);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signInErrors
          ? signInErrors.map((error, i) => (
              <div key={i} className="bg-red-500 p-2 text-white">
                {error}
              </div>
            ))
          : null}

        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            autoComplete="off"
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            autoComplete="off"
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <div className="flex justify-center py-2">
            <button type="submit" className="bg-blue-600 p-2 rounded-md w-full">
              Login
            </button>
          </div>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
