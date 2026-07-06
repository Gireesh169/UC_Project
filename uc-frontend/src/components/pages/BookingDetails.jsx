import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CitizenDashboardNav from "./CitizenDashboardNav";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [service, setService] = useState(null);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchService();
    fetchIssues();
  }, []);

  const fetchService = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/services/${id}`);

      setService(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/issues/service/${id}`,
      );

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

    try {
      await axios.post("http://localhost:8080/booking/create", {
        userId: user.id,
        serviceId: id,
        issueId: selectedIssue.id,
        address: address,
      });

      setMessage("Booking Successful");

      setTimeout(() => {
        navigate("/view-history");
      }, 1500);
    } catch (error) {
      console.log(error);
      setMessage("Booking Failed");
    }
  };

  if (!service) {
    return <div className="text-center mt-20 text-2xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <CitizenDashboardNav />

      <div className="pt-28 max-w-6xl mx-auto px-6">
        <button
          onClick={() => navigate("/booking")}
          className="mb-6 text-green-600 font-semibold"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <img
            src={`/${service.name}.png`}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src = "/default.png";
            }}
            alt={service.name}
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold">{service.name}</h1>

            <p className="text-gray-600 mt-4">{service.description}</p>

            <h2 className="text-green-600 text-2xl font-bold mt-5">
              Starts From ₹{service.basePrice}
            </h2>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-8">Choose Issue</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className={`cursor-pointer rounded-3xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1

      ${
        selectedIssue?.id === issue.id
          ? "bg-green-50 border-4 border-green-500"
          : "bg-white border border-gray-200"
      }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {issue.title}
                </h2>

                <span className="text-3xl">🔧</span>
              </div>

              <p className="text-gray-500 mt-4 min-h-[60px]">
                {issue.description}
              </p>

              <div className="flex justify-between items-center mt-6">
                <h2 className="text-3xl font-bold text-green-600">
                  ₹{issue.price}
                </h2>

                <button
                  type="button"
                  className={`px-6 py-2 rounded-xl font-semibold transition

          ${
            selectedIssue?.id === issue.id
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-green-500 hover:text-white"
          }`}
                >
                  {selectedIssue?.id === issue.id ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">Service Address</h2>

          <textarea
            rows="5"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-2xl p-4"
            placeholder="House No, Street, Area, City, State, Pincode"
          />

          <button
            onClick={handleBooking}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-bold"
          >
            Confirm Booking
          </button>

          {message && (
            <p className="text-center text-green-600 font-bold mt-6">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
