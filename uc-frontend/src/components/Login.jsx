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
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleform}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleform}
        />

        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
      {response && <p>{response}</p>}
    </div>
  );
};

export default Login;
