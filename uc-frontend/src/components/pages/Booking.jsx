import React, { useEffect, useState } from "react";
import axios from "axios";

const Booking = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [services, setServices] = useState([]);
  const [issues, setIssues] = useState([]);

  const [formData, setFormData] = useState({
    serviceId: "",
    issueId: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  // FETCH ALL SERVICES
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

  // FETCH ISSUES BASED ON SERVICE
  const fetchIssues = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/issues/service/${serviceId}`,
      );

      setIssues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // WHEN SERVICE CHANGES
    if (name === "serviceId") {
      fetchIssues(value);

      setFormData((prev) => ({
        ...prev,
        serviceId: value,
        issueId: "",
      }));
    }
  };

  // CREATE BOOKING
  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/booking/create",
        {
          userId: user.id,
          serviceId: formData.serviceId,
          issueId: formData.issueId,
          address: formData.address,
        },
      );

      console.log(response.data);

      setMessage("Booking Successful");

      // RESET FORM
      setFormData({
        serviceId: "",
        issueId: "",
        address: "",
      });

      setIssues([]);
    } catch (error) {
      console.log(error);

      setMessage("Booking Failed");
    }
  };

  return (
    <div className="booking-container">
      <h1>Book Service</h1>

      <h3>Welcome {user.name}</h3>

      <form onSubmit={handleBooking} className="booking-form">
        {/* SERVICES */}
        <label>Select Service</label>

        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>

          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        {/* ISSUES */}
        <label>Select Issue</label>

        <select
          name="issueId"
          value={formData.issueId}
          onChange={handleChange}
          required
        >
          <option value="">Select Issue</option>

          {issues.map((issue) => (
            <option key={issue.id} value={issue.id}>
              {issue.title} - ₹{issue.price}
            </option>
          ))}
        </select>

        {/* ADDRESS */}
        <label>Address</label>

        <textarea
          name="address"
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Now</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Booking;
