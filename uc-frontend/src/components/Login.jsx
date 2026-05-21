import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();

  const handleform = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResponse("");

    try {
      const res = await axios.post("http://localhost:8080/users/login", form);

      console.log(res.data);

      if (res.status === 200 || res.status === 201) {
        setResponse("Login Successful");

        localStorage.setItem("user", JSON.stringify(res.data));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
      else{
        setResponse("Not connected to backend");
      }
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Invalid Email or Password");
      }
    }
  };

  return (
    <div className="h-screen bg-blue-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">
          Login
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-lg outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
