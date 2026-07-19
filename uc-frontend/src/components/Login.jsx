import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import logo from "../assets/vite.svg";
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", form);

      console.log(res.data);

      if (res.status === 200 || res.status === 201) {
        setResponse("Login Successful! Redirecting...");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setTimeout(() => {
          const userRole = res.data.user.role;
          if (userRole === "citizen") {
            navigate("/citizen-dashboard");
          } else if (userRole === "admin") {
            navigate("/admin-dashboard");
          } else if (userRole === "worker") {
            navigate("/worker-dashboard");
          }
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid Email or Password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-slate-800 to-primary flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-secondary/15 blur-3xl -z-10"></div>

      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors duration-200"
      >
        <FaArrowLeft className="text-sm" />
        Back to Home
      </Link>

      <div className="w-full max-w-md bg-transparent">

        <div className="flex justify-center items-center mb-8">
          <Link to="/">
            <img src={logo} alt="B1K Services Logo" className="h-24 w-auto mx-auto object-contain transition-all duration-300 hover:scale-105" />
          </Link>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-black/25">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 mt-2 text-sm">Please enter your credentials to login</p>
          </div>

          {response && (
            <div className="mb-6 p-4 bg-blue-950/50 border border-blue-500/30 rounded-2xl text-center text-light-blue font-semibold text-sm animate-fadeIn">
              {response}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-950/50 border border-red-500/30 rounded-2xl text-center text-red-400 font-semibold text-sm animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleform}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                  <FaLock />
                </span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleform}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white font-bold py-3.5 rounded-2xl transition duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer text-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <FaSignInAlt />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-light-blue hover:text-blue-300 font-semibold transition-colors duration-200">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
