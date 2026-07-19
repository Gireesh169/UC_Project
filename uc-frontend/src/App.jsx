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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/citizen-dashboard"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizenHome"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <BookingDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-issue"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ReportIssue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service-creation"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ServiceCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician-management"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <TechnicianAssignment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute allowedRoles={["worker"]}>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-technician-profile"
          element={
            <ProtectedRoute allowedRoles={["worker"]}>
              <CompleteTechnicianProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-history"
          element={
            <ProtectedRoute allowedRoles={["citizen", "worker", "admin"]}>
              <ViewPastBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateProfile"
          element={
            <ProtectedRoute allowedRoles={["citizen", "worker", "admin"]}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
