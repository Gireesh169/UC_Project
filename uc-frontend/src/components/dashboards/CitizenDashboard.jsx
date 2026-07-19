import React from "react";
import { useNavigate } from "react-router-dom";
import CitizenDashboardNav from "../pages/CitizenDashboardNav";
import {
  FaCalendarCheck,
  FaCheckDouble,
  FaHourglassHalf,
  FaStar,
  FaArrowRight,
  FaTools,
  FaServicestack,
} from "react-icons/fa";

const CitizenDashboard = () => {
  const navigate = useNavigate();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.name || "Gireesh";

  const popularServices = [
    {
      name: "AC Repair",
      price: "₹299",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "TV Repair",
      price: "₹399",
      img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Refrigerator",
      price: "₹349",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Washing Machine",
      price: "₹249",
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&auto=format&fit=crop&q=60",
    },
  ];

  const mostBooked = [
    { name: "AC Repair", count: 1250, rating: 5, price: "₹299" },
    { name: "TV Repair", count: 980, rating: 5, price: "₹399" },
    { name: "Refrigerator", count: 850, rating: 5, price: "₹349" },
    { name: "Washing Machine", count: 720, rating: 4, price: "₹249" },
  ];

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">
      <CitizenDashboardNav />

      <div className="pt-28 px-6">
        <div className="max-w-7xl mx-auto bg-navy text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden bg-gradient-to-r from-navy via-slate-900 to-primary">
          <div className="absolute top-0 right-0 -z-10 w-96 h-full opacity-10 bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="md:max-w-2xl space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Welcome Back, <span className="text-light-blue">{userName}</span> 👋
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Book trusted home appliance services at your doorstep.
              Professional technicians, transparent pricing, and instant
              bookings.
            </p>
            <button
              onClick={() => navigate("/booking")}
              className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer text-sm"
            >
              Book New Service
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Bookings",
            val: "24",
            icon: FaCalendarCheck,
            color: "text-primary bg-blue-50 border-blue-100",
          },
          {
            label: "Completed Repairs",
            val: "18",
            icon: FaCheckDouble,
            color: "text-emerald-600 bg-emerald-50 border-emerald-100",
          },
          {
            label: "Pending Visit",
            val: "4",
            icon: FaHourglassHalf,
            color: "text-amber-650 bg-amber-50 border-amber-100",
          },
          {
            label: "Average Rating",
            val: "4.8",
            icon: FaStar,
            color: "text-amber-500 bg-amber-50/50 border-amber-100",
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

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-navy">
              Popular Services
            </h2>
            <p className="text-slate-500 text-sm">
              Select one of our popular repair packages
            </p>
          </div>
          <button
            onClick={() => navigate("/booking")}
            className="text-primary hover:text-primary-hover font-bold text-sm inline-flex items-center gap-1.5 transition-colors duration-200"
          >
            View All
            <FaArrowRight className="text-xs" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularServices.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-custom-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/55 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-bold text-navy">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-semibold">
                    Starts From {item.price}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/booking")}
                  className="w-full bg-navy hover:bg-primary text-white font-bold py-2.5 rounded-xl transition duration-300 cursor-pointer text-sm shadow-md hover:shadow-lg hover:shadow-primary/10"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-white border border-custom-border rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-custom-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center border border-blue-100">
              <FaServicestack className="text-sm" />
            </div>
            <h3 className="font-bold text-lg text-navy">
              Most Ordered Service stats
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-custom-border text-slate-500 font-bold text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Service</th>
                  <th className="py-4 px-6">Total Bookings</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6">Starting Price</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {mostBooked.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-navy">
                      {row.name}
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      {row.count}+ Bookings
                    </td>
                    <td className="py-4 px-6 text-amber-500 flex gap-0.5">
                      {[...Array(5)].map((_, starIdx) => (
                        <FaStar
                          key={starIdx}
                          className={
                            starIdx < row.rating
                              ? "text-amber-500"
                              : "text-slate-200"
                          }
                        />
                      ))}
                    </td>
                    <td className="py-4 px-6 font-extrabold text-primary">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
