import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaPhone, FaTools, FaCalendarAlt, FaIdCard, FaArrowLeft, FaSave } from "react-icons/fa";

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
  const [loading, setLoading] = useState(false);

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
    if (!formData.name.trim() || !formData.phone.trim() || !formData.skills.trim() || !formData.experience) {
      alert("Please fill in all details");
      return;
    }

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center p-6 relative">
      
      {/* Back Button */}
      <Link 
        to="/worker-dashboard" 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-colors cursor-pointer text-sm"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-teal-650 flex items-center justify-center text-2xl mx-auto">
            <FaIdCard />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Complete Profile
          </h1>
          <p className="text-slate-500 text-sm">
            Fill in your technician details to start receiving workorders
          </p>
        </div>

        {/* Inputs Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <FaUser className="text-sm" />
              </span>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-400 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <FaPhone className="text-sm" />
              </span>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Enter Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-400 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="skills">
              Skills (Comma Separated)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <FaTools className="text-sm" />
              </span>
              <input
                id="skills"
                type="text"
                name="skills"
                placeholder="AC, Refrigerator, Washing Machine"
                value={formData.skills}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-400 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="experience">
              Experience (in Years)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <FaCalendarAlt className="text-sm" />
              </span>
              <input
                id="experience"
                type="number"
                name="experience"
                placeholder="Experience in Years"
                value={formData.experience}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-teal-505 focus:ring-1 focus:ring-teal-505 rounded-2xl outline-none text-slate-900 placeholder-slate-400 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            disabled={loading}
            className="w-full bg-teal-650 hover:bg-teal-700 disabled:bg-teal-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-teal-600/10 transition duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <FaSave />
                Save Profile
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompleteTechnicianProfile;
