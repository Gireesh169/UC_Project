import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (form.password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/users/signup", form);

      console.log(res.data);

      if (res.status === 200 || res.status === 201) {
        setResponse("Account Created Successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleform}
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <select name="role" value={form.role} onChange={handleform}>
          <option value="">Select Role</option>
          <option value="citizen">Customer</option>
          <option value="admin">Admin</option>
          <option value="worker">Worker</option>
        </select>

        <button type="submit">Signup</button>
      </form>

      {error && <p>{error}</p>}
      {response && <p>{response}</p>}
    </div>
  );
};

export default SignUp;
