import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaExclamationTriangle, FaTools, FaFileAlt, FaDollarSign, FaInfoCircle, FaArrowLeft } from "react-icons/fa";

const ReportIssue = () => {
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    serviceId: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/services/all");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8080/issues/create", {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        serviceId: formData.serviceId,
      });

      setSuccess(true);
      setMessage("Issue Created Successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        serviceId: "",
      });
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setMessage("Issue Creation Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center px-6 py-10 relative">
      
      {/* Back Button */}
      <Link 
        to="/admin-dashboard" 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-505 hover:text-teal-650 font-bold transition-colors cursor-pointer text-sm"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      <div className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden mt-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-655 flex items-center justify-center text-white text-lg">
              <FaExclamationTriangle />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Create Service Issue</h1>
          </div>
          <p className="text-slate-400 text-sm pl-13">
            Add a specific breakdown issue that customers can select during booking
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

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Select Service Dropdown */}
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="serviceId">
                Select Service Category
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <FaTools className="text-sm" />
                </span>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-550 focus:ring-1 focus:ring-teal-550 rounded-2xl outline-none text-slate-900 placeholder-slate-400 transition-all text-sm font-medium appearance-none cursor-pointer"
                >
                  <option value="">Choose Service category</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-455 pointer-events-none text-xs">
                  ▼
                </span>
              </div>
            </div>

            {/* Issue Title */}
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="title">
                Issue Title
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <FaExclamationTriangle className="text-sm" />
                </span>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Compressor Failure / Gas Leakage"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-450 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="description">
                Issue Description
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-4 text-slate-400">
                  <FaFileAlt className="text-sm" />
                </span>
                <textarea
                  id="description"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the diagnostics and repairing scope of this breakdown..."
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-450 resize-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="price">
                Estimated Repair Price (₹)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">
                  ₹
                </span>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="299"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-450 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FaInfoCircle className="text-teal-650" />
                Issue Guidelines
              </h3>
              <ul className="list-disc list-inside text-xs text-slate-550 space-y-1.5 pl-1">
                <li>Assign issues to correct parent service categories (e.g. AC Repair vs Television).</li>
                <li>Write short, descriptive titles like "Thermostat Repair" for clear booking cards.</li>
                <li>Set estimate pricing dynamically. Final technician quotes can adapt in-person.</li>
              </ul>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-650 hover:bg-teal-700 disabled:bg-teal-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-teal-600/10 transition duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Create Issue"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ReportIssue;
