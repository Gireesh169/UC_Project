import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaTools,
  FaFileAlt,
  FaImage,
  FaArrowLeft,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaToggleOn,
  FaToggleOff,
  FaExclamationCircle
} from "react-icons/fa";
import { AVAILABLE_IMAGES } from "../../utils/availableImages";
import ConfirmationModal from "../common/ConfirmationModal";

const ServiceCreation = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    imageUrl: "",
    active: true,
  });

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    serviceId: null,
    serviceName: "",
    loading: false,
  });

  const presetImages = AVAILABLE_IMAGES;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/services/all");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load services", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingService(null);
    setFormData({
      name: "",
      description: "",
      basePrice: "",
      imageUrl: "",
      active: true,
    });
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || "",
      description: service.description || "",
      basePrice: service.basePrice || "",
      imageUrl: service.imageUrl || "",
      active: service.active !== undefined ? service.active : true,
    });
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Client-side validations
    if (!formData.name.trim()) {
      setErrorMsg("Service name cannot be empty.");
      setFormLoading(false);
      return;
    }
    if (parseFloat(formData.basePrice) < 0) {
      setErrorMsg("Base price cannot be negative.");
      setFormLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        basePrice: parseFloat(formData.basePrice),
      };

      if (editingService) {
        await axios.put(`/services/update/${editingService.id}`, payload);
        setSuccessMsg(`Service '${formData.name}' updated successfully!`);
      } else {
        await axios.post("/services/create", payload);
        setSuccessMsg(`Service '${formData.name}' created successfully!`);
      }

      fetchServices();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1200);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to save service details.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (service) => {
    try {
      await axios.patch(`/services/status/${service.id}?active=${!service.active}`);
      fetchServices();
    } catch (err) {
      console.error("Failed to toggle service status", err);
    }
  };

  const promptDeleteService = (service) => {
    setConfirmModal({
      isOpen: true,
      serviceId: service.id,
      serviceName: service.name,
      loading: false,
    });
  };

  const handleConfirmDelete = async () => {
    setConfirmModal((prev) => ({ ...prev, loading: true }));
    try {
      await axios.delete(`/services/delete/${confirmModal.serviceId}`);
      fetchServices();
      setConfirmModal({ isOpen: false, serviceId: null, serviceName: "", loading: false });
    } catch (err) {
      console.error("Failed to delete service", err);
      setConfirmModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-navy text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm transition-colors"
            >
              <FaArrowLeft /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-lg font-bold text-light-blue uppercase tracking-wider hidden sm:block">
            Admin Service Management
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Title Bar & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight flex items-center gap-3">
              <FaTools className="text-primary text-2xl" /> Home Appliance Services
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Manage service categories, base prices, descriptions, and active statuses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 transition-all duration-300 flex items-center gap-2 text-sm cursor-pointer hover:-translate-y-0.5"
            >
              <FaPlusCircle /> Add New Service
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search services by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-primary text-sm font-medium shadow-xs"
          />
        </div>

        {/* Service Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
            <FaTools className="mx-auto text-4xl text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700">No Services Found</h3>
            <p className="text-slate-500 text-sm">
              {searchTerm ? "No services matched your search term." : "Click 'Add New Service' to create your first category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                {/* Service Image Header */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={service.imageUrl || "/default-service.png"}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                        service.active
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {service.active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-navy/80 text-white font-extrabold px-3 py-1 rounded-xl text-sm backdrop-blur-xs">
                    Base: ₹{service.basePrice}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleStatus(service)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                        service.active
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      title="Toggle Active/Inactive Status"
                    >
                      {service.active ? <FaToggleOn className="text-base text-emerald-600" /> : <FaToggleOff className="text-base" />}
                      {service.active ? "Disable" : "Enable"}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(service)}
                        className="p-2.5 rounded-xl bg-blue-50 text-primary hover:bg-primary hover:text-white transition-all cursor-pointer text-sm"
                        title="Edit Service"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => promptDeleteService(service)}
                        className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer text-sm"
                        title="Soft Delete Service"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-100 space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-navy flex items-center gap-2">
                <FaTools className="text-primary" />
                {editingService ? "Edit Service Category" : "Create New Service Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-semibold flex items-center gap-2">
                <FaExclamationCircle /> {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-semibold flex items-center gap-2">
                <FaCheckCircle /> {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. AC Repair & Servicing"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed explanation of what this service covers..."
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Base Price (₹) *</label>
                <input
                  type="number"
                  name="basePrice"
                  step="0.01"
                  min="0"
                  value={formData.basePrice}
                  onChange={handleChange}
                  placeholder="299"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              {/* Image Input Options */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <label className="block text-xs font-bold text-navy">Service Display Image</label>
                {formData.imageUrl && (
                  <div className="h-32 w-full rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Paste Image URL:</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Or Choose Preset Graphic:</label>
                  <div className="grid grid-cols-3 max-h-40 overflow-y-auto p-1 gap-2 border border-slate-200 rounded-xl bg-white">
                    {presetImages.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                        className={`p-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all text-xs ${
                          formData.imageUrl === preset.url
                            ? "border-primary bg-blue-50 text-primary font-bold"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-5 h-5 rounded-md object-cover" />
                        <span className="truncate text-[10px]">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded-md"
                />
                <label htmlFor="active" className="text-sm font-semibold text-slate-700 cursor-pointer">
                  Service is Active & Bookable
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary-hover shadow-md cursor-pointer flex items-center gap-2"
                >
                  {formLoading ? "Saving..." : editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Soft Delete */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title="Soft Delete Service?"
        message={`Are you sure you want to delete '${confirmModal.serviceName}'? Existing customer bookings will not be broken, and the service will be marked inactive.`}
        confirmText="Yes, Soft Delete"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, serviceId: null, serviceName: "", loading: false })}
      />
    </div>
  );
};

export default ServiceCreation;
