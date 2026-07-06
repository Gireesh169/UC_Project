import { useState } from "react";

import Login from "./components/Login";
import SignUp from "./components/SingUp";
import LandingPage from "./components/Landing";
import CitizenDashboard from "./components/dashboards/CitizenDashboard";
import AdminDashboard from "./components/dashboards/AdminDashbaord";
import WorkerDashboard from "./components/dashboards/WorkerDashboard";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ReportIssue from "./components/pages/ReportIssue";
import Booking from "./components/pages/Booking";
import ServiceCreation from "./components/pages/ServiceCreation";
import TechnicianAssignment from "./components/pages/TechnicianAssignment";
import CompleteTechnicianProfile from "./components/pages/CompleteTechnicianProfile";
import ViewPastBooking from "./components/pages/ViewPastBooking";
import UpdateProfile from "./components/pages/UpdateProfile";
import BookingDetails from "./components/pages/BookingDetails";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/service-creation" element={<ServiceCreation />} />
        <Route
          path="/technician-management"
          element={<TechnicianAssignment />}
        />
        <Route
          path="/complete-technician-profile"
          element={<CompleteTechnicianProfile />}
        />
        <Route path="/view-history" element={<ViewPastBooking />} />
        <Route path="/citizenHome" element={<CitizenDashboard />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/booking/:id" element={<BookingDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
