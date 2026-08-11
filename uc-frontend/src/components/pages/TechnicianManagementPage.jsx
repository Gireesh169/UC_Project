import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaUserCheck,
  FaSearch,
  FaArrowLeft,
  FaPhoneAlt,
  FaEnvelope,
  FaStar,
  FaTools,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus
} from "react-icons/fa";

const TechnicianManagementPage = () => {
  const [technicians, setTechnicians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/technicians/details");
      setTechnicians(res.data || []);
    } catch (err) {
      console.error("Failed to fetch technician details", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTechnicians = technicians.filter(
    (t) =>
      t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.skills?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone?.toLowerCase().includes(searchTerm.toLowerCase())
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
            Technician Fleet Control
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight flex items-center gap-3">
              <FaUserCheck className="text-emerald-600 text-2xl" /> Skilled Technicians Overview
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Inspect technical skills, experience ratings, availability status, and assigned vs completed jobs.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 block uppercase">Total Technicians</span>
            <span className="text-2xl font-extrabold text-primary">{technicians.length} Active</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search technician name, skill, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-primary text-sm font-medium shadow-xs"
          />
        </div>

        {/* Technician Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredTechnicians.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
            <FaUserCheck className="mx-auto text-4xl text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700">No Technicians Found</h3>
            <p className="text-slate-500 text-sm">No technician profiles matched your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechnicians.map((tech) => (
              <div
                key={tech.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-6 group hover:-translate-y-1"
              >
                {/* Avatar Header */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-xs">
                    <img
                      src={tech.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80"}
                      alt={tech.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";
                      }}
                    />
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors truncate">
                        {tech.name}
                      </h3>
                      <span className="text-xs text-amber-500 font-extrabold flex items-center gap-1">
                        <FaStar /> {tech.rating || 5.0}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          tech.available
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {tech.available ? "AVAILABLE" : "BUSY"}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{tech.experience} Yrs Exp.</span>
                    </div>
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <FaTools className="text-primary text-xs" /> Certified Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.skills ? (
                      tech.skills.split(",").map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg text-xs border border-slate-200"
                        >
                          {skill.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">General Appliance Repair</span>
                    )}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-2 text-xs bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaEnvelope className="text-slate-400" />
                    <span className="truncate">{tech.email || "System Account"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaPhoneAlt className="text-slate-400" />
                    <span>{tech.phone || "No Phone"}</span>
                  </div>
                </div>

                {/* Job Performance Stats */}
                <div className="grid grid-cols-2 gap-3 text-center pt-1 border-t border-slate-100">
                  <div className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Assigned</span>
                    <span className="text-lg font-black text-indigo-700">{tech.assignedJobs}</span>
                  </div>
                  <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase block">Completed</span>
                    <span className="text-lg font-black text-emerald-700">{tech.completedJobs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TechnicianManagementPage;
