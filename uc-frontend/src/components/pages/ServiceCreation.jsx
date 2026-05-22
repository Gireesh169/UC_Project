import React, { useState } from "react";
import axios from "axios";

const ServiceCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceCreation = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/services/create",
        {
          name: formData.name,
          description: formData.description,
          basePrice: formData.basePrice,
        },
      );

      console.log(response.data);

      setMessage("Service Created Successfully");

      setFormData({
        name: "",
        description: "",
        basePrice: "",
      });
    } catch (error) {
      console.log(error);

      setMessage("Service Creation Failed");
    }
  };

  return (
    <div className="service-container">
      <h1>Create Service</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleServiceCreation} className="service-form">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="basePrice"
          placeholder="Base Price"
          value={formData.basePrice}
          onChange={handleChange}
        />

        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default ServiceCreation;
