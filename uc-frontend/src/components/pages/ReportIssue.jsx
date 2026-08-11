import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaExclamationTriangle,
  FaTools,
  FaFileAlt,
  FaArrowLeft,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaCheckCircle,
  FaToggleOn,
  FaToggleOff,
  FaRupeeSign,
  FaExclamationCircle,
  FaFilter
} from "react-icons/fa";
import { AVAILABLE_IMAGES } from "../../utils/availableImages";
import ConfirmationModal from "../common/ConfirmationModal";

const ReportIssue = () => {
  const [issues, setIssues] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    serviceId: "",
    imageUrl: "",
    active: true,
  });

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    issueId: null,
    issueTitle: "",
    loading: false,
  });

  const issuePresets = AVAILABLE_IMAGES;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [issuesRes, servicesRes] = await Promise.all([
        axios.get("/issues/all"),
        axios.get("/services/all"),
      ]);
      setIssues(issuesRes.data || []);
      setServices(servicesRes.data || []);
    } catch (err) {
      console.error("Failed to load issue management data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingIssue(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      serviceId: services.length > 0 ? services[0].id : "",
      imageUrl: "",
      active: true,
    });
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (issue) => {
    setEditingIssue(issue);
    setFormData({
      title: issue.title || "",
      description: issue.description || "",
      price: issue.price || "",
      serviceId: issue.service ? issue.service.id : "",
      imageUrl: issue.imageUrl || "",
      active: issue.active !== undefined ? issue.active : true,
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

    if (!formData.title.trim()) {
      setErrorMsg("Issue title cannot be empty.");
      setFormLoading(false);
      return;
    }
    if (!formData.serviceId) {
      setErrorMsg("Please select a parent service category.");
      setFormLoading(false);
      return;
    }
    if (parseFloat(formData.price) < 0) {
      setErrorMsg("Issue repair price cannot be negative.");
      setFormLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        serviceId: Long(formData.serviceId),
        price: parseFloat(formData.price),
      };

      if (editingIssue) {
        await axios.put(`/issues/update/${editingIssue.id}`, payload);
        setSuccessMsg(`Issue '${formData.title}' updated successfully!`);
      } else {
        await axios.post("/issues/create", payload);
        setSuccessMsg(`Issue '${formData.title}' created successfully!`);
      }

      fetchData();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1200);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to save issue details.");
    } finally {
      setFormLoading(false);
    }
  };

  const Long = (val) => (val ? parseInt(val, 10) : null);

  const handleToggleStatus = async (issue) => {
    try {
      await axios.patch(`/issues/status/${issue.id}?active=${!issue.active}`);
      fetchData();
    } catch (err) {
      console.error("Failed to toggle issue status", err);
    }
  };

  const promptDeleteIssue = (issue) => {
    setConfirmModal({
      isOpen: true,
      issueId: issue.id,
      issueTitle: issue.title,
      loading: false,
    });
  };

  const handleConfirmDelete = async () => {
    setConfirmModal((prev) => ({ ...prev, loading: true }));
    try {
      await axios.delete(`/issues/delete/${confirmModal.issueId}`);
      fetchData();
      setConfirmModal({ isOpen: false, issueId: null, issueTitle: "", loading: false });
    } catch (err) {
      console.error("Failed to delete issue", err);
      setConfirmModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const filteredIssues = issues.filter((iss) => {
    const matchesService =
      selectedServiceFilter === "ALL" ||
      (iss.service && String(iss.service.id) === String(selectedServiceFilter));
    const matchesSearch =
      iss.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iss.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iss.service?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesService && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-navy text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/admin-dashboard"
            className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm transition-colors"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <h1 className="text-lg font-bold text-light-blue uppercase tracking-wider hidden sm:block">
            Admin Issue Management
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Title Bar & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight flex items-center gap-3">
              <FaExclamationTriangle className="text-primary text-2xl" /> Appliance Breakdown Issues
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Configure breakdown items, customize price quotes, and manage bookable issue categories.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 transition-all duration-300 flex items-center gap-2 text-sm cursor-pointer hover:-translate-y-0.5"
          >
            <FaPlusCircle /> Add New Issue Category
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search issues by title, description or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-primary text-sm font-medium shadow-xs"
            />
          </div>

          {/* Service Filter */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
            <FaFilter className="text-slate-400 text-xs" />
            <span className="text-xs font-bold text-slate-500">Filter Service:</span>
            <select
              value={selectedServiceFilter}
              onChange={(e) => setSelectedServiceFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-navy outline-none cursor-pointer"
            >
              <option value="ALL">All Services ({issues.length})</option>
              {services.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {svc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Issues Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
            <FaExclamationTriangle className="mx-auto text-4xl text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700">No Issues Found</h3>
            <p className="text-slate-500 text-sm">
              {searchTerm || selectedServiceFilter !== "ALL"
                ? "No issue breakdowns match your filter criteria."
                : "Click 'Add New Issue Category' to configure appliance repair issues."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                {/* Header Image */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={issue.imageUrl || issue.service?.imageUrl || "/default-service.png"}
                    alt={issue.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-navy/80 text-white font-bold text-xs px-3 py-1 rounded-xl backdrop-blur-xs">
                    {issue.service ? issue.service.name : "Appliance"}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                        issue.active
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {issue.active ? "ENABLED" : "DISABLED"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-xl text-sm shadow-md flex items-center gap-1">
                    <FaRupeeSign className="text-xs" /> {issue.price}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleStatus(issue)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                        issue.active
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {issue.active ? <FaToggleOn className="text-base text-emerald-600" /> : <FaToggleOff className="text-base" />}
                      {issue.active ? "Disable" : "Enable"}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(issue)}
                        className="p-2.5 rounded-xl bg-blue-50 text-primary hover:bg-primary hover:text-white transition-all cursor-pointer text-sm"
                        title="Edit Issue & Price"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => promptDeleteIssue(issue)}
                        className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer text-sm"
                        title="Soft Delete Issue"
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

      {/* Add / Edit Issue Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-100 space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-navy flex items-center gap-2">
                <FaExclamationTriangle className="text-primary" />
                {editingIssue ? "Edit Issue Category & Price" : "Configure New Breakdown Issue"}
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
                <label className="block text-sm font-semibold text-slate-700 mb-1">Parent Service Category *</label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-medium bg-white"
                >
                  <option value="">Select Service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Base: ₹{s.basePrice})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Issue Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Gas Leakage & Refilling"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Issue Description *</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed breakdown scope and diagnostics info..."
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Issue Repair Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="699"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              {/* Graphic options */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <label className="block text-xs font-bold text-navy">Issue Breakdown Display Image</label>
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
                    placeholder="https://example.com/issue-image.jpg"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Or Choose Preset Graphic:</label>
                  <div className="grid grid-cols-3 max-h-40 overflow-y-auto p-1 gap-2 border border-slate-200 rounded-xl bg-white">
                    {issuePresets.map((preset, idx) => (
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
                  id="activeIssue"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded-md"
                />
                <label htmlFor="activeIssue" className="text-sm font-semibold text-slate-700 cursor-pointer">
                  Issue Option is Active & Enabled
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
                  {formLoading ? "Saving..." : editingIssue ? "Update Issue" : "Create Issue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Soft Delete */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title="Soft Delete Issue Option?"
        message={`Are you sure you want to delete '${confirmModal.issueTitle}'? Historical customer bookings will remain intact, and this issue will be disabled for future bookings.`}
        confirmText="Yes, Soft Delete"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, issueId: null, issueTitle: "", loading: false })}
      />
    </div>
  );
};

export default ReportIssue;
