import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaUserCheck,
  FaTools,
  FaUser,
  FaMapMarkerAlt,
  FaArrowLeft,
} from "react-icons/fa";

const TechnicianAssignment = () => {
  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bookingsRes = await axios.get(
        "/booking/pending",
      );
      const historyRes = await axios.get(
        "/booking/history",
      );
      const techRes = await axios.get("/technicians/all");

      setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
      setHistory(Array.isArray(historyRes.data) ? historyRes.data : []);
      setTechnicians(Array.isArray(techRes.data) ? techRes.data : []);
    } catch (error) {
      console.log(error);
      setBookings([]);
      setHistory([]);
      setTechnicians([]);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const assignTechnician = async (bookingId, technicianId) => {
    if (!technicianId) return;

    try {
      await axios.put(
        `/booking/${bookingId}/assign/${technicianId}`,
      );
      alert("Technician Assigned Successfully");
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Assignment Failed");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "ASSIGNED":
        return "bg-blue-50 text-secondary border-blue-150";
      case "IN_PROGRESS":
        return "bg-blue-50 text-primary border-blue-250";
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-250";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-custom-bg flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm text-slate-550 font-semibold">Loading Assignment Panel...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">

      <div className="max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <Link
          to="/admin-dashboard"
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors duration-200 cursor-pointer text-sm"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-12">

        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight flex items-center gap-3">
            <FaUserCheck className="text-primary" />
            Technician Assignment
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Assign pending workorders to certified repair experts and track progress
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-navy flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Pending Assignments
          </h2>

          <div className="bg-white border border-custom-border rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-custom-border text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Booking</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Service</th>
                    <th className="py-4 px-6">Issue</th>
                    <th className="py-4 px-6">Address</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6">Assign Expert</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm text-slate-750">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-500 font-semibold">
                        No Pending Assignments Found
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/40 transition-colors duration-200">
                        <td className="py-4 px-6 font-mono font-bold text-slate-400">#{booking.id}</td>
                        <td className="py-4 px-6 font-semibold text-navy">
                          <div className="flex items-center gap-2">
                            <FaUser className="text-slate-400 text-xs shrink-0" />
                            {booking.user?.name}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 font-bold text-navy">
                            <FaTools className="text-primary text-xs shrink-0" />
                            {booking.service?.name}
                          </div>
                        </td>
                        <td className="py-4 px-6 max-w-[150px] truncate" title={booking.issue?.title}>
                          {booking.issue?.title}
                        </td>
                        <td className="py-4 px-6 max-w-[200px] truncate" title={booking.address}>
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-slate-400 text-xs shrink-0" />
                            {booking.address}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="relative inline-block w-48">
                            <select
                              defaultValue=""
                              onChange={(e) => assignTechnician(booking.id, e.target.value)}
                              className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-xl outline-none text-slate-800 text-xs font-semibold appearance-none cursor-pointer"
                            >
                              <option value="">Select Technician</option>
                              {technicians.map((tech) => (
                                <option key={tech.id} value={tech.id}>
                                  {tech.name} ({tech.skills})
                                </option>
                              ))}
                            </select>
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 pointer-events-none text-[8px]">
                              ▼
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-navy flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Assignment History
          </h2>

          <div className="bg-white border border-custom-border rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-custom-border text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Booking</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Service</th>
                    <th className="py-4 px-6">Issue</th>
                    <th className="py-4 px-6">Assigned Technician</th>
                    <th className="py-4 px-6 text-center">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm text-slate-750">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500 font-semibold">
                        No History Found
                      </td>
                    </tr>
                  ) : (
                    history.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/40 transition-colors duration-200">
                        <td className="py-4 px-6 font-mono font-bold text-slate-400">#{booking.id}</td>
                        <td className="py-4 px-6 font-semibold text-navy">
                          <div className="flex items-center gap-2">
                            <FaUser className="text-slate-400 text-xs shrink-0" />
                            {booking.user?.name}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 font-bold text-navy">
                            <FaTools className="text-primary text-xs shrink-0" />
                            {booking.service?.name}
                          </div>
                        </td>
                        <td className="py-4 px-6 max-w-[150px] truncate" title={booking.issue?.title}>
                          {booking.issue?.title}
                        </td>
                        <td className="py-4 px-6 font-semibold text-navy">
                          <div className="flex items-center gap-2">
                            <FaUserCheck className="text-primary text-xs shrink-0" />
                            {booking.technician?.name || (
                              <span className="text-red-400 font-semibold italic text-xs">Not Assigned</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechnicianAssignment;
