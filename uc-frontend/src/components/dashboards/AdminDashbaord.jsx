import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import logo from "../../assets/vite.svg";
import {
  FaTools,
  FaExclamationTriangle,
  FaUserTie,
  FaClipboardList,
  FaPlusCircle,
  FaArrowRight,
  FaUserCheck,
  FaSignOutAlt,
  FaUserPlus,
  FaLifeRing,
  FaHistory,
  FaRupeeSign,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTechnicians: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedJobs: 0,
    bookingsToday: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  });

  const [activeTab, setActiveTab] = useState("overview"); // overview, addTech, tickets, auditLogs

  // Add Technician Form State
  const [techForm, setTechForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: 2,
    tempPassword: "",
    available: true,
  });
  const [techMsg, setTechMsg] = useState("");
  const [techErr, setTechErr] = useState("");
  const [techLoading, setTechLoading] = useState(false);

  // Support Tickets State
  const [tickets, setTickets] = useState([]);
  
  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/admin/analytics");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load analytics", err);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get("/tickets/all");
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to load tickets", err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await axios.get("/admin/audit-logs");
      setAuditLogs(res.data);
    } catch (err) {
      console.error("Failed to load audit logs", err);
    }
  };

  const handleTechFormChange = (e) => {
    setTechForm({ ...techForm, [e.target.name]: e.target.value });
  };

  const handleCreateTechnician = async (e) => {
    e.preventDefault();
    setTechMsg("");
    setTechErr("");
    setTechLoading(true);

    try {
      const res = await axios.post("/admin/technicians", techForm);
      setTechMsg(`Technician '${res.data.name}' created successfully! Welcome email sent.`);
      setTechForm({
        name: "",
        email: "",
        phone: "",
        skills: "",
        experience: 2,
        tempPassword: "",
        available: true,
      });
      fetchAnalytics();
    } catch (err) {
      setTechErr(err.response?.data?.message || "Failed to create technician account.");
    } finally {
      setTechLoading(false);
    }
  };

  const handleResolveTicket = async (ticketId, status) => {
    try {
      await axios.put(`/tickets/${ticketId}/status?status=${status}`);
      fetchTickets();
    } catch (err) {
      console.error("Failed to update ticket status", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">
      <header className="sticky top-0 z-50 bg-navy text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="B1K Services Logo" className="h-14 w-auto object-contain transition-all duration-300 hover:scale-105" />
            </Link>
            <div className="border-l border-slate-700 pl-3 hidden sm:block">
              <span className="text-sm font-bold tracking-wider text-light-blue uppercase">Admin Control Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <h2 className="font-bold text-sm text-white">System Administrator</h2>
              <p className="text-xs text-slate-400">admin@b1kservices.com</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white text-xl border border-slate-700 shadow-inner">
              👨‍💼
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 cursor-pointer"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-3">
          {[
            { id: "overview", label: "Dashboard Overview", icon: FaTools },
            { id: "addTech", label: "Add Technician Account", icon: FaUserPlus },
            { id: "tickets", label: "Support Tickets", icon: FaLifeRing },
            { id: "auditLogs", label: "System Audit Trail", icon: FaHistory },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "tickets") fetchTickets();
                if (tab.id === "auditLogs") fetchAuditLogs();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
                Welcome Back, <span className="text-primary">Admin 👋</span>
              </h1>
              <p className="text-slate-500 text-sm max-w-xl">
                Monitor system metrics, manage technician assignments, and review real-time platform revenue.
              </p>
            </div>

            {/* PART 11: Analytics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Users", val: stats.totalUsers, icon: FaUserTie, color: "text-blue-600 bg-blue-50 border-blue-100" },
                { label: "Total Technicians", val: stats.totalTechnicians, icon: FaUserCheck, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
                { label: "Total Bookings", val: stats.totalBookings, icon: FaClipboardList, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                { label: "Pending Requests", val: stats.pendingBookings, icon: FaExclamationTriangle, color: "text-amber-600 bg-amber-50 border-amber-100" },
                { label: "Completed Jobs", val: stats.completedJobs, icon: FaTools, color: "text-green-600 bg-green-50 border-green-100" },
                { label: "Bookings Today", val: stats.bookingsToday, icon: FaClipboardList, color: "text-purple-600 bg-purple-50 border-purple-100" },
                { label: "Total Revenue", val: `₹${stats.totalRevenue}`, icon: FaRupeeSign, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                { label: "Monthly Revenue", val: `₹${stats.monthlyRevenue}`, icon: FaRupeeSign, color: "text-teal-700 bg-teal-50 border-teal-200" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-custom-border shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow duration-200"
                >
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

            {/* Quick Modules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl border border-custom-border shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-center text-xl shadow-sm">
                    <FaPlusCircle />
                  </div>
                  <h3 className="text-xl font-bold text-navy">Manage Services</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Configure new appliance categories, set custom descriptions, and upload base price estimates.
                  </p>
                </div>
                <Link to="/service-creation" className="mt-8">
                  <button className="w-full bg-navy hover:bg-primary text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md">
                    Open Module <FaArrowRight className="text-xs" />
                  </button>
                </Link>
              </div>

              <div className="bg-white rounded-3xl border border-custom-border shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center text-xl shadow-sm">
                    <FaExclamationTriangle />
                  </div>
                  <h3 className="text-xl font-bold text-navy">Manage Issues</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Map potential appliance breakdowns to service categories and estimate custom technician quotes.
                  </p>
                </div>
                <Link to="/report-issue" className="mt-8">
                  <button className="w-full bg-navy hover:bg-primary text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md">
                    Open Module <FaArrowRight className="text-xs" />
                  </button>
                </Link>
              </div>

              <div className="bg-white rounded-3xl border border-custom-border shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-650 flex items-center justify-center text-xl shadow-sm">
                    <FaUserCheck />
                  </div>
                  <h3 className="text-xl font-bold text-navy">Assign Technicians</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Match pending repair requests with local skilled workers and monitor active workspace tasks.
                  </p>
                </div>
                <Link to="/technician-management" className="mt-8">
                  <button className="w-full bg-navy hover:bg-primary text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md">
                    Open Module <FaArrowRight className="text-xs" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* PART 3: ADD TECHNICIAN TAB */}
        {activeTab === "addTech" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-2">Create Technician Account</h2>
            <p className="text-slate-500 text-sm mb-6">
              Only Administrators can add technicians. Public signup is disabled for technicians.
            </p>

            {techMsg && <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-semibold">{techMsg}</div>}
            {techErr && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-semibold">{techErr}</div>}

            <form onSubmit={handleCreateTechnician} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Technician Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Ramesh Kumar"
                  value={techForm.name}
                  onChange={handleTechFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Login Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ramesh@b1kservices.com"
                  value={techForm.email}
                  onChange={handleTechFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="9876543210"
                  value={techForm.phone}
                  onChange={handleTechFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Technical Skills</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="e.g. AC Repair, Washing Machine, Refrigeration"
                  value={techForm.skills}
                  onChange={handleTechFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={techForm.experience}
                  onChange={handleTechFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Temporary Password</label>
                <input
                  type="text"
                  name="tempPassword"
                  placeholder="TechPass@123"
                  value={techForm.tempPassword}
                  onChange={handleTechFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={techLoading}
                className="w-full mt-4 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition duration-300 shadow-md flex justify-center items-center gap-2 text-sm"
              >
                {techLoading ? "Provisioning..." : "Create Technician Account"}
              </button>
            </form>
          </div>
        )}

        {/* PART 14: SUPPORT TICKETS TAB */}
        {activeTab === "tickets" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-navy">Manage Customer Support Tickets</h2>

            {tickets.length === 0 ? (
              <p className="text-slate-500 text-sm">No support tickets found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                      <th className="p-4">Ticket ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Priority</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold">#{t.id}</td>
                        <td className="p-4 font-semibold">{t.user ? t.user.name : "Customer"}</td>
                        <td className="p-4">{t.subject}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            t.priority === "HIGH" || t.priority === "URGENT" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {t.priority}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-xs">{t.status}</td>
                        <td className="p-4">
                          {t.status !== "RESOLVED" && (
                            <button
                              onClick={() => handleResolveTicket(t.id, "RESOLVED")}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                            >
                              Mark Resolved
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PART 16: AUDIT LOGS TAB */}
        {activeTab === "auditLogs" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-navy">System Security Audit Log</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">User Email</th>
                    <th className="p-4">Action</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-4 text-xs font-mono text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="p-4 font-semibold">{log.userEmail}</td>
                      <td className="p-4 font-mono font-bold text-xs text-primary">{log.action}</td>
                      <td className="p-4 text-slate-600">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
