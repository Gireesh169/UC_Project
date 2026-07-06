import React, { useEffect, useState } from "react";
import axios from "axios";

const TechnicianAssignment = () => {
  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bookingsRes = await axios.get(
        "http://localhost:8080/booking/pending",
      );

      const historyRes = await axios.get(
        "http://localhost:8080/booking/history",
      );

      const techRes = await axios.get("http://localhost:8080/technicians/all");

      setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);

      setHistory(Array.isArray(historyRes.data) ? historyRes.data : []);

      setTechnicians(Array.isArray(techRes.data) ? techRes.data : []);
    } catch (error) {
      console.log(error);

      setBookings([]);
      setHistory([]);
      setTechnicians([]);

      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#f39c12";

      case "ASSIGNED":
        return "#3498db";

      case "IN_PROGRESS":
        return "#8e44ad";

      case "COMPLETED":
        return "#27ae60";

      default:
        return "#7f8c8d";
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <h2>Loading Technician Dashboard...</h2>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      {/* Header */}

      <div style={styles.header}>
        <h1 style={styles.heading}>Technician Assignment</h1>

        <p style={styles.subheading}>Assign technicians to service bookings</p>
      </div>

      {/* Pending Bookings */}

      <h2 style={styles.sectionTitle}>Pending Assignments</h2>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Booking</th>

              <th style={styles.th}>Customer</th>

              <th style={styles.th}>Service</th>

              <th style={styles.th}>Issue</th>

              <th style={styles.th}>Address</th>

              <th style={styles.th}>Status</th>

              <th style={styles.th}>Assign</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={styles.empty}>
                  No Pending Bookings
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} style={styles.tr}>
                  <td style={styles.td}>#{booking.id}</td>

                  <td style={styles.td}>{booking.user?.name}</td>

                  <td style={styles.td}>{booking.service?.name}</td>

                  <td style={styles.td}>{booking.issue?.title}</td>

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
                      defaultValue=""
                      style={styles.select}
                      onChange={(e) =>
                        assignTechnician(booking.id, e.target.value)
                      }
                    >
                      <option value="">Select Technician</option>

                      {technicians.map((tech) => (
                        <option key={tech.id} value={tech.id}>
                          {tech.name} ({tech.skills})
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* History */}

      <h2
        style={{
          ...styles.sectionTitle,
          marginTop: 50,
        }}
      >
        Assignment History
      </h2>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Booking</th>

              <th style={styles.th}>Customer</th>

              <th style={styles.th}>Service</th>

              <th style={styles.th}>Issue</th>

              <th style={styles.th}>Technician</th>

              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.empty}>
                  No Assignment History
                </td>
              </tr>
            ) : (
              history.map((booking) => (
                <tr key={booking.id} style={styles.tr}>
                  <td style={styles.td}>#{booking.id}</td>

                  <td style={styles.td}>{booking.user?.name}</td>

                  <td style={styles.td}>{booking.service?.name}</td>

                  <td style={styles.td}>{booking.issue?.title}</td>

                  <td style={styles.td}>
                    {booking.technician?.name || "Not Assigned"}
                  </td>

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
                </tr>
              ))
            )}
          </tbody>
        </table>
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

  sectionTitle: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#2c3e50",
    fontWeight: "bold",
  },

  tableContainer: {
    background: "white",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "40px",
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
    width: "220px",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#7f8c8d",
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default TechnicianAssignment;
