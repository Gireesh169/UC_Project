const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <a href="/service-creation">Create Service</a>
        </li>
        <li>
          <a href="/report-issue">View Issue Reports</a>
        </li>
        <li>
          <a href="/technician-management">Manage Technicians</a>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
