import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteTechnicianProfile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skills: "",
    experience: "",
    available: true,
  });

  useEffect(() => {
    checkExistingProfile();
  }, []);

  const checkExistingProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/technicians/user/${user.id}`,
      );

      if (response.data) {
        navigate("/worker-dashboard");
      }
    } catch (error) {
      console.log("No profile found");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const technicianData = {
        ...formData,
        user: {
          id: user.id,
        },
      };

      await axios.post("http://localhost:8080/technicians", technicianData);

      alert("Profile Completed Successfully");

      navigate("/worker-dashboard");
    } catch (error) {
      console.log(error);

      alert("Error Saving Profile");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Complete Technician Profile
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (AC, Plumbing, Electrician)"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience in Years"
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={saveProfile}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

export default CompleteTechnicianProfile;
