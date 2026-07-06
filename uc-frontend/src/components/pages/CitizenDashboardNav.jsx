import { Link } from "react-router-dom";
export default function CitizenDashboardNav() {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-lg px-3 py-3 flex items-center gap-6">
        <Link
          to="/citizenHome"
          className="bg-green-300 px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition"
        >
          Home
        </Link>

        <Link
          to="/updateProfile"
          className="px-6 py-3 font-semibold hover:text-green-500 transition"
        >
          Update Profile
        </Link>

        <Link
          to="/booking"
          className="px-6 py-3 font-semibold hover:text-green-500 transition"
        >
          Book Service
        </Link>
        <Link
          to="/view-history"
          className="px-6 py-3 font-semibold hover:text-green-500 transition"
        >
          View History
        </Link>
        <Link
          to="/"
          className="px-6 py-3 font-semibold hover:text-green-500 transition"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}
