import React, { useEffect, useState } from "react";
import axios from "axios";
import CitizenDashboardNav from "./CitizenDashboardNav";

function UpdateProfile() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = () => {
    axios
      .put(`http://localhost:8080/users/edit/${user.id}`, user)
      .then((response) => {
        alert("Profile Updated Successfully");
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <CitizenDashboardNav />

      <div className="pt-32 flex justify-center">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Update Profile
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Address</label>
              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              onClick={updateProfile}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition duration-300"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
