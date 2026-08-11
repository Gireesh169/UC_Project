import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaClipboardList,
  FaSearch,
  FaFilter,
  FaSort,
  FaEye,
  FaUserCheck,
  FaTrashAlt,
  FaCalendarAlt,
  FaRupeeSign,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTools,
  FaExclamationTriangle,
  FaArrowLeft,
  FaDownload,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import ConfirmationModal from "../common/ConfirmationModal";

const AdminBookingManagement = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Assign Technician Modal State
  const [assignModal, setAssignModal] = useState({
    isOpen: false,
    bookingId: null,
    selectedTechId: "",
    loading: false,
  });

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    bookingId: null,
    loading: false,
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchFilteredBookings();
  }, [searchQuery, statusFilter, serviceFilter, minPrice, maxPrice, startDate, endDate, sortBy]);

  const fetchInitialData = async () => {
    try {
      const [techRes, servRes] = await Promise.all([
        axios.get("/technicians/all"),
        axios.get("/services/all"),
      ]);
      setTechnicians(techRes.data || []);
      setServices(servRes.data || []);
    } catch (err) {
      console.error("Failed to load metadata", err);
    }
  };

  const fetchFilteredBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("query", searchQuery);
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (serviceFilter !== "ALL") params.append("serviceId", serviceFilter);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (sortBy) params.append("sortBy", sortBy);

      const res = await axios.get(`/booking/search?${params.toString()}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.put(`/booking/${bookingId}/status?status=${newStatus}`);
      fetchFilteredBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update booking status.");
    }
  };

  const handleAssignTechnician = async () => {
    if (!assignModal.selectedTechId) return;
    setAssignModal((prev) => ({ ...prev, loading: true }));
    try {
      await axios.put(`/booking/${assignModal.bookingId}/assign/${assignModal.selectedTechId}`);
      fetchFilteredBookings();
      setAssignModal({ isOpen: false, bookingId: null, selectedTechId: "", loading: false });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign technician.");
      setAssignModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteBooking = async () => {
    setDeleteModal((prev) => ({ ...prev, loading: true }));
    try {
      await axios.delete(`/booking/${deleteModal.bookingId}`);
      fetchFilteredBookings();
      setDeleteModal({ isOpen: false, bookingId: null, loading: false });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete booking.");
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "COMPLETED":
      case "REVIEWED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "IN_PROGRESS":
      case "TECHNICIAN_ACCEPTED":
        return "bg-blue-100 text-blue-800 border-blue-300 animate-pulseLight";
      case "TECHNICIAN_ASSIGNED":
      case "ASSIGNED":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "PENDING":
      default:
        return "bg-amber-100 text-amber-800 border-amber-300";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-navy text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/admin-dashboard"
            className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm transition-colors"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <h1 className="text-lg font-bold text-light-blue uppercase tracking-wider hidden sm:block">
            Professional Booking Control
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Title Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight flex items-center gap-3">
              <FaClipboardList className="text-primary text-2xl" /> Detailed Booking Cards
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Search, filter, assign technicians, and inspect complete customer service history.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 block uppercase">Total Found</span>
            <span className="text-2xl font-extrabold text-primary">{bookings.length} Bookings</span>
          </div>
        </div>

        {/* Multi-Field Search & Filter Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search ID, Customer, Tech, Phone, Email, Address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary text-sm font-medium"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary text-sm font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">PENDING</option>
                <option value="TECHNICIAN_ASSIGNED">TECHNICIAN ASSIGNED</option>
                <option value="TECHNICIAN_ACCEPTED">TECHNICIAN ACCEPTED</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            {/* Service Category Filter */}
            <div>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary text-sm font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL">All Services</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-primary"
              />
              <span className="text-slate-400 text-xs font-bold">-</span>
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-primary"
              />
            </div>

            {/* Date Filters */}
            <div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 outline-none"
              />
            </div>

            <div>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 outline-none"
              />
            </div>

            {/* Sorting Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 text-primary rounded-2xl outline-none text-sm font-bold cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="highestPrice">Sort: Highest Price</option>
                <option value="lowestPrice">Sort: Lowest Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Booking Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
            <FaClipboardList className="mx-auto text-4xl text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700">No Bookings Found</h3>
            <p className="text-slate-500 text-sm">No bookings match your current search and filter settings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookings.map((b) => {
              const baseP = b.basePrice || b.service?.basePrice || 0;
              const issueP = b.issuePrice || b.issue?.price || b.totalPrice || 0;
              const finalP = b.finalPrice || b.totalPrice || baseP + issueP;

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                >
                  {/* Card Top Banner */}
                  <div className="bg-navy text-white p-6 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center font-mono font-bold text-sm">
                        #{b.id}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-white">{b.service?.name || "Appliance Service"}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <FaCalendarAlt className="text-[10px]" /> {formatDate(b.bookingDate)}
                        </p>
                      </div>
                    </div>

                    <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border shadow-xs ${getStatusBadgeStyle(b.status)}`}>
                      {b.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-6 flex-1">
                    {/* Service & Issue Info */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4">
                      <img
                        src={b.issue?.imageUrl || b.service?.imageUrl || "/default-service.png"}
                        alt="Service graphic"
                        className="w-16 h-16 rounded-xl object-cover border shrink-0 bg-white"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=256&q=80";
                        }}
                      />
                      <div className="space-y-1 flex-1">
                        <h4 className="font-bold text-navy text-sm">{b.issue?.title || "Standard Breakdown Repair"}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{b.issue?.description || b.service?.description}</p>
                      </div>
                    </div>

                    {/* Customer Info Card Section */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                        <FaUser className="text-primary" /> Customer Details
                      </h4>
                      <div className="grid grid-cols-2 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-400 font-semibold block">Name</span>
                          <span className="font-bold text-slate-800">{b.user?.name || "Customer"}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold block">Phone</span>
                          <span className="font-semibold text-slate-700">{b.user?.phone || "N/A"}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 font-semibold block">Email</span>
                          <span className="font-medium text-slate-650 truncate block">{b.user?.email || "N/A"}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 font-semibold block">Address</span>
                          <span className="font-medium text-slate-700 block leading-relaxed">{b.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Technician Info Card Section */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                        <FaUserCheck className="text-emerald-600" /> Technician Details
                      </h4>
                      {b.technician ? (
                        <div className="grid grid-cols-2 gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-xs">
                          <div>
                            <span className="text-slate-400 font-semibold block">Technician Name</span>
                            <span className="font-bold text-emerald-900">{b.technician.name}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block">Phone</span>
                            <span className="font-semibold text-emerald-800">{b.technician.phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block">Experience</span>
                            <span className="font-semibold text-slate-700">{b.technician.experience} Years</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block">Skills</span>
                            <span className="font-semibold text-slate-700 truncate block">{b.technician.skills}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center justify-between">
                          <span className="font-bold">No Technician Assigned Yet</span>
                          <button
                            onClick={() => setAssignModal({ isOpen: true, bookingId: b.id, selectedTechId: "", loading: false })}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs cursor-pointer"
                          >
                            Assign Now
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Pricing Breakdown Snapshot */}
                    <div className="bg-navy/5 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-600">
                        <span>Base Service Price:</span>
                        <span className="font-bold">₹{baseP}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-600">
                        <span>Issue Repair Price:</span>
                        <span className="font-bold">₹{issueP}</span>
                      </div>
                      {b.gst > 0 && (
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span>GST (18%):</span>
                          <span className="font-semibold">₹{b.gst}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-slate-300 flex justify-between items-center">
                        <span className="font-extrabold text-navy text-sm">Final Price:</span>
                        <span className="font-extrabold text-primary text-base">₹{finalP}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {/* Update Status dropdown */}
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusUpdate(b.id, e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer shadow-xs"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="TECHNICIAN_ASSIGNED">ASSIGNED</option>
                        <option value="TECHNICIAN_ACCEPTED">ACCEPTED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>

                      <button
                        onClick={() => setAssignModal({ isOpen: true, bookingId: b.id, selectedTechId: b.technician?.id || "", loading: false })}
                        className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer text-xs font-bold flex items-center gap-1"
                        title="Assign Technician"
                      >
                        <FaUserCheck /> Assign
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/booking/${b.id}`)}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <FaEye /> View Details
                      </button>

                      <button
                        onClick={() => setDeleteModal({ isOpen: true, bookingId: b.id, loading: false })}
                        className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer text-xs"
                        title="Delete Booking"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Assign Technician Modal */}
      {assignModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-6">
            <h3 className="text-xl font-bold text-navy flex items-center gap-2">
              <FaUserCheck className="text-emerald-600" /> Assign Technician to Booking #{assignModal.bookingId}
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">Select Skilled Worker</label>
              <select
                value={assignModal.selectedTechId}
                onChange={(e) => setAssignModal({ ...assignModal, selectedTechId: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary text-sm font-semibold text-slate-800"
              >
                <option value="">Choose Technician...</option>
                {technicians.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.skills} ({t.experience} Yrs) {t.available ? "✅ Available" : "⚠️ Busy"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setAssignModal({ isOpen: false, bookingId: null, selectedTechId: "", loading: false })}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignTechnician}
                disabled={assignModal.loading || !assignModal.selectedTechId}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary-hover disabled:bg-slate-300 shadow-md cursor-pointer"
              >
                {assignModal.loading ? "Assigning..." : "Confirm Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Booking Record?"
        message={`Are you sure you want to delete Booking #${deleteModal.bookingId}? This operation will permanently remove the record.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        loading={deleteModal.loading}
        onConfirm={handleDeleteBooking}
        onCancel={() => setDeleteModal({ isOpen: false, bookingId: null, loading: false })}
      />
    </div>
  );
};

export default AdminBookingManagement;
