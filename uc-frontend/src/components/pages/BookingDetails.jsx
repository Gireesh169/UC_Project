import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import CitizenDashboardNav from "./CitizenDashboardNav";
import {
  FaArrowLeft,
  FaWrench,
  FaCheck,
  FaMapMarkerAlt,
  FaReceipt,
  FaInfoCircle,
} from "react-icons/fa";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [service, setService] = useState(null);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loadingBooking, setLoadingBooking] = useState(false);

  useEffect(() => {
    fetchService();
    fetchIssues();
  }, []);

  const fetchService = async () => {
    try {
      const response = await axios.get(`/services/${id}`);
      setService(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await axios.get(`/issues/service/${id}`);
      setIssues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    if (!selectedIssue) {
      alert("Please select an issue");
      return;
    }

    if (address.trim() === "") {
      alert("Please enter your address");
      return;
    }

    setLoadingBooking(true);
    setMessage("");

    try {
      await axios.post("/booking/create", {
        userId: user.id,
        serviceId: id,
        issueId: selectedIssue.id,
        address: address,
      });

      setMessage("Booking Successful! Redirecting to history...");

      setTimeout(() => {
        navigate("/view-history");
      }, 1500);
    } catch (error) {
      console.log(error);
      setMessage("Booking Failed. Please try again.");
    } finally {
      setLoadingBooking(false);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-custom-bg flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm text-slate-500 font-semibold">
            Loading Service Details...
          </span>
        </div>
      </div>
    );
  }

  const basePriceVal = Number(service.basePrice || 0);
  const issuePriceVal = selectedIssue ? Number(selectedIssue.price || 0) : 0;
  const totalVal = basePriceVal + issuePriceVal;

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">
      <CitizenDashboardNav />

      <div className="pt-28 max-w-7xl mx-auto px-6">
        <button
          onClick={() => navigate("/booking")}
          className="mb-8 hover:text-primary font-bold flex items-center gap-2 transition-colors duration-200 cursor-pointer text-slate-600"
        >
          <FaArrowLeft className="text-sm" />
          Back to Services
        </button>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl overflow-hidden border border-custom-border shadow-sm">
              <div className="relative h-64 sm:h-80 bg-slate-100">
                <img
                  src={`/${service.name}.png`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60";
                  }}
                  alt={service.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    {service.name}
                  </h1>
                  <p className="text-slate-250 text-sm font-semibold">
                    Category Base Fee: ₹{service.basePrice}
                  </p>
                </div>
              </div>

              <div className="p-8 font-sans">
                <h3 className="text-lg font-bold text-navy mb-2">
                  Service Description
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            <div>
              <div className="space-y-1 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-navy">
                  Choose the Issue
                </h2>
                <p className="text-slate-500 text-sm">
                  Select the option that best describes your problem
                </p>
              </div>

              {issues.length === 0 ? (
                <div className="bg-white border border-custom-border rounded-3xl p-8 text-center text-slate-500 shadow-sm">
                  <FaInfoCircle className="text-primary text-2xl mx-auto mb-2" />
                  <p className="font-semibold text-slate-800">
                    No issues configured for this service.
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Please check back later or contact admin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {issues.map((issue) => {
                    const isSelected = selectedIssue?.id === issue.id;
                    return (
                      <div
                        key={issue.id}
                        onClick={() => setSelectedIssue(issue)}
                        className={`cursor-pointer rounded-3xl p-6 border shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-between h-48 bg-white relative ${
                          isSelected
                            ? "border-primary bg-blue-50/15 shadow-primary/5 shadow-md"
                            : "border-custom-border hover:border-blue-200"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-md animate-scaleIn">
                            <FaCheck className="text-xs" />
                          </div>
                        )}
                        <div className="space-y-2">
                          <h3 className="text-lg font-extrabold text-navy flex items-center gap-2 pr-6">
                            <FaWrench className="text-primary shrink-0 text-sm" />
                            {issue.title}
                          </h3>
                          <p className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed">
                            {issue.description}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                          <span className="text-xs font-semibold text-slate-400 block uppercase">
                            Estimate
                          </span>
                          <span className="text-lg font-black text-primary">
                            ₹{issue.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-custom-border shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-lg text-navy border-b border-slate-150 pb-4 flex items-center gap-2.5">
                <FaReceipt className="text-primary" />
                Booking Summary
              </h3>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service Category</span>
                  <span className="font-semibold text-navy">
                    {service.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Fare</span>
                  <span className="font-semibold text-navy">
                    ₹{basePriceVal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Issue</span>
                  <span className="font-semibold text-navy truncate max-w-[150px]">
                    {selectedIssue ? selectedIssue.title : "Not Selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Repair Cost</span>
                  <span className="font-semibold text-navy">
                    ₹{issuePriceVal}
                  </span>
                </div>

                <div className="border-t border-slate-150 pt-4 flex justify-between items-end">
                  <span className="font-bold text-navy">Est. Total</span>
                  <span className="text-2xl font-black text-primary">
                    ₹{totalVal}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-custom-border shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-lg text-navy flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-primary" />
                Service Address
              </h3>

              <div className="space-y-4">
                <textarea
                  rows="4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-custom-border rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-secondary focus:border-secondary bg-slate-50/50 resize-none transition-all duration-300 placeholder-slate-400 text-navy"
                  placeholder="House No, Street, Landmark, Area, City, Pincode"
                />

                {message && (
                  <div
                    className={`p-4 rounded-xl text-center font-semibold text-xs border ${
                      message.includes("Successful")
                        ? "bg-blue-50 text-primary border-blue-200"
                        : "bg-red-50 text-red-500 border-red-200"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={loadingBooking}
                  className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 transition duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loadingBooking ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
