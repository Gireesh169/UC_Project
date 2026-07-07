import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUserEdit, FaPlusCircle, FaHistory, FaSignOutAlt, FaTools } from "react-icons/fa";

export default function CitizenDashboardNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { path: "/citizenHome", label: "Home", icon: FaHome },
    { path: "/updateProfile", label: "Profile", icon: FaUserEdit },
    { path: "/booking", label: "Book Service", icon: FaPlusCircle },
    { path: "/view-history", label: "History", icon: FaHistory },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">
      <div className="backdrop-blur-md bg-slate-900/90 border border-slate-800 rounded-full shadow-xl shadow-teal-950/20 px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand/Logo on Small Screens/Start */}
        <div className="flex items-center gap-1.5 pl-2 text-white">
          <FaTools className="text-teal-400 text-sm" />
          <span className="text-sm font-black tracking-tight hidden sm:inline">Flezo</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                             (item.path === "/citizenHome" && location.pathname === "/citizen-dashboard");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-teal-650 text-white shadow-md shadow-teal-650/15"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className="text-sm shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-red-450 hover:bg-red-950/30 hover:text-red-400 transition-all cursor-pointer"
        >
          <FaSignOutAlt className="text-sm shrink-0" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
