import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import logo from "../../assets/vite.svg";
import {
  FaExclamationTriangle,
  FaTools,
  FaFileAlt,
  FaInfoCircle,
  FaArrowLeft,
  FaPlusCircle,
  FaTrash,
  FaEye,
  FaFilter,
  FaSearch,
  FaUserCheck,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaClock,
} from "react-icons/fa";

const ReportIssue = () => {

  const [activeTab, setActiveTab] = useState("reports");

  const [services, setServices] = useState([]);

  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    serviceId: "",
  });
  const [formMessage, setFormMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const servicesRes = await axios.get("/services/all");
      const bookingsRes = await axios.get("/booking/all");
      const techRes = await axios.get("/technicians/all");

      setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
      setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
      setTechnicians(Array.isArray(techRes.data) ? techRes.data : []);
    } catch (error) {
      console.log("Error loading dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.put(`/booking/${bookingId}/status?status=${newStatus}`);
      alert("Status updated successfully");
      const updatedBookings = await axios.get("/booking/all");
      setBookings(Array.isArray(updatedBookings.data) ? updatedBookings.data : []);
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  const handleTechnicianAssign = async (bookingId, technicianId) => {
    if (!technicianId) return;
    try {
      await axios.put(`/booking/${bookingId}/assign/${technicianId}`);
      alert("Technician assigned successfully");
      const updatedBookings = await axios.get("/booking/all");
      setBookings(Array.isArray(updatedBookings.data) ? updatedBookings.data : []);
    } catch (error) {
      console.log(error);
      alert("Failed to assign technician");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this issue report?")) return;
    try {
      await axios.delete(`/booking/${bookingId}`);
      alert("Issue report deleted successfully");
      const updatedBookings = await axios.get("/booking/all");
      setBookings(Array.isArray(updatedBookings.data) ? updatedBookings.data : []);
      if (selectedBooking?.id === bookingId) {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete issue report");
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceIssueCreation = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage("");

    try {
      await axios.post("/issues/create", formData);
      setFormSuccess(true);
      setFormMessage("New issue category configured successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        serviceId: "",
      });
    } catch (error) {
      console.log(error);
      setFormSuccess(false);
      setFormMessage("Failed to configure issue category. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border border-emerald-250";
      case "IN_PROGRESS":
        return "bg-blue-50 text-primary border border-blue-200 animate-pulseLight";
      case "ASSIGNED":
        return "bg-blue-50/50 text-secondary border border-blue-150";
      case "PENDING":
      default:
        return "bg-amber-50 text-amber-700 border border-amber-200";
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const customerName = b.user?.name?.toLowerCase() || "";
    const serviceName = b.service?.name?.toLowerCase() || "";
    const issueTitle = b.issue?.title?.toLowerCase() || "";
    const description = b.issue?.description?.toLowerCase() || "";

    const matchesSearch =
      customerName.includes(searchTerm.toLowerCase()) ||
      serviceName.includes(searchTerm.toLowerCase()) ||
      issueTitle.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase()) ||
      String(b.id).includes(searchTerm);

    const matchesStatus = statusFilter === "" || b.status === statusFilter;
    const matchesService = serviceFilter === "" || String(b.service?.id) === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const formatBookingDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) + " " + date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text pb-20 font-sans">

      <header className="sticky top-0 z-50 bg-navy text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="B1K Services Logo" className="h-14 w-auto object-contain transition-all duration-300 hover:scale-105" />
            </Link>
            <div className="border-l border-slate-700 pl-3 hidden sm:block">
              <span className="text-sm font-bold tracking-wider text-light-blue uppercase">Admin Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-colors duration-200 cursor-pointer text-xs px-4 py-2 border border-slate-800 rounded-xl"
            >
              <FaArrowLeft className="text-xs" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-8">

        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight flex items-center gap-3">
            <FaExclamationTriangle className="text-primary" />
            Manage Issues
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Track user booking issues, assign service experts, update order statuses, and add new appliance issue presets
          </p>
        </div>

        <div className="flex border-b border-custom-border gap-6">
          <button
            onClick={() => { setActiveTab("reports"); setCurrentPage(1); }}
            className={`pb-4 text-sm font-bold transition-all border-b-2 outline-none cursor-pointer ${
              activeTab === "reports"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-navy"
            }`}
          >
            Issue Reports List ({filteredBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("configure")}
            className={`pb-4 text-sm font-bold transition-all border-b-2 outline-none cursor-pointer ${
              activeTab === "configure"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-navy"
            }`}
          >
            Configure New Issue Category
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
            <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
            <span className="text-sm font-semibold">Loading Module Details...</span>
          </div>
        ) : activeTab === "reports" ? (
          <div className="space-y-6">

            <div className="bg-white p-5 rounded-2xl border border-custom-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search by customer, service type, issue title, ID..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-custom-border rounded-xl outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-slate-400 text-xs" />
                  <span className="text-xs font-semibold text-slate-500">Filters:</span>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="px-3 py-2 bg-slate-50 border border-custom-border rounded-xl outline-none text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  <option value="PENDING">PENDING</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>

                <select
                  value={serviceFilter}
                  onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }}
                  className="px-3 py-2 bg-slate-50 border border-custom-border rounded-xl outline-none text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="">All Appliances</option>
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>{svc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white border border-custom-border rounded-3xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-custom-border text-slate-500 font-bold text-xs uppercase tracking-wider">
                      <th className="py-4 px-6">Issue ID</th>
                      <th className="py-4 px-6">Appliance</th>
                      <th className="py-4 px-6">Issue Name</th>
                      <th className="py-4 px-6">Customer</th>
                      <th className="py-4 px-6 text-center">Status</th>
                      <th className="py-4 px-6">Assigned Technician</th>
                      <th className="py-4 px-6 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {currentBookings.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-500 font-semibold">
                          No Issue Reports Found
                        </td>
                      </tr>
                    ) : (
                      currentBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/40 transition-colors duration-200">
                          <td className="py-4 px-6 font-mono font-bold text-slate-400">#{b.id}</td>
                          <td className="py-4 px-6 font-bold text-navy">{b.service?.name}</td>
                          <td className="py-4 px-6">
                            <div className="space-y-0.5">
                              <span className="font-semibold text-slate-800 block truncate max-w-[180px]" title={b.issue?.title}>{b.issue?.title}</span>
                              <span className="text-xs text-slate-450 truncate max-w-[200px] block" title={b.issue?.description}>{b.issue?.description}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-0.5">
                              <span className="font-semibold text-slate-900 block">{b.user?.name}</span>
                              <span className="text-xs text-slate-400 block">{b.user?.phone || "No Phone"}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <select
                              value={b.status || ""}
                              onChange={(e) => handleStatusUpdate(b.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-bold outline-none cursor-pointer border ${getStatusBadge(b.status)}`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="ASSIGNED">ASSIGNED</option>
                              <option value="IN_PROGRESS">IN PROGRESS</option>
                              <option value="COMPLETED">COMPLETED</option>
                            </select>
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={b.technician?.id || ""}
                              onChange={(e) => handleTechnicianAssign(b.id, e.target.value)}
                              className="px-2 py-1 bg-slate-50 border border-slate-200 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-lg outline-none text-xs font-semibold text-slate-700 cursor-pointer w-40"
                            >
                              <option value="">Select Technician</option>
                              {technicians.map((t) => (
                                <option key={t.id} value={t.id}>{t.name} ({t.skills})</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => { setSelectedBooking(b); setShowModal(true); }}
                                className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-pointer"
                                title="View Details"
                              >
                                <FaEye className="text-xs" />
                              </button>
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 text-red-555 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 cursor-pointer"
                                title="Delete"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="bg-slate-50 px-6 py-4 border-t border-custom-border flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} bookings
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border border-custom-border bg-white rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentPage === index + 1
                            ? "bg-primary text-white"
                            : "border border-custom-border bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border border-custom-border bg-white rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Configure new issue Tab content */
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-custom-border shadow-sm overflow-hidden mx-auto mt-4">
            <div className="bg-navy text-white p-8 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-lg shadow-md shadow-primary/20">
                  <FaPlusCircle />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight">Configure Issue Option</h1>
              </div>
              <p className="text-slate-400 text-sm pl-13">
                Add specific breakdowns that customers can select dynamically during booking
              </p>
            </div>

            <div className="p-8">
              {formMessage && (
                <div
                  className={`mb-6 p-4 rounded-2xl text-center font-semibold text-sm border ${
                    formSuccess
                      ? "bg-blue-50 text-primary border-blue-200"
                      : "bg-red-50 text-red-500 border-red-200"
                  }`}
                >
                  {formMessage}
                </div>
              )}

              <form onSubmit={handleServiceIssueCreation} className="space-y-6">
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="serviceId">
                    Select Service Category
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                      <FaTools className="text-sm" />
                    </span>
                    <select
                      id="serviceId"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleFormChange}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium appearance-none cursor-pointer"
                    >
                      <option value="">Choose Service category</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 pointer-events-none text-xs">
                      ▼
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="title">
                    Issue Title
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                      <FaExclamationTriangle className="text-sm" />
                    </span>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      placeholder="Example: Compressor Failure / Gas Leakage"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="description">
                    Issue Description
                  </label>
                  <div className="relative">
                    <span className="absolute top-3.5 left-4 text-slate-400">
                      <FaFileAlt className="text-sm" />
                    </span>
                    <textarea
                      id="description"
                      rows="4"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="Describe the diagnostics and repairing scope of this breakdown..."
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 resize-none transition-all duration-300 text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="price">
                    Estimated Repair Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">
                      ₹
                    </span>
                    <input
                      id="price"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      placeholder="299"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-custom-border focus:border-secondary focus:ring-1 focus:ring-secondary rounded-2xl outline-none text-navy placeholder-slate-400 transition-all duration-300 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 border border-custom-border rounded-2xl p-5 space-y-2">
                  <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                    <FaInfoCircle className="text-primary" />
                    Issue Guidelines
                  </h3>
                  <ul className="list-disc list-inside text-xs text-slate-500 space-y-1.5 pl-1 leading-relaxed">
                    <li>
                      Assign issues to correct parent service categories (e.g. AC Repair vs Television).
                    </li>
                    <li>
                      Write short, descriptive titles like "Thermostat Repair" for clear booking cards.
                    </li>
                    <li>
                      Set estimate pricing dynamically. Final technician quotes can adapt in-person.
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/60 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 transition duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm hover:-translate-y-0.5 active:translate-y-0"
                >
                  {formLoading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Create Issue Option"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-white border border-custom-border rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
            <div className="bg-navy p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-lg">Issue Report Details</h3>
                <p className="text-xs text-slate-400">Order ID: #{selectedBooking.id}</p>
              </div>
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(selectedBooking.status)}`}>
                {selectedBooking.status}
              </span>
            </div>

            <div className="p-6 space-y-6 text-sm text-slate-700">

              <div className="space-y-2">
                <h4 className="font-extrabold text-navy text-base border-b pb-2 flex items-center gap-2">
                  <FaTools className="text-primary text-xs" />
                  Service Request Information
                </h4>
                <div className="grid grid-cols-2 gap-y-2 pt-1">
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block">Appliance Category</span>
                    <span className="font-bold text-navy text-sm">{selectedBooking.service?.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block">Issue Name</span>
                    <span className="font-bold text-slate-800 text-sm">{selectedBooking.issue?.title}</span>
                  </div>
                  <div className="col-span-2 pt-1">
                    <span className="text-slate-400 text-xs font-semibold block">Diagnostics Scope</span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 border p-3 rounded-xl mt-1">{selectedBooking.issue?.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-navy text-base border-b pb-2 flex items-center gap-2">
                  <FaUser className="text-primary text-xs" />
                  Customer Contact & Address
                </h4>
                <div className="grid grid-cols-2 gap-y-2 pt-1">
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block">Client Name</span>
                    <span className="font-semibold text-slate-800">{selectedBooking.user?.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-semibold block">Contact Email</span>
                    <span className="font-semibold text-slate-650 break-all">{selectedBooking.user?.email || "N/A"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-xs font-semibold block">Billing Address</span>
                    <span className="font-medium text-slate-600 block pt-0.5 leading-relaxed">{selectedBooking.address}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <span className="text-slate-400 text-xs font-semibold block">Booking Time</span>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-xs pt-1">
                    <FaCalendarAlt className="text-slate-400 text-xs shrink-0" />
                    {formatBookingDate(selectedBooking.bookingDate)}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-semibold block">Total Estimated Cost</span>
                  <span className="text-xl font-black text-primary block pt-0.5">
                    ₹{(selectedBooking.service?.basePrice || 0) + (selectedBooking.issue?.price || 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={() => handleDeleteBooking(selectedBooking.id)}
                className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold px-4 py-2 border border-red-150 rounded-xl transition duration-200 text-xs cursor-pointer"
              >
                Delete Issue
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-2 rounded-xl transition duration-200 text-xs cursor-pointer shadow-md shadow-primary/25"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportIssue;
