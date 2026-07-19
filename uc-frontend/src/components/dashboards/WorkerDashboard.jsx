import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import logo from "../../assets/vite.svg";
import {
  FaTools,
  FaUserCircle,
  FaSignOutAlt,
  FaIdCard,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaPlay,
  FaTasks
} from "react-icons/fa";

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [technician, setTechnician] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnician();
  }, []);

  const fetchTechnician = async () => {
    try {
      const techResponse = await axios.get(
        `/technicians/user/${user.id}`,
      );
      console.log("Technician:", techResponse.data);
      setTechnician(techResponse.data);
      if (techResponse.data?.id) {
        fetchBookings(techResponse.data.id);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchBookings = async (technicianId) => {
    try {
      const response = await axios.get(
        `/booking/technician/${technicianId}`,
      );
      console.log("Bookings:", response.data);
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `/booking/${bookingId}/status?status=${status}`,
      );
      if (technician?.id) {
        fetchBookings(technician.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-custom-bg flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm text-slate-500 font-semibold">Loading Worker Panel...</span>
        </div>
      </div>
    );
  }

  const totalJobs = bookings.length;
  const activeJobs = bookings.filter(b => b.status === "IN_PROGRESS").length;
  const completedJobs = bookings.filter(b => b.status === "COMPLETED").length;
  const pendingJobs = bookings.filter(b => b.status === "ASSIGNED").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "IN_PROGRESS":
        return "text-primary bg-blue-50 border-blue-150";
      case "ASSIGNED":
      default:
        return "text-amber-700 bg-amber-50 border-amber-100";
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">

      <header className="sticky top-0 z-50 bg-navy text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="B1K Services Logo" className="h-14 w-auto object-contain transition-all duration-300 hover:scale-105" />
            </Link>
            <div className="border-l border-slate-700 pl-3 hidden sm:block">
              <span className="text-sm font-bold tracking-wider text-light-blue uppercase">Worker Workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/complete-technician-profile"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-slate-800 rounded-xl hover:bg-slate-800 hover:text-white transition-colors duration-200"
            >
              <FaIdCard className="text-light-blue" />
              {technician ? "Profile Settings" : "Complete Profile"}
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 cursor-pointer"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-10">

        <div className="bg-white border border-custom-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-primary flex items-center justify-center text-3xl">
              <FaUserCircle />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Welcome Back, {user?.name || "Technician"}</h2>
              {technician ? (
                <p className="text-slate-500 text-sm mt-1">
                  Skills: <span className="font-semibold text-slate-800">{technician.skills}</span> • Experience: <span className="font-semibold text-slate-800">{technician.experience} Years</span>
                </p>
              ) : (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  Please complete your profile to set your skills and experience.
                </p>
              )}
            </div>
          </div>
          <div className="flex sm:hidden">
            <a
              href="/complete-technician-profile"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-custom-border rounded-xl hover:bg-slate-50 transition-colors"
            >
              <FaIdCard className="text-primary" />
              {technician ? "Profile Details" : "Complete Profile"}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Assigned Jobs", val: totalJobs, icon: FaTasks, color: "text-navy bg-slate-100" },
            { label: "Pending Visits", val: pendingJobs, icon: FaClock, color: "text-amber-700 bg-amber-50" },
            { label: "In Progress", val: activeJobs, icon: FaSpinner, color: "text-primary bg-blue-50" },
            { label: "Completed", val: completedJobs, icon: FaCheckCircle, color: "text-emerald-700 bg-emerald-50" }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-custom-border rounded-2xl shadow-sm p-6 flex justify-between items-center gap-4 hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <span className="text-slate-400 text-xs md:text-sm font-semibold block">{stat.label}</span>
                <span className="text-2xl md:text-3xl font-extrabold text-navy">{stat.val}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <stat.icon className="text-xl" />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-navy mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Assigned Workorders
          </h2>

          {bookings.length === 0 ? (
            <div className="bg-white border border-custom-border rounded-3xl p-16 text-center text-slate-500 max-w-md mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <FaBriefcase className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-navy">No Jobs Assigned</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                You currently don't have any bookings assigned to you by the administrator. Take a break!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`bg-white border border-custom-border rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between border-l-4 ${
                    booking.status === "COMPLETED"
                      ? "border-l-emerald-500"
                      : booking.status === "IN_PROGRESS"
                      ? "border-l-primary"
                      : "border-l-amber-500"
                  }`}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-bold text-slate-400">ORDER #{booking.id}</span>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg md:text-xl font-bold text-navy flex items-center gap-2">
                        <FaTools className="text-primary shrink-0 text-sm" />
                        {booking.service?.name}
                      </h3>

                      <div className="space-y-1 bg-slate-50 border border-custom-border p-4 rounded-2xl text-sm">
                        <div className="font-semibold text-slate-800 flex items-center gap-2">
                          <FaBriefcase className="text-slate-500 shrink-0 text-xs" />
                          <span>Issue: {booking.issue?.title}</span>
                        </div>
                        <p className="text-slate-500 text-xs pl-6 leading-relaxed">
                          {booking.issue?.description}
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5 text-sm pt-2">
                        <FaMapMarkerAlt className="text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-slate-600 leading-relaxed">{booking.address}</span>
                      </div>
                    </div>
                  </div>

                  {booking.status !== "COMPLETED" && (
                    <div className="bg-slate-50 border-t border-custom-border px-6 py-4 flex gap-4">
                      {booking.status !== "IN_PROGRESS" && (
                        <button
                          onClick={() => updateStatus(booking.id, "IN_PROGRESS")}
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md shadow-amber-600/10 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          <FaPlay className="text-xs" />
                          Start Work
                        </button>
                      )}

                      <button
                        onClick={() => updateStatus(booking.id, "COMPLETED")}
                        className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <FaCheckCircle className="text-xs" />
                        Complete Job
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default WorkerDashboard;
