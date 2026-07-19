import { Link, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

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
              <span className="text-sm font-bold tracking-wider text-light-blue uppercase">Admin Portal</span>
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
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 cursor-pointer"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-12">
        <div className="text-center md:text-left space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight">
            Welcome Back, <span className="text-primary">Admin 👋</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl">
            Control service listings, manage issues database, view statistics,
            and assign technicians to bookings.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Active Services",
              val: "12",
              icon: FaTools,
              color: "text-primary bg-blue-50 border-blue-100",
            },
            {
              label: "Reported Issues",
              val: "28",
              icon: FaExclamationTriangle,
              color: "text-amber-600 bg-amber-50 border-amber-100",
            },
            {
              label: "Total Technicians",
              val: "8",
              icon: FaUserTie,
              color: "text-indigo-600 bg-indigo-50 border-indigo-100",
            },
            {
              label: "Total Bookings",
              val: "45",
              icon: FaClipboardList,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-custom-border shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="space-y-1">
                <span className="text-slate-400 text-xs md:text-sm font-semibold block">
                  {stat.label}
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-navy">
                  {stat.val}
                </span>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${stat.color}`}
              >
                <stat.icon className="text-xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-navy flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Management Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl border border-custom-border shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-center text-xl shadow-sm">
                  <FaPlusCircle />
                </div>
                <h3 className="text-xl font-bold text-navy">
                  Manage Services
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Configure new appliance categories, set custom descriptions,
                  and upload base price estimates.
                </p>
              </div>
              <Link to="/service-creation" className="mt-8">
                <button className="w-full bg-navy hover:bg-primary text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md hover:shadow-lg hover:shadow-primary/10">
                  Open Module
                  <FaArrowRight className="text-xs" />
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-custom-border shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center text-xl shadow-sm">
                  <FaExclamationTriangle />
                </div>
                <h3 className="text-xl font-bold text-navy">
                  Manage Issues
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Map potential appliance breakdowns to service categories and
                  estimate custom technician quotes.
                </p>
              </div>
              <Link to="/report-issue" className="mt-8">
                <button className="w-full bg-navy hover:bg-primary text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md hover:shadow-lg hover:shadow-primary/10">
                  Open Module
                  <FaArrowRight className="text-xs" />
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-custom-border shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-650 flex items-center justify-center text-xl shadow-sm">
                  <FaUserCheck />
                </div>
                <h3 className="text-xl font-bold text-navy">
                  Assign Technicians
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Match pending repair requests with local skilled workers and
                  monitor active workspace tasks.
                </p>
              </div>
              <Link to="/technician-management" className="mt-8">
                <button className="w-full bg-navy hover:bg-primary text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md hover:shadow-lg hover:shadow-primary/10">
                  Open Module
                  <FaArrowRight className="text-xs" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-navy flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Recent System Activity
          </h2>

          <div className="bg-white border border-custom-border rounded-3xl shadow-sm divide-y divide-slate-100 overflow-hidden">
            {[
              {
                title: "New Service Created",
                desc: "A new appliance listing has been configured and deployed.",
                time: "Just Now",
                icon: FaPlusCircle,
                color: "text-primary bg-blue-50",
              },
              {
                title: "Technician Assigned",
                desc: "Order #403 assigned to Technician Rohan (AC Specialist).",
                time: "10 mins ago",
                icon: FaUserCheck,
                color: "text-indigo-600 bg-indigo-50",
              },
              {
                title: "Booking Completed",
                desc: "Technician Sneha marked washing machine workorder #398 as completed.",
                time: "Today",
                icon: FaClipboardList,
                color: "text-emerald-600 bg-emerald-50",
              },
            ].map((act, index) => (
              <div
                key={index}
                className="p-6 flex justify-between items-start gap-4 hover:bg-slate-50/40 transition-colors duration-200"
              >
                <div className="flex gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${act.color}`}
                  >
                    <act.icon />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-navy text-sm md:text-base">
                      {act.title}
                    </h4>
                    <p className="text-slate-500 text-xs md:text-sm">
                      {act.desc}
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-semibold shrink-0">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
