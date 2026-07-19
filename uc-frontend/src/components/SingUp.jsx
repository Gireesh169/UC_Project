import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import logo from "../assets/vite.svg";
import { FaUser, FaEnvelope, FaLock, FaUsersCog, FaUserPlus, FaArrowLeft } from "react-icons/fa";

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

    if (form.password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    if (!form.role) {
      setError("Please select a role");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/auth/signup", form);

      console.log(res.data);

      if (res.status === 200 || res.status === 201) {
        setResponse("Account Created Successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong during signup");
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

      <div className="w-full max-w-md my-8 bg-transparent">

        <div className="flex justify-center items-center mb-6">
          <Link to="/">
            <img src={logo} alt="B1K Services Logo" className="h-24 w-auto mx-auto object-contain transition-all duration-300 hover:scale-105" />
          </Link>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-black/25">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
            <p className="text-slate-400 mt-2 text-sm">Join B1K Services to manage or book repair services</p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                  <FaUser className="text-sm" />
                </span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleform}
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                  <FaEnvelope className="text-sm" />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleform}
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                  <FaLock className="text-sm" />
                </span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleform}
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                  <FaLock className="text-sm" />
                </span>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="role">
                Select Your Role
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                  <FaUsersCog className="text-sm" />
                </span>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleform}
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-600">Choose your role</option>
                  <option value="citizen">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="worker">Technician / Worker</option>
                </select>
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 pointer-events-none text-xs">
                  ▼
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white font-bold py-3 rounded-2xl transition duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer text-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <FaUserPlus />
                  Sign Up
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-light-blue hover:text-blue-300 font-semibold transition-colors duration-200">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
