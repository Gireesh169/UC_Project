import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReportIssue from "../pages/ReportIssue";

const CitizenDashboard = () => {
  return (
    <div>
      <h1>Citizen Dashboard</h1>

      <div>
        <ul>
          <li>
            <a href="/report-issue">Report an Issue</a>
          </li>
          <li>
            <a href="/track-issue">Track Issue Status</a>
          </li>
          <li>
            <a href="/view-history">View Past Reports</a>
          </li>
          <li>
            <a href="/profile">Update Profile</a>
          </li>
          <li>
            <a href="/booking">Book a Service</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CitizenDashboard;
