import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkerDashboard = () => {
  const technician = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const response = await axios.get(
      `http://localhost:8080/booking/technician/${technician.id}`,
    );

    setBookings(response.data);
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/booking/${bookingId}/status?status=${status}`,
      );

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>
      <ul>
        <li>
          <a href="/complete-technician-profile">Complete Profile</a>
        </li>
      </ul>

      <h2>Your Bookings</h2>

      {bookings.map((booking) => (
        <div key={booking.id}>
          <h3>{booking.service?.name}</h3>

          <p>{booking.issue?.title}</p>

          <p>{booking.address}</p>

          <p>
            Status:
            {booking.status}
          </p>

          <button onClick={() => updateStatus(booking.id, "IN_PROGRESS")}>
            Start Work
          </button>

          <button onClick={() => updateStatus(booking.id, "COMPLETED")}>
            Complete
          </button>
        </div>
      ))}
    </div>
  );
};

export default WorkerDashboard;
