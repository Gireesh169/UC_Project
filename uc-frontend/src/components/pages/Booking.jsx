import React, { useState } from "react";
import axios from "axios";

const Booking = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    serviceId: "",
    issueId: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        <input
          type="number"
          name="serviceId"
          placeholder="Enter Service ID"
          onChange={handleChange}
        />

        <input
          type="number"
          name="issueId"
          placeholder="Enter Issue ID"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Enter Address"
          onChange={handleChange}
        ></textarea>

        <button type="submit">Book Now</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Booking;
