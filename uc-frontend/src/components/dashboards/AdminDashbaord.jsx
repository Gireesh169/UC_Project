import { Link, useNavigate } from "react-router-dom";
import { 
  FaTools, 
  FaExclamationTriangle, 
  FaUserTie, 
  FaClipboardList, 
  FaPlusCircle, 
  FaTasks, 
  FaUserCheck, 
  FaSignOutAlt,
  FaArrowRight,
  FaChartLine,
  FaRegBell
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-650 flex items-center justify-center text-white text-xl">
              <FaTools />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight block">Flezo <span className="text-teal-400">Admin</span></span>
              <span className="text-slate-400 text-xs font-medium">Administration Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <h2 className="font-bold text-sm text-white">Administrator</h2>
              <p className="text-xs text-slate-400">Full Access Manager</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white text-xl border border-slate-700 shadow-inner">
              👨‍💼
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl text-red-455 hover:bg-red-950/30 hover:text-red-400 transition-colors cursor-pointer"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-12">
        
        {/* Welcome Banner */}
        <div className="text-center md:text-left space-y-3">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Welcome Back, <span className="text-teal-650">Admin 👋</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl">
            Control service listings, manage issues database, view statistics, and assign technicians to bookings.
          </p>
        </div>

        {/* Admin Statistics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Active Services", val: "12", icon: FaTools, color: "text-teal-600 bg-teal-50 border-teal-100" },
            { label: "Reported Issues", val: "28", icon: FaExclamationTriangle, color: "text-amber-600 bg-amber-50 border-amber-100" },
            { label: "Total Technicians", val: "8", icon: FaUserTie, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
            { label: "Total Bookings", val: "45", icon: FaClipboardList, color: "text-emerald-600 bg-emerald-50 border-emerald-100" }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-1">
                <span className="text-slate-450 text-xs md:text-sm font-semibold block">{stat.label}</span>
                <span className="text-2xl md:text-3xl font-extrabold text-slate-900">{stat.val}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${stat.color}`}>
                <stat.icon className="text-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Modules */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-teal-600 rounded-full"></span>
            Management Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Create Service Module */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-teal-950/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 text-teal-650 flex items-center justify-center text-xl shadow-sm">
                  <FaPlusCircle />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Manage Services</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Configure new appliance categories, set custom descriptions, and upload base price estimates.
                </p>
              </div>
              <Link to="/service-creation" className="mt-8">
                <button className="w-full bg-slate-900 hover:bg-teal-650 text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer">
                  Open Module
                  <FaArrowRight className="text-xs" />
                </button>
              </Link>
            </div>

            {/* Manage Issues Module */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-teal-950/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-650 flex items-center justify-center text-xl shadow-sm">
                  <FaExclamationTriangle />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Manage Issues</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Map potential appliance breakdowns to service categories and estimate custom technician quotes.
                </p>
              </div>
              <Link to="/report-issue" className="mt-8">
                <button className="w-full bg-slate-900 hover:bg-teal-650 text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer">
                  Open Module
                  <FaArrowRight className="text-xs" />
                </button>
              </Link>
            </div>

            {/* Technician Management Module */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-teal-950/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-650 flex items-center justify-center text-xl shadow-sm">
                  <FaUserCheck />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Assign Technicians</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Match pending repair requests with local skilled workers and monitor active workspace tasks.
                </p>
              </div>
              <Link to="/technician-management" className="mt-8">
                <button className="w-full bg-slate-900 hover:bg-teal-650 text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer">
                  Open Module
                  <FaArrowRight className="text-xs" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-teal-600 rounded-full"></span>
            Recent System Activity
          </h2>

          <div className="bg-white border border-slate-200/65 rounded-3xl shadow-sm divide-y divide-slate-100">
            {[
              { title: "New Service Created", desc: "A new appliance listing has been configured and deployed.", time: "Just Now", icon: FaPlusCircle, color: "text-teal-655 bg-teal-50" },
              { title: "Technician Assigned", desc: "Order #403 assigned to Technician Rohan (AC Specialist).", time: "10 mins ago", icon: FaUserCheck, color: "text-indigo-600 bg-indigo-50" },
              { title: "Booking Completed", desc: "Technician Sneha marked washing machine workorder #398 as completed.", time: "Today", icon: FaClipboardList, color: "text-emerald-600 bg-emerald-50" }
            ].map((act, index) => (
              <div key={index} className="p-6 flex justify-between items-start gap-4 hover:bg-slate-50/40 transition-colors">
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${act.color}`}>
                    <act.icon />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">{act.title}</h4>
                    <p className="text-slate-500 text-xs md:text-sm">{act.desc}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-semibold shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
