import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CitizenDashboardNav from "./CitizenDashboardNav";
import { FaHistory, FaTools, FaWrench, FaMapMarkerAlt } from "react-icons/fa";

function ViewPastBooking() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios
        .get(`/booking/user/${user.id}`)
        .then((response) => {
          setReports(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "IN_PROGRESS":
        return "bg-blue-50 text-primary border-blue-200";
      case "ASSIGNED":
        return "bg-blue-50/50 text-secondary border-blue-150";
      case "PENDING":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">
      <CitizenDashboardNav />

      <div className="pt-28 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight flex items-center justify-center gap-3">
            <FaHistory className="text-primary text-3xl md:text-4xl" />
            Past Bookings
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Welcome back, <span className="text-primary font-bold">{user?.name}</span>. Track all your repair and servicing requests.
          </p>
        </div>

        <div className="bg-white border border-custom-border rounded-3xl shadow-sm overflow-hidden">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
              <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
              <span className="text-sm font-semibold">Loading Past Bookings...</span>
            </div>
          ) : reports.length === 0 ? (
            <div className="p-16 text-center text-slate-500 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <FaHistory className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-navy">No Bookings Found</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">You haven't requested any services yet. Start booking to see your records here.</p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-custom-border text-slate-500 font-bold text-xs uppercase tracking-wider">
                      <th className="py-4 px-6">Booking ID</th>
                      <th className="py-4 px-6">Service</th>
                      <th className="py-4 px-6">Issue Details</th>
                      <th className="py-4 px-6">Address</th>
                      <th className="py-4 px-6 text-center">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {reports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                        <td className="py-4 px-6 font-mono font-bold text-slate-400">#{report.id}</td>
                        <td className="py-4 px-6 font-bold text-navy">
                          <div className="flex items-center gap-2">
                            <FaTools className="text-primary text-xs shrink-0" />
                            {report.service?.name}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-slate-800 block">{report.issue?.title}</span>
                            <span className="text-xs text-slate-400">Est: ₹{report.issue?.price}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 max-w-[200px] truncate" title={report.address}>
                          {report.address}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden divide-y divide-slate-100">
                {reports.map((report) => (
                  <div key={report.id} className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-slate-450">#{report.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <FaTools className="text-primary shrink-0" />
                        <span className="font-extrabold text-navy">{report.service?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaWrench className="text-slate-400 shrink-0" />
                        <span className="text-slate-600 font-semibold">{report.issue?.title} (₹{report.issue?.price})</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-slate-500 text-xs leading-relaxed">{report.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default ViewPastBooking;
