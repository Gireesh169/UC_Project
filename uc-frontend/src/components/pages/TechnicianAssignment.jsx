import React, { useEffect, useState } from "react";
import axios from "axios";

const TechnicianAssignment = () => {
  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetchBookings();

    fetchTechnicians();
  }, []);

  const fetchBookings = async () => {
    const response = await axios.get("http://localhost:8080/booking/all");

    setBookings(response.data);
  };

  const fetchTechnicians = async () => {
    const response = await axios.get("http://localhost:8080/technicians/all");

    setTechnicians(response.data);
  };

  const assignTechnician = async (bookingId, technicianId) => {
    try {
      await axios.put(
        `http://localhost:8080/booking/${bookingId}/assign/${technicianId}`,
      );

      alert("Technician Assigned");

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Technician Assignment</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Booking</th>
            <th>Service</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Assign</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>

              <td>{booking.service?.name}</td>

              <td>{booking.issue?.title}</td>

              <td>{booking.status}</td>

              <td>
                <select
                  onChange={(e) => assignTechnician(booking.id, e.target.value)}
                >
                  <option>Select Technician</option>

                  {technicians.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name} - {tech.skills}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianAssignment;
