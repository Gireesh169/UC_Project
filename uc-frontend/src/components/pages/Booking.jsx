import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CitizenDashboardNav from "./CitizenDashboardNav";

const Booking = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/services/all");

      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openService = (service) => {
    navigate(`/booking/${service.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CitizenDashboardNav />

      <div className="pt-28 px-8 pb-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-700">
            Book Home Services
          </h1>

          <p className="text-gray-500 mt-3 text-lg">Welcome {user.name}</p>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Available Services
          </h2>

          {loading ? (
            <div className="text-center text-lg">Loading Services...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
                >
                  <img
                    src={`/${service.name}.png`}
                    alt={service.name}
                    className="h-56 w-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default.png";
                    }}
                  />

                  <div className="p-5">
                    <h2 className="text-xl font-bold">{service.name}</h2>

                    <p className="text-gray-500 mt-3 text-sm">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-green-600 font-bold">
                        Starts ₹{service.basePrice}
                      </span>

                      <button
                        onClick={() => openService(service)}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
