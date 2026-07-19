import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CitizenDashboardNav from "./CitizenDashboardNav";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaUserCog, FaSave } from "react-icons/fa";

function UpdateProfile() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = () => {
    setLoading(true);
    setMessage("");

    axios
      .put(`/users/edit/${user.id}`, user)
      .then((response) => {
        setMessage("Profile Updated Successfully!");
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Failed to update profile. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">
      <CitizenDashboardNav />

      <div className="pt-28 flex justify-center px-6">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-custom-border shadow-sm p-8 space-y-8">

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-center text-2xl mx-auto shadow-sm">
              <FaUserCog />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
              Update Profile
            </h2>
            <p className="text-slate-500 text-sm">
              Manage your personal information and contact details
            </p>
          </div>

          {message && (
            <div className={`p-4 rounded-2xl text-center font-semibold text-sm border ${
              message.includes("Successfully")
                ? "bg-blue-50 text-primary border-blue-200"
                : "bg-red-50 text-red-500 border-red-200"
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <FaUser className="text-sm" />
                </span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <FaEnvelope className="text-sm" />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <FaPhone className="text-sm" />
                </span>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="address">
                Primary Address
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-4 text-slate-400">
                  <FaMapMarkerAlt className="text-sm" />
                </span>
                <textarea
                  id="address"
                  name="address"
                  value={user.address || ""}
                  onChange={handleChange}
                  rows="3"
                  placeholder="House No, Street, Landmark, Area, City, Pincode"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 resize-none transition-all duration-300 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <FaLock className="text-sm" />
                </span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium"
                />
              </div>
            </div>

            <button
              onClick={updateProfile}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white font-bold py-3.5 rounded-2xl transition duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer text-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
