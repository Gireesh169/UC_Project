import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/vite.svg";
import {
  FaHome,
  FaUserEdit,
  FaPlusCircle,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";

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
      <div className="backdrop-blur-md bg-slate-900/90 border border-slate-800 rounded-full shadow-xl shadow-black/30 px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
        <Link to="/" className="flex items-center pl-2">
          <img src={logo} alt="B1K Services Logo" className="h-16 md:h-18 w-auto object-contain transition-all duration-300 hover:scale-105" />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === "/citizenHome" &&
                location.pathname === "/citizen-dashboard");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className="text-sm shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer"
        >
          <FaSignOutAlt className="text-sm shrink-0" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
