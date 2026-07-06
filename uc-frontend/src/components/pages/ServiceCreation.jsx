import React, { useState } from "react";
import axios from "axios";

const ServiceCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceCreation = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/services/create", formData);

      setSuccess(true);
      setMessage("✅ Service Created Successfully");

      setFormData({
        name: "",
        description: "",
        basePrice: "",
      });
    } catch (error) {
      console.log(error);

      setSuccess(false);
      setMessage("❌ Failed to Create Service");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex justify-center items-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8">
          <h1 className="text-4xl font-bold">Create New Service</h1>

          <p className="mt-2 text-green-100">
            Add a new appliance service that customers can book.
          </p>
        </div>

        {/* Form */}

        <div className="p-8">
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl text-center font-semibold ${
                success
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleServiceCreation} className="space-y-6">
            {/* Service Name */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Service Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Example: Air Conditioner"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <p className="text-sm text-gray-500 mt-2">
                Enter the exact service name.
              </p>
            </div>

            {/* Description */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                placeholder="Describe the service..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Price */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Base Price (₹)
              </label>

              <input
                type="number"
                name="basePrice"
                placeholder="299"
                value={formData.basePrice}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Image Info */}

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Image Information
              </h3>

              <p className="text-gray-700">
                Images are stored only in the frontend.
              </p>

              <p className="mt-2 text-gray-700">
                If the service name matches one of the predefined names, its
                image will automatically be displayed in the booking page.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>✔ Air Conditioner</div>
                <div>✔ Refrigerator</div>
                <div>✔ Washing Machine</div>
                <div>✔ Television</div>
                <div>✔ Fan</div>
                <div>✔ Water Purifier</div>
                <div>✔ Microwave</div>
                <div>✔ Geyser</div>
              </div>
            </div>

            {/* Button */}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-xl transition duration-300"
            >
              Create Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceCreation;
