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
    { path: "/booking", label: "Book", icon: FaPlusCircle },
    { path: "/view-history", label: "History", icon: FaHistory },
  ];

  return (
    <nav className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">
      <div className="backdrop-blur-xl bg-slate-900/95 border border-slate-800 rounded-full shadow-2xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-1 sm:gap-4">
        <Link to="/" className="flex items-center pl-1 shrink-0">
          <img src={logo} alt="B1K Services Logo" className="h-8 sm:h-10 w-auto object-contain" />
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
                className={`flex items-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 min-h-[44px] ${
                  isActive
                    ? "bg-[#0B3D91] text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className="text-sm shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-2.5 py-2.5 sm:px-3 sm:py-2 rounded-full text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer min-h-[44px] shrink-0"
        >
          <FaSignOutAlt className="text-sm shrink-0" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
