import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import logo from "../assets/vite.svg";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaUserPlus, FaArrowLeft, FaKey } from "react-icons/fa";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  
  // OTP Verification state
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (form.password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return false;
    }

    // Password strength regex: min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)");
      return false;
    }

    // Phone number regex: 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setError("Phone number must be exactly 10 numeric digits");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Step 1: POST /auth/send-otp (DO NOT insert into User table)
      const res = await axios.post("/auth/send-otp", {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      });

      if (res.status === 200 || res.status === 201) {
        setResponse("OTP sent successfully! Please enter the 6-digit verification code sent to your email.");
        setShowOtpStep(true);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const firstErr = Object.values(err.response.data.errors)[0];
        setError(firstErr);
      } else {
        setError("Something went wrong while sending OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("");

    if (!/^[0-9]{6}$/.test(otp)) {
      setError("OTP must be exactly 6 numeric digits");
      return;
    }

    setOtpLoading(true);

    try {
      // Step 2: POST /auth/verify-otp (Only now creates User entity)
      const res = await axios.post("/auth/verify-otp", {
        email: form.email,
        otp: otp,
      });

      if (res.status === 200) {
        setResponse("Registration Successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid or expired OTP verification code.");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setResponse("");
    try {
      await axios.post("/auth/resend-otp", { email: form.email });
      setResponse("A new 6-digit OTP code has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
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
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {showOtpStep ? "Verify Email OTP" : "Create Account"}
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              {showOtpStep ? `Enter the 6-digit code sent to ${form.email}` : "Sign up for B1K Services to book home repair services"}
            </p>
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

          {!showOtpStep ? (
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
                    onChange={handleFormChange}
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
                    placeholder="john@gmail.com"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="phone">
                  Phone Number (10 Digits)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                    <FaPhone className="text-sm" />
                  </span>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    maxLength={10}
                    placeholder="9999999999"
                    value={form.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="address">
                  Service Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                    <FaMapMarkerAlt className="text-sm" />
                  </span>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Hyderabad"
                    value={form.address}
                    onChange={handleFormChange}
                    required
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="password">
                  Password (Min 8 chars, Uppercase, Lowercase, Number, Special)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                    <FaLock className="text-sm" />
                  </span>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password@123"
                    value={form.password}
                    onChange={handleFormChange}
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
                    placeholder="Password@123"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white placeholder-slate-600 transition-all duration-300 text-sm"
                  />
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
                    Register & Send OTP
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1" htmlFor="otp">
                  Enter 6-Digit Verification Code
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                    <FaKey className="text-sm" />
                  </span>
                  <input
                    id="otp"
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-white text-center text-xl tracking-widest font-mono transition-all duration-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={otpLoading}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/60 text-white font-bold py-3 rounded-2xl transition duration-300 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {otpLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Verify & Complete Registration"
                )}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                className="w-full text-slate-400 hover:text-white text-xs font-medium text-center transition-colors duration-200 mt-2"
              >
                Didn't receive code? Resend OTP
              </button>
            </form>
          )}

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
