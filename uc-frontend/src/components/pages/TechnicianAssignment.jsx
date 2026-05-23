import React, { useEffect, useState } from "react";
import axios from "axios";

const TechnicianAssignment = () => {
  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // FETCH ONLY PENDING BOOKINGS
      const bookingsRes = await axios.get(
        "http://localhost:8080/booking/pending",
      );

      const techRes = await axios.get("http://localhost:8080/technicians/all");

      // SAFE ARRAY CHECK
      if (Array.isArray(bookingsRes.data)) {
        setBookings(bookingsRes.data);
      } else {
        setBookings([]);
      }

      if (Array.isArray(techRes.data)) {
        setTechnicians(techRes.data);
      } else {
        setTechnicians([]);
      }
    } catch (error) {
      console.log(error);

      setBookings([]);
      setTechnicians([]);

      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // ASSIGN TECHNICIAN
  const assignTechnician = async (bookingId, technicianId) => {
    if (!technicianId) return;

    try {
      await axios.put(
        `http://localhost:8080/booking/${bookingId}/assign/${technicianId}`,
      );

      alert("Technician Assigned Successfully");

      fetchData();
    } catch (error) {
      console.log(error);

      alert("Assignment Failed");
    }
  };

  // STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#f39c12";

      case "ASSIGNED":
        return "#3498db";

      case "IN_PROGRESS":
        return "#9b59b6";

      case "COMPLETED":
        return "#27ae60";

      default:
        return "#7f8c8d";
    }
  };

  // LOADING
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <h2>Loading Technician Assignment...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Technician Assignment</h1>

        <p style={styles.subheading}>
          Assign technicians to pending service bookings
        </p>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Booking ID</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Issue</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Assign Technician</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} style={styles.tr}>
                <td style={styles.td}>#{booking.id}</td>

                <td style={styles.td}>{booking.service?.name || "N/A"}</td>

                <td style={styles.td}>{booking.issue?.title || "N/A"}</td>

                <td style={styles.td}>{booking.address}</td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor: getStatusColor(booking.status),
                    }}
                  >
                    {booking.status}
                  </span>
                </td>

                <td style={styles.td}>
                  <select
                    style={styles.select}
                    defaultValue=""
                    onChange={(e) =>
                      assignTechnician(booking.id, e.target.value)
                    }
                  >
                    <option value="">Select Technician</option>

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

        {bookings.length === 0 && (
          <div style={styles.empty}>No pending bookings available</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  header: {
    marginBottom: "30px",
  },

  heading: {
    fontSize: "36px",
    color: "#2c3e50",
    marginBottom: "10px",
  },

  subheading: {
    color: "#7f8c8d",
    fontSize: "16px",
  },

  tableContainer: {
    background: "white",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  tableHeaderRow: {
    background: "#2c3e50",
  },

  th: {
    color: "white",
    padding: "18px",
    textAlign: "left",
    fontSize: "15px",
  },

  tr: {
    borderBottom: "1px solid #ecf0f1",
  },

  td: {
    padding: "18px",
    fontSize: "14px",
    color: "#2c3e50",
  },

  status: {
    padding: "8px 14px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "230px",
    cursor: "pointer",
    outline: "none",
  },

  empty: {
    padding: "40px",
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "18px",
  },

  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default TechnicianAssignment;
