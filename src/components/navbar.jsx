import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/context";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-100 rounded-lg px-4">
      <Link to="/">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome/{user.username}/</li>

            <li>
              <Link to="/add-task">Add Task </Link>
            </li>

            <li>
              <Link to="/tasks">Tasks </Link>
            </li>

            <li>
              <Link to="/" onClick={() => logout()}>
                Logout{" "}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="px-2" to="/login">
                Login{" "}
              </Link>
              <Link to="/register">Register </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
