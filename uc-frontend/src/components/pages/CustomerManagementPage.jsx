import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaUserTie,
  FaSearch,
  FaArrowLeft,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaUserCheck,
  FaSignInAlt
} from "react-icons/fa";

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/customers");
      setCustomers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch customer details", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Customer Directory & Profiles
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight flex items-center gap-3">
              <FaUserTie className="text-primary text-2xl" /> Customer Profiles & History
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Inspect citizen registration dates, total booking counts, reviews given, and active account statistics.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 block uppercase">Total Registered</span>
            <span className="text-2xl font-extrabold text-primary">{customers.length} Customers</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search by customer name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-primary text-sm font-medium shadow-xs"
          />
        </div>

        {/* Customer Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
            <FaUserTie className="mx-auto text-4xl text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700">No Customers Found</h3>
            <p className="text-slate-500 text-sm">No citizen accounts matched your search phrase.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((cust) => (
              <div
                key={cust.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-6 group hover:-translate-y-1"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-center text-2xl font-bold shrink-0">
                    👤
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors truncate">
                      {cust.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-semibold block">
                      Member since {formatDate(cust.registrationDate)}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-xs bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaEnvelope className="text-slate-400" />
                    <span className="truncate">{cust.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaPhoneAlt className="text-slate-400" />
                    <span>{cust.phone || "No Phone Recorded"}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 pt-1">
                    <FaMapMarkerAlt className="text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{cust.address || "Address not provided"}</span>
                  </div>
                </div>

                {/* Booking Stats Pills */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50/70 p-2.5 rounded-xl border border-blue-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total</span>
                    <span className="text-base font-extrabold text-primary">{cust.totalBookings}</span>
                  </div>
                  <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase block">Done</span>
                    <span className="text-base font-extrabold text-emerald-700">{cust.completedBookings}</span>
                  </div>
                  <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100">
                    <span className="text-[10px] font-bold text-amber-600 uppercase block">Pending</span>
                    <span className="text-base font-extrabold text-amber-700">{cust.pendingBookings}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Reviews: <strong className="text-slate-700">{cust.reviewsGiven}</strong></span>
                  <button
                    onClick={() => setSelectedCustomer(cust)}
                    className="bg-navy hover:bg-primary text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
                  >
                    Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center text-xl font-bold">
                  👤
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-navy">{selectedCustomer.name}</h3>
                  <span className="text-xs text-slate-400">Customer ID: #{selectedCustomer.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Email</span>
                  <span className="font-semibold text-slate-800 break-all">{selectedCustomer.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Phone</span>
                  <span className="font-semibold text-slate-800">{selectedCustomer.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Registration Date</span>
                  <span className="font-semibold text-slate-800">{formatDate(selectedCustomer.registrationDate)}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Last Activity / Login</span>
                  <span className="font-semibold text-slate-800">{formatDate(selectedCustomer.lastLogin)}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 font-bold block uppercase">Address</span>
                  <span className="font-medium text-slate-700 block leading-relaxed">{selectedCustomer.address || "No address saved"}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                  <span className="text-xs font-bold text-slate-500 block">Total Orders</span>
                  <span className="text-xl font-black text-primary">{selectedCustomer.totalBookings}</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <span className="text-xs font-bold text-emerald-600 block">Completed</span>
                  <span className="text-xl font-black text-emerald-700">{selectedCustomer.completedBookings}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                  <span className="text-xs font-bold text-amber-600 block">Pending</span>
                  <span className="text-xl font-black text-amber-700">{selectedCustomer.pendingBookings}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-navy hover:bg-primary shadow-md cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementPage;
