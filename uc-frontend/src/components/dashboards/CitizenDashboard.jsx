import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReportIssue from "../pages/ReportIssue";
import CitizenDashboardNav from "../pages/CitizenDashboardNav";
import Booking from "../pages/Booking";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <CitizenDashboardNav />

      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16 px-10 rounded-b-3xl shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold">Welcome Back, Gireesh 👋</h1>

            <p className="mt-4 text-xl">
              Book trusted home appliance services at your doorstep.
            </p>

            <button
              className="mt-8 bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              onClick={() => navigate("/booking")}
            >
              Book Service
            </button>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
            className="w-72"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <h2 className="text-4xl font-bold text-green-600">24</h2>
          <p className="text-gray-500 mt-2">Total Bookings</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <h2 className="text-4xl font-bold text-blue-600">18</h2>
          <p className="text-gray-500 mt-2">Completed</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <h2 className="text-4xl font-bold text-yellow-500">4</h2>
          <p className="text-gray-500 mt-2">Pending</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
          <h2 className="text-4xl font-bold text-red-500">4.8⭐</h2>
          <p className="text-gray-500 mt-2">Average Rating</p>
        </div>
      </div>

      {/* Popular Services */}

      <div className="max-w-7xl mx-auto mt-14">
        <h2 className="text-3xl font-bold mb-8">Popular Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "AC Repair",
              price: "₹299",
              img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500",
            },
            {
              name: "TV Repair",
              price: "₹399",
              img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
            },
            {
              name: "Refrigerator",
              price: "₹349",
              img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
            },
            {
              name: "Washing Machine",
              price: "₹249",
              img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img src={item.img} alt="" className="h-52 w-full object-cover" />

              <div className="p-5">
                <h3 className="text-2xl font-semibold">{item.name}</h3>

                <p className="text-gray-500 mt-2">Starts From {item.price}</p>
                <button className="mt-5 bg-green-500 text-white px-5 py-2 rounded-lg w-full hover:bg-green-600">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Booked Services */}

      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6">Most Booked Services</h2>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-4">Service</th>

                <th>Bookings</th>

                <th>Rating</th>

                <th>Starting Price</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="py-4 text-center">AC Repair</td>
                <td className="text-center">1250</td>
                <td className="text-center text-yellow-500">⭐⭐⭐⭐⭐</td>
                <td className="text-center">₹299</td>
              </tr>

              <tr className="border-b hover:bg-gray-100">
                <td className="py-4 text-center">TV Repair</td>
                <td className="text-center">980</td>
                <td className="text-center text-yellow-500">⭐⭐⭐⭐⭐</td>
                <td className="text-center">₹399</td>
              </tr>

              <tr className="border-b hover:bg-gray-100">
                <td className="py-4 text-center">Refrigerator</td>
                <td className="text-center">850</td>
                <td className="text-center text-yellow-500">⭐⭐⭐⭐⭐</td>
                <td className="text-center">₹349</td>
              </tr>

              <tr className="hover:bg-gray-100">
                <td className="py-4 text-center">Washing Machine</td>
                <td className="text-center">720</td>
                <td className="text-center text-yellow-500">⭐⭐⭐⭐☆</td>
                <td className="text-center">₹249</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CitizenDashboard;
