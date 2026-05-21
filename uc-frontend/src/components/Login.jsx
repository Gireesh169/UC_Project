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
          if (res.data.role === "citizen") {
            navigate("/citizen-dashboard");
          } else if (res.data.role === "admin") {
            navigate("/admin-dashboard");
          } else if (res.data.role === "worker") {
            navigate("/worker-dashboard");
          }
        }, 1000);
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

     
        {response && (
          <p className="text-green-600 text-center mb-3">{response}</p>
        )}

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleform}
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleform}
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
