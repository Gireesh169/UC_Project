import React, { useState } from "react";
import axios from "axios";

const ReportIssue = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    serviceId: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/issues/create", {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        serviceId: formData.serviceId,
      });

      console.log(response.data);

      setMessage("Issue Reported Successfully");
    } catch (error) {
      console.log(error);

      setMessage("Issue Reporting Failed");
    }
  };

  return (
    <div>
      <h2>Report an Issue</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Issue Description"
          onChange={handleChange}
        ></textarea>

        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Estimated Price"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="serviceId"
          placeholder="Service ID"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportIssue;
