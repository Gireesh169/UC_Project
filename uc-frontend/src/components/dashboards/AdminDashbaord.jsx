import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-green-400/30 blur-3xl"></div>

      <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl"></div>

      <div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full bg-emerald-300/30 blur-3xl"></div>

      <div className="relative z-10 px-10 pt-8">
        <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-green-700">Flezo </h1>

            <p className="text-gray-600">Admin Management Portal</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <h2 className="font-bold text-gray-800">Administrator</h2>

              <p className="text-sm text-gray-500">Full Access</p>
            </div>

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-white text-2xl shadow-lg">
              👨‍💼
            </div>

            <button
              onClick={logout}
              className="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 hover:scale-105 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h1 className="text-6xl font-black text-gray-800">
            Welcome Back
            <span className="text-green-600"> Admin 👋</span>
          </h1>

          <p className="text-gray-600 mt-5 text-xl">
            Manage Services, Customers, Technicians and Bookings
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="backdrop-blur-xl bg-white/40 rounded-3xl p-8 shadow-xl hover:scale-105 transition">
            <div className="text-5xl">🛠️</div>

            <h2 className="text-4xl font-bold mt-5">12</h2>

            <p className="text-gray-600 mt-2">Services</p>
          </div>

          <div className="backdrop-blur-xl bg-white/40 rounded-3xl p-8 shadow-xl hover:scale-105 transition">
            <div className="text-5xl">⚠️</div>

            <h2 className="text-4xl font-bold mt-5">28</h2>

            <p className="text-gray-600 mt-2">Issues</p>
          </div>

          <div className="backdrop-blur-xl bg-white/40 rounded-3xl p-8 shadow-xl hover:scale-105 transition">
            <div className="text-5xl">👨‍🔧</div>

            <h2 className="text-4xl font-bold mt-5">8</h2>

            <p className="text-gray-600 mt-2">Technicians</p>
          </div>

          <div className="backdrop-blur-xl bg-white/40 rounded-3xl p-8 shadow-xl hover:scale-105 transition">
            <div className="text-5xl">📋</div>

            <h2 className="text-4xl font-bold mt-5">45</h2>

            <p className="text-gray-600 mt-2">Bookings</p>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-black text-gray-800">Quick Actions</h2>

            <p className="text-gray-500">Choose an administration module</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="group backdrop-blur-xl bg-white/40 border border-white/40 rounded-[35px] shadow-2xl overflow-hidden hover:shadow-green-300/50 hover:-translate-y-3 transition duration-500">
              <div className="bg-gradient-to-r from-green-500 to-green-700 h-2"></div>

              <div className="p-10">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-5xl shadow-xl group-hover:rotate-12 transition duration-500">
                  🛠️
                </div>

                <h1 className="text-3xl font-bold mt-8">Create Service</h1>

                <p className="text-gray-600 mt-4 leading-8">
                  Add new appliance services that customers can book from the
                  application.
                </p>

                <Link to="/service-creation">
                  <button className="mt-10 w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white text-lg font-bold hover:shadow-xl transition">
                    Open Module →
                  </button>
                </Link>
              </div>
            </div>

            <div className="group backdrop-blur-xl bg-white/40 border border-white/40 rounded-[35px] shadow-2xl overflow-hidden hover:shadow-orange-300/50 hover:-translate-y-3 transition duration-500">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2"></div>

              <div className="p-10">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-5xl shadow-xl group-hover:rotate-12 transition duration-500">
                  ⚠️
                </div>

                <h1 className="text-3xl font-bold mt-8">Manage Issues</h1>

                <p className="text-gray-600 mt-4 leading-8">
                  Create and manage appliance issues that customers can choose
                  during booking.
                </p>

                <Link to="/report-issue">
                  <button className="mt-10 w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold hover:shadow-xl transition">
                    Open Module →
                  </button>
                </Link>
              </div>
            </div>

            <div className="group backdrop-blur-xl bg-white/40 border border-white/40 rounded-[35px] shadow-2xl overflow-hidden hover:shadow-blue-300/50 hover:-translate-y-3 transition duration-500">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2"></div>

              <div className="p-10">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-5xl shadow-xl group-hover:rotate-12 transition duration-500">
                  👨‍🔧
                </div>

                <h1 className="text-3xl font-bold mt-8">
                  Technician Assignment
                </h1>

                <p className="text-gray-600 mt-4 leading-8">
                  Assign technicians to customer bookings and monitor completed
                  services.
                </p>

                <Link to="/technician-management">
                  <button className="mt-10 w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-bold hover:shadow-xl transition">
                    Open Module →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-[35px] shadow-2xl p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-black text-gray-800">
                Recent Activity
              </h2>

              <span className="px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                Live
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white/60 rounded-2xl p-5 hover:scale-[1.02] transition">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">
                    🛠️
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">New Service Created</h3>

                    <p className="text-gray-500">
                      A new appliance service was added.
                    </p>
                  </div>
                </div>

                <span className="text-gray-400">Just Now</span>
              </div>

              <div className="flex justify-between items-center bg-white/60 rounded-2xl p-5 hover:scale-[1.02] transition">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                    👨‍🔧
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Technician Assigned</h3>

                    <p className="text-gray-500">
                      Technician assigned to a customer booking.
                    </p>
                  </div>
                </div>

                <span className="text-gray-400">10 mins ago</span>
              </div>

              <div className="flex justify-between items-center bg-white/60 rounded-2xl p-5 hover:scale-[1.02] transition">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl">
                    📋
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Booking Completed</h3>

                    <p className="text-gray-500">
                      A technician completed a customer service.
                    </p>
                  </div>
                </div>

                <span className="text-gray-400">Today</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 mb-10">
          <div className="backdrop-blur-xl bg-white/30 rounded-3xl border border-white/30 shadow-xl px-10 py-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Flezo Admin Portal
              </h2>

              <p className="text-gray-500 mt-2">
                Manage Services • Technicians • Issues • Bookings
              </p>
            </div>

            <div className="text-right">
              <p className="text-green-600 font-bold text-lg">Version 1.0</p>

              <p className="text-gray-500">© 2026 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
