import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaUsersCog, FaTools, FaUserPlus, FaArrowLeft } from "react-icons/fa";

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
      const res = await axios.post("http://localhost:8080/auth/signup", form);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-teal-650/10 blur-3xl -z-10"></div>

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors"
      >
        <FaArrowLeft className="text-sm" />
        Back to Home
      </Link>

      <div className="w-full max-w-md my-8">
        {/* Brand */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-650 flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-600/10">
            <FaTools />
          </div>
          <span className="text-3xl font-black tracking-tight text-white">
            Fle<span className="text-teal-400">zo</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-black/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-slate-400 mt-2 text-sm">Join Flezo to manage or book repair services</p>
          </div>

          {/* Success / Error Alerts */}
          {response && (
            <div className="mb-6 p-4 bg-teal-950/50 border border-teal-500/30 rounded-2xl text-center text-teal-400 font-semibold text-sm animate-fadeIn">
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
              <label className="block text-slate-350 text-sm font-semibold mb-1" htmlFor="name">
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
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-2xl outline-none text-white placeholder-slate-650 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-350 text-sm font-semibold mb-1" htmlFor="email">
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
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-2xl outline-none text-white placeholder-slate-650 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-350 text-sm font-semibold mb-1" htmlFor="password">
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
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-2xl outline-none text-white placeholder-slate-650 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-350 text-sm font-semibold mb-1" htmlFor="confirmPassword">
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
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-2xl outline-none text-white placeholder-slate-650 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-350 text-sm font-semibold mb-1" htmlFor="role">
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
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-2xl outline-none text-white placeholder-slate-650 transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-600">Choose your role</option>
                  <option value="citizen">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="worker">Technician / Worker</option>
                </select>
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-505 pointer-events-none text-xs">
                  ▼
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 text-white font-bold py-3 rounded-2xl transition duration-300 shadow-lg shadow-teal-650/15 flex items-center justify-center gap-2 cursor-pointer text-sm"
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
            <Link to="/login" className="text-teal-400 hover:text-teal-350 font-semibold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
