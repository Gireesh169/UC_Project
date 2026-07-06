import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportIssue = () => {
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    serviceId: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/services/all");

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/issues/create", {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        serviceId: formData.serviceId,
      });

      setSuccess(true);
      setMessage("Issue Created Successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        serviceId: "",
      });
    } catch (error) {
      console.log(error);

      setSuccess(false);
      setMessage("Issue Creation Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex justify-center items-center px-6 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-8">
          <h1 className="text-4xl font-bold text-white">
            Create Service Issue
          </h1>

          <p className="text-green-100 mt-2">
            Add an issue that customers can select while booking.
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Select Service
              </label>

              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose Service</option>

                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Issue Title */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Issue Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Gas Leakage"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Description */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Issue Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue..."
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Price */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Estimated Repair Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="299"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Tips */}

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Tips
              </h3>

              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Choose the correct service.</li>

                <li>Enter a short issue title.</li>

                <li>Provide a clear description.</li>

                <li>Set an estimated repair price.</li>
              </ul>
            </div>

            {/* Button */}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-xl transition duration-300"
            >
              Create Issue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
