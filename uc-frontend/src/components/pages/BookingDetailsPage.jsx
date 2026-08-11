import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaArrowLeft,
  FaClipboardList,
  FaUser,
  FaUserTie,
  FaTools,
  FaExclamationTriangle,
  FaReceipt,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaDownload,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaStar,
  FaShieldAlt
} from "react-icons/fa";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/booking/${id}`);
      setBooking(res.data);
    } catch (err) {
      console.error("Failed to load booking details", err);
      setError("Failed to load booking details with ID: " + id);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      const response = await axios.get(`/booking/${id}/invoice`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice-Booking-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to download PDF invoice.");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-500">Loading Booking Details #{id}...</span>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-xl text-center space-y-4">
          <FaExclamationTriangle className="text-4xl text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-navy">Booking Not Found</h2>
          <p className="text-sm text-slate-500">{error || "Requested booking details could not be retrieved."}</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-xl transition cursor-pointer text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const basePrice = booking.basePrice || booking.service?.basePrice || 0;
  const issuePrice = booking.issuePrice || booking.issue?.price || 0;
  const subtotal = basePrice + issuePrice;
  const gst = booking.gst || Math.round(subtotal * 0.18 * 100.0) / 100.0;
  const finalPrice = booking.finalPrice || booking.totalPrice || Math.round((subtotal + gst) * 100.0) / 100.0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Top Banner */}
      <header className="bg-navy text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm transition-colors cursor-pointer"
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-lg font-bold text-light-blue uppercase tracking-wider hidden sm:block">
            Booking Details & Breakdown
          </h1>
          <button
            onClick={handleDownloadInvoice}
            className="bg-primary hover:bg-primary-hover text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer flex items-center gap-2"
          >
            <FaDownload /> Download PDF Invoice
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Header Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-center text-2xl shrink-0">
              <FaClipboardList />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold text-navy">Booking #{booking.id}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusBadgeStyle(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-slate-500 text-sm flex items-center gap-2">
                <FaCalendarAlt className="text-xs text-primary" /> Booked on {formatDate(booking.bookingDate)}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between md:justify-end gap-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold block uppercase">Total Amount Paid</span>
              <span className="text-2xl font-black text-primary">₹{finalPrice}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid of Modern Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service & Issue Details Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-6">
              <h3 className="text-lg font-bold text-navy border-b border-slate-100 pb-3 flex items-center gap-2">
                <FaTools className="text-primary" /> Appliance & Breakdown Scope
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Service Card */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="h-36 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img
                      src={booking.service?.imageUrl || "/default-service.png"}
                      alt={booking.service?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase block">Category</span>
                    <h4 className="text-lg font-bold text-navy">{booking.service?.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{booking.service?.description}</p>
                    <div className="mt-3 text-sm font-bold text-primary">Base Price: ₹{basePrice}</div>
                  </div>
                </div>

                {/* Issue Card */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="h-36 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img
                      src={booking.issue?.imageUrl || booking.service?.imageUrl || "/default-service.png"}
                      alt={booking.issue?.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase block">Issue Breakdown</span>
                    <h4 className="text-lg font-bold text-navy">{booking.issue?.title || "Diagnostics Repair"}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{booking.issue?.description}</p>
                    <div className="mt-3 text-sm font-bold text-emerald-600">Issue Repair Fee: ₹{issuePrice}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer & Technician Details Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Customer Details Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-4">
                <h3 className="text-lg font-bold text-navy border-b border-slate-100 pb-3 flex items-center gap-2">
                  <FaUser className="text-primary" /> Customer Profile
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block">Full Name</span>
                    <span className="font-bold text-slate-800">{booking.user?.name || "Customer"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block">Email Address</span>
                    <span className="font-semibold text-slate-700 break-all">{booking.user?.email || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block">Contact Phone</span>
                    <span className="font-semibold text-slate-700">{booking.user?.phone || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block">Service Address</span>
                    <span className="font-medium text-slate-700 block leading-relaxed">{booking.address}</span>
                  </div>
                </div>
              </div>

              {/* Technician Details Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-4">
                <h3 className="text-lg font-bold text-navy border-b border-slate-100 pb-3 flex items-center gap-2">
                  <FaUserTie className="text-emerald-600" /> Technician Profile
                </h3>

                {booking.technician ? (
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                        👨‍🔧
                      </div>
                      <div>
                        <h4 className="font-bold text-navy">{booking.technician.name}</h4>
                        <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                          <FaStar /> {booking.technician.rating || 5.0} Rating
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs font-semibold block">Phone</span>
                      <span className="font-semibold text-slate-700">{booking.technician.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs font-semibold block">Experience</span>
                      <span className="font-semibold text-slate-700">{booking.technician.experience} Years</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs font-semibold block">Technical Skills</span>
                      <span className="font-semibold text-slate-700">{booking.technician.skills}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
                    <FaClock className="text-amber-600 text-2xl mx-auto" />
                    <h4 className="font-bold text-amber-800">Technician Unassigned</h4>
                    <p className="text-xs text-amber-700">Admin can assign a technician from the booking management panel.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-4">
              <h3 className="text-lg font-bold text-navy border-b border-slate-100 pb-3 flex items-center gap-2">
                <FaClock className="text-primary" /> Booking Lifecycle Timeline
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <span className="text-slate-400 font-bold block">Created</span>
                  <span className="font-semibold text-slate-700">{formatDate(booking.createdAt || booking.bookingDate)}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <span className="text-slate-400 font-bold block">Assigned</span>
                  <span className="font-semibold text-slate-700">{formatDate(booking.assignedAt)}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <span className="text-slate-400 font-bold block">Accepted</span>
                  <span className="font-semibold text-slate-700">{formatDate(booking.acceptedAt)}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <span className="text-slate-400 font-bold block">Completed</span>
                  <span className="font-semibold text-slate-700">{formatDate(booking.completedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Itemized Price Breakdown */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-6 sticky top-28">
              <h3 className="text-xl font-extrabold text-navy border-b border-slate-100 pb-4 flex items-center gap-2">
                <FaReceipt className="text-primary" /> Itemized Price Breakdown
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 font-medium">Base Service Price</span>
                  <span className="font-bold text-slate-900">₹{basePrice}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 font-medium">Issue Repair Price</span>
                  <span className="font-bold text-slate-900">₹{issuePrice}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl text-primary font-semibold">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 font-medium">GST (18%)</span>
                  <span className="font-bold text-slate-900">₹{gst}</span>
                </div>

                <div className="p-5 bg-navy text-white rounded-2xl shadow-md space-y-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Final Locked Amount</span>
                  <div className="text-3xl font-black text-light-blue">₹{finalPrice}</div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    * Final price is permanently stored in database. Future price changes will never affect this record.
                  </p>
                </div>

                <button
                  onClick={handleDownloadInvoice}
                  className="w-full mt-4 bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 transition duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <FaDownload /> Download Official Invoice PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetailsPage;
