import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { FaTools, FaFileAlt, FaImage, FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { AVAILABLE_IMAGES } from "../../utils/availableImages";

const ServiceCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const presetImages = AVAILABLE_IMAGES;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceCreation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("/services/create", formData);

      setSuccess(true);
      setMessage("Service Created Successfully!");

      setFormData({
        name: "",
        description: "",
        basePrice: "",
        imageUrl: "",
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
    <div className="min-h-screen bg-custom-bg text-custom-text flex flex-col justify-center items-center p-6 relative font-sans">

      <Link
        to="/admin-dashboard"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors duration-200 cursor-pointer text-sm"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      <div className="w-full max-w-2xl bg-white rounded-3xl border border-custom-border shadow-sm overflow-hidden mt-8">

        <div className="bg-navy text-white p-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-lg shadow-md shadow-primary/20">
              <FaPlusCircle />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Create New Service</h1>
          </div>
          <p className="text-slate-400 text-sm pl-13">
            Configure a new appliance service category with custom image for customer booking
          </p>
        </div>

        <div className="p-8">
          {message && (
            <div
              className={`mb-6 p-4 rounded-2xl text-center font-semibold text-sm border ${
                success
                  ? "bg-blue-50 text-primary border-blue-200"
                  : "bg-red-50 text-red-500 border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleServiceCreation} className="space-y-6">

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
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium"
                />
              </div>
            </div>

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
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 resize-none transition-all duration-300 text-sm font-medium"
                />
              </div>
            </div>

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
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium"
                />
              </div>
            </div>

            {/* Service Image Selection & Upload */}
            <div className="bg-slate-50 border border-custom-border rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                  <FaImage className="text-primary text-base" />
                  Service Image (Publicly Visible to Citizens & Admins)
                </h3>
                {formData.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                    className="text-xs text-red-500 font-semibold hover:underline"
                  >
                    Clear Image
                  </button>
                )}
              </div>

              {/* Live Preview Box */}
              {formData.imageUrl ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-custom-border bg-slate-200 flex items-center justify-center">
                  <img
                    src={formData.imageUrl}
                    alt="Selected Service Graphic"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "/default-service.png"; }}
                  />
                  <div className="absolute bottom-2 left-2 bg-navy/80 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-sm">
                    Image Selected Preview
                  </div>
                </div>
              ) : (
                <div className="w-full h-24 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 text-xs gap-1">
                  <FaImage className="text-lg" />
                  <span>No image selected (Will fallback to standard category asset)</span>
                </div>
              )}

              {/* Image Input Options */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Paste Image URL:</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/service-image.jpg or /AC.gas.png"
                    className="w-full px-3 py-2 bg-white border border-custom-border rounded-xl text-xs outline-none focus:border-secondary text-navy"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Local Image File:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Preset Options */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">Or Choose from Available Presets ({presetImages.length} images):</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 max-h-60 overflow-y-auto p-1 gap-2 border border-slate-200 rounded-xl bg-white">
                    {presetImages.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all text-xs ${
                          formData.imageUrl === preset.url
                            ? "border-primary bg-blue-50 text-primary font-bold shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-7 h-7 rounded-lg object-cover shrink-0 bg-slate-100"
                          onError={(e) => { e.target.src = "/default-service.png"; }}
                        />
                        <span className="truncate text-[11px] font-medium" title={preset.name}>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 transition duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm hover:-translate-y-0.5 active:translate-y-0"
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
