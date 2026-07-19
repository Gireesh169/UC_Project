import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import CitizenDashboardNav from "./CitizenDashboardNav";
import { FaSearch, FaAngleRight, FaInfoCircle } from "react-icons/fa";

const Booking = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "Customer";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/services/all");
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

  const filteredServices = services.filter((svc) =>
    svc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">
      <CitizenDashboardNav />

      <div className="pt-28 px-6 max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight">
            Book Home Services
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Welcome back, <span className="text-primary font-bold">{userName}</span>. Select a service category to get started.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-16 relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search for AC, TV, Refrigerator, etc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-custom-border rounded-2xl outline-none focus:ring-1 focus:ring-secondary focus:border-secondary shadow-sm transition-all duration-300 text-navy"
          />
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-navy mb-8 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Available Services
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
              <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
              <span className="text-sm font-semibold">Loading Services...</span>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="bg-white border border-custom-border rounded-3xl p-12 text-center text-slate-500 max-w-md mx-auto space-y-4 shadow-sm">
              <FaInfoCircle className="text-primary text-4xl mx-auto" />
              <h3 className="text-lg font-bold text-navy">No Services Found</h3>
              <p className="text-slate-500 text-sm">We couldn't find any services matching "{searchTerm}". Please try a different query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => openService(service)}
                  className="group bg-white rounded-3xl overflow-hidden border border-custom-border shadow-sm hover:shadow-xl hover:shadow-slate-200/55 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={`/${service.name}.png`}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60";
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md shadow-primary/25">
                      Base price ₹{service.basePrice}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-2 mb-6">
                      <h3 className="text-lg md:text-xl font-bold text-navy group-hover:text-primary transition-colors duration-200">
                        {service.name}
                      </h3>
                      <p className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                      <span className="text-primary font-extrabold text-sm">Book Service</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-200">
                        <FaAngleRight />
                      </div>
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
