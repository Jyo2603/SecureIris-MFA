import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [resources, setResources] = useState([]);
  const [deleteName, setDeleteName] = useState("");

  useEffect(() => {
    if (!email) {
      alert("Session expired. Please login again.");
      navigate("/register");
      return;
    }

    const fetchResources = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/resource/list/${email}`);
        setResources(res.data.resources || []);
      } catch (err) {
        console.error("Error fetching resources:", err);
        alert("Error loading your resources.");
      }
    };

    fetchResources();
  }, [email, navigate]);

  const createResource = async (type) => {
    try {
      const res = await axios.post("http://localhost:5050/api/resource/create", {
        email,
        type,
      });
      alert(res.data.message || `${type} created.`);
      // Refresh list
      const updatedRes = await axios.get(`http://localhost:5050/api/resource/list/${email}`);
      setResources(updatedRes.data.resources || []);
    } catch (err) {
      console.error(`Error creating ${type}:`, err);
      alert(`Error creating ${type}`);
    }
  };

  const deleteResource = async () => {
    if (!deleteName.trim()) {
      alert("Please enter a resource name.");
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:5050/api/resource/delete/${deleteName}`);
      alert(res.data.message || "Resource deleted.");
      setDeleteName("");
      const updatedRes = await axios.get(`http://localhost:5050/api/resource/list/${email}`);
      setResources(updatedRes.data.resources || []);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete resource.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("🚪 Logged out successfully.");
    navigate("/register");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to Secure Iris MFA Dashboard</h2>
      <p>🎉 Successfully authenticated!</p>
      <p>🔒 Logged in as: <strong>{email}</strong></p>

      <div className="dashboard-info">
        <h3>🔍 Confidential Info</h3>
        <p>This dashboard displays sensitive tender information and company documents.</p>
        <ul>
          <li>📁 Tender_001_Confidential.pdf</li>
          <li>📁 Budget2025_Draft.xlsx</li>
          <li>📁 R&D_Tech_Roadmap.docx</li>
        </ul>
      </div>

      <div className="resource-section">
        <h3>🖥️ Simulated Cloud Resources</h3>
        <button onClick={() => createResource("vm")}>Create VM</button>
        <button onClick={() => createResource("bucket")}>Create Bucket</button>

        <h4>My Resources:</h4>
        <ul>
          {resources.length === 0 ? (
            <li>No resources created yet</li>
          ) : (
            resources.map((res, i) => (
              <li key={i}>{res.name} ({res.type})</li>
            ))
          )}
        </ul>

        <div className="delete-section">
          <input
            type="text"
            value={deleteName}
            onChange={(e) => setDeleteName(e.target.value)}
            placeholder="Enter resource name to delete"
          />
          <button onClick={deleteResource}>Delete</button>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
