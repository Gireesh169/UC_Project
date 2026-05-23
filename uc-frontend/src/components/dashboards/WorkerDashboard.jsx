import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [technician, setTechnician] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnician();
  }, []);

  // FETCH TECHNICIAN USING USER ID
  const fetchTechnician = async () => {
    try {
      const techResponse = await axios.get(
        `http://localhost:8080/technicians/user/${user.id}`,
      );

      console.log("Technician:", techResponse.data);

      setTechnician(techResponse.data);

      fetchBookings(techResponse.data.id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // FETCH BOOKINGS USING TECHNICIAN ID
  const fetchBookings = async (technicianId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/booking/technician/${technicianId}`,
      );

      console.log("Bookings:", response.data);

      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/booking/${bookingId}/status?status=${status}`,
      );

      fetchBookings(technician.id);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "10px",
          color: "#1e293b",
        }}
      >
        Worker Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Welcome {user.name}
      </p>

      <a
        href="/complete-technician-profile"
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Complete Profile
      </a>

      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px",
          color: "#1e293b",
        }}
      >
        Your Bookings
      </h2>

      {bookings.length === 0 ? (
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>No bookings assigned</h3>
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              marginBottom: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                color: "#2563eb",
                marginBottom: "10px",
              }}
            >
              {booking.service?.name}
            </h3>

            <p>
              <strong>Issue:</strong> {booking.issue?.title}
            </p>

            <p>
              <strong>Address:</strong> {booking.address}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    booking.status === "COMPLETED"
                      ? "green"
                      : booking.status === "IN_PROGRESS"
                        ? "orange"
                        : "red",
                  fontWeight: "bold",
                }}
              >
                {booking.status}
              </span>
            </p>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => updateStatus(booking.id, "IN_PROGRESS")}
                style={{
                  backgroundColor: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Start Work
              </button>

              <button
                onClick={() => updateStatus(booking.id, "COMPLETED")}
                style={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Complete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkerDashboard;
