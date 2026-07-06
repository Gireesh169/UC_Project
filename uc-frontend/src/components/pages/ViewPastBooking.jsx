import React, { useEffect, useState } from "react";
import axios from "axios";
import CitizenDashboardNav from "./CitizenDashboardNav";

function ViewPastBooking() {
  const [reports, setReports] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/booking/user/${user.id}`)
        .then((response) => {
          setReports(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <CitizenDashboardNav />

      <div className="pt-32 px-10">
        <h1 className="text-3xl font-bold text-center mb-2">Past Bookings</h1>

        <h3 className="text-center text-gray-600 mb-8">Welcome {user?.name}</h3>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {reports.length === 0 ? (
            <p className="text-center text-gray-500">No bookings found.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Booking ID</th>
                  <th className="p-3 text-left">Service</th>
                  <th className="p-3 text-left">Issue</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{report.id}</td>
                    <td className="p-3">{report.service?.name}</td>
                    <td className="p-3">{report.issue?.title}</td>
                    <td className="p-3">{report.address}</td>
                    <td className="p-3">{report.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewPastBooking;
