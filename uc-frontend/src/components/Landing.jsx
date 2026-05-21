import { memo, useState } from "react";
import reactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-10 bg-blue-600 text-white">
        <img
          src="src/assets/react.svg"
          alt="Flezo Logo"
          className="h-10 w-auto"
        />
        <h1 className="text-2xl font-bold">WELCOME TO FLEZO</h1>

        <ul className="flex gap-6">
          <li>
            <a
              href="/login"
              className="hover:text-yellow-300 transition duration-300"
            >
              Login
            </a>
          </li>

          <li>
            <a
              href="/signup"
              className="hover:text-yellow-300 transition duration-300"
            >
              Signup
            </a>
          </li>
        </ul>
      </div>
      <div>About us</div>
    </>
  );
}
