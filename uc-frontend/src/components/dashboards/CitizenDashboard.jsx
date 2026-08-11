import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import CitizenDashboardNav from "../pages/CitizenDashboardNav";
import {
  FaCalendarCheck,
  FaCheckDouble,
  FaHourglassHalf,
  FaStar,
  FaArrowRight,
  FaDownload,
  FaBell,
  FaLifeRing,
  FaTools,
} from "react-icons/fa";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.name || "Customer";

  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Support Ticket Modal
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketPriority, setTicketPriority] = useState("MEDIUM");
  const [ticketMsg, setTicketMsg] = useState("");

  useEffect(() => {
    if (user?.id) {
      fetchUserBookings();
      fetchNotifications();
    }
  }, [user?.id]);

  const fetchUserBookings = async () => {
    try {
      const res = await axios.get(`/booking/user/${user.id}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`/notifications/user/${user.id}`);
      setNotifications(res.data);
      const unreadRes = await axios.get(`/notifications/unread-count/${user.id}`);
      setUnreadCount(unreadRes.data.unreadCount);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const handleDownloadInvoice = async (bookingId) => {
    try {
      const response = await axios.get(`/booking/${bookingId}/invoice`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice-Booking-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to download PDF invoice.");
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tickets/create", {
        userId: user.id,
        subject: ticketSubject,
        description: ticketDesc,
        priority: ticketPriority,
      });
      setTicketMsg("Support ticket submitted successfully!");
      setTicketSubject("");
      setTicketDesc("");
      setTimeout(() => {
        setShowTicketModal(false);
        setTicketMsg("");
      }, 1500);
    } catch (err) {
      console.error("Ticket creation failed", err);
    }
  };

  const popularServices = [
    { name: "AC Repair", price: "₹299", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60" },
    { name: "TV Repair", price: "₹399", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60" },
    { name: "Refrigerator", price: "₹349", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60" },
    { name: "Washing Machine", price: "₹249", img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&auto=format&fit=crop&q=60" },
  ];

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">
      <CitizenDashboardNav />

      {/* Header Notification & Support Trigger */}
      <div className="pt-24 px-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            <FaBell className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowTicketModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
          >
            <FaLifeRing /> Raise Support Ticket
          </button>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-32 right-6 z-50 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl p-4 space-y-3">
            <h4 className="font-bold text-sm text-navy border-b pb-2">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-xs text-slate-500">No new notifications.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 text-xs">
                    <p className="font-bold text-navy">{n.title}</p>
                    <p className="text-slate-500 mt-0.5">{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Welcome Banner */}
      <div className="pt-4 px-6">
        <div className="max-w-7xl mx-auto bg-navy text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden bg-gradient-to-r from-navy via-slate-900 to-primary">
          <div className="md:max-w-2xl space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Welcome Back, <span className="text-light-blue">{userName}</span> 👋
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Book trusted home appliance services at your doorstep. Professional technicians, transparent pricing, and real-time status tracking.
            </p>
            <button
              onClick={() => navigate("/booking")}
              className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer text-sm"
            >
              Book New Service <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Bookings", val: bookings.length, icon: FaCalendarCheck, color: "text-primary bg-blue-50 border-blue-100" },
          { label: "Completed Repairs", val: bookings.filter((b) => b.status === "COMPLETED" || b.status === "REVIEWED").length, icon: FaCheckDouble, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Active Jobs", val: bookings.filter((b) => b.status !== "COMPLETED" && b.status !== "REVIEWED").length, icon: FaHourglassHalf, color: "text-amber-600 bg-amber-50 border-amber-100" },
          { label: "Average Rating", val: "4.9", icon: FaStar, color: "text-amber-500 bg-amber-50/50 border-amber-100" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-custom-border shadow-sm p-6 flex justify-between items-center gap-4">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs md:text-sm font-semibold block">{stat.label}</span>
              <span className="text-2xl md:text-3xl font-extrabold text-navy">{stat.val}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${stat.color}`}>
              <stat.icon className="text-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* PART 8 & PART 10: Active Bookings & Invoice PDF */}
      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span> My Service Bookings & PDF Invoices
        </h2>

        {bookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500">
            No bookings found. Click "Book New Service" to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400">BOOKING #{b.id}</span>
                    <h3 className="text-lg font-bold text-navy mt-1 flex items-center gap-2">
                      <FaTools className="text-primary text-sm" /> {b.service?.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-primary border border-blue-200 rounded-full text-xs font-bold">
                    {b.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl">
                  <p><strong>Issue:</strong> {b.issue?.title}</p>
                  <p><strong>Address:</strong> {b.address}</p>
                  <p><strong>Technician:</strong> {b.technician ? b.technician.name : "Assigning Soon..."}</p>
                  <p><strong>Total Price:</strong> ₹{b.totalPrice}</p>
                </div>

                {/* PDF Invoice Button */}
                <button
                  onClick={() => handleDownloadInvoice(b.id)}
                  className="w-full bg-slate-900 hover:bg-navy text-white font-bold py-2.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-xs cursor-pointer shadow-md"
                >
                  <FaDownload /> Download PDF Invoice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Services Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-navy">Popular Appliance Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularServices.map((item, index) => (
            <div key={index} className="bg-white border border-custom-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-navy">{item.name}</h3>
                <p className="text-slate-500 text-sm font-semibold">Starts From {item.price}</p>
                <button
                  onClick={() => navigate("/booking")}
                  className="w-full bg-navy hover:bg-primary text-white font-bold py-2.5 rounded-xl transition duration-300 cursor-pointer text-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-2">Raise Support Ticket</h3>
            {ticketMsg && <div className="mb-4 p-3 bg-emerald-950 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs text-center">{ticketMsg}</div>}

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Technician delayed"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Priority</label>
                <select
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm outline-none"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue..."
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
