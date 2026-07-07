import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTools, FaFileAlt, FaDollarSign, FaImage, FaArrowLeft, FaPlusCircle } from "react-icons/fa";

const ServiceCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceCreation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8080/services/create", formData);

      setSuccess(true);
      setMessage("Service Created Successfully!");

      setFormData({
        name: "",
        description: "",
        basePrice: "",
      });
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setMessage("Failed to Create Service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center p-6 relative">
      
      {/* Back Button */}
      <Link 
        to="/admin-dashboard" 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-505 hover:text-teal-650 font-bold transition-colors cursor-pointer text-sm"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden mt-8">
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-655 flex items-center justify-center text-white text-lg">
              <FaPlusCircle />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Create New Service</h1>
          </div>
          <p className="text-slate-400 text-sm pl-13">
            Configure a new appliance service category for customer booking
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          {message && (
            <div
              className={`mb-6 p-4 rounded-2xl text-center font-semibold text-sm border ${
                success
                  ? "bg-teal-50 text-teal-750 border-teal-200"
                  : "bg-red-50 text-red-750 border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleServiceCreation} className="space-y-6">
            
            {/* Service Name */}
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="name">
                Service Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <FaTools className="text-sm" />
                </span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Example: Air Conditioner"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-450 transition-all text-sm font-medium"
                />
              </div>
              <p className="text-xs text-slate-450 mt-1.5 pl-1">
                Ensure name matches predefined categories to load assets automatically
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="description">
                Description
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-4 text-slate-400">
                  <FaFileAlt className="text-sm" />
                </span>
                <textarea
                  id="description"
                  rows="4"
                  name="description"
                  placeholder="Provide a short description of repairing scope..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-450 resize-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="basePrice">
                Base Price (₹)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">
                  ₹
                </span>
                <input
                  id="basePrice"
                  type="number"
                  name="basePrice"
                  placeholder="299"
                  value={formData.basePrice}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-450 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Dynamic Asset Info Block */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FaImage className="text-teal-650 text-base" />
                Category Graphic Pre-matching
              </h3>
              <p className="text-xs text-slate-550 leading-relaxed">
                Flezo includes built-in illustration assets. Creating a service matching one of the names below links details automatically:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-650 pt-1">
                <div>✔ Air Conditioner</div>
                <div>✔ Refrigerator</div>
                <div>✔ Washing Machine</div>
                <div>✔ Television</div>
                <div>✔ Fan</div>
                <div>✔ Water Purifier</div>
                <div>✔ Microwave</div>
                <div>✔ Geyser</div>
              </div>
            </div>

            {/* Action Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-650 hover:bg-teal-700 disabled:bg-teal-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-teal-600/10 transition duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Create Service"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceCreation;
