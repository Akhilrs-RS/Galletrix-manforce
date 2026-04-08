import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import all pages
import RoleSelection from "./pages/RoleSelection";
import AdminDashboard from "./pages/AdminDashboard";
import HRDashboard from "./pages/HRDashboard"; // 1. IMPORT THE HR DASHBOARD
import Workers from "./pages/Workers";
import Clients from "./pages/Clients";
import Deployment from "./pages/Deployment";
import Attendance from "./pages/Attendance";
import Recruitment from "./pages/Recruitment";
import Payroll from "./pages/Payroll";
import Invoices from "./pages/Invoices";
import LeaveMgmt from "./pages/LeaveMgmt";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import RolesAccess from "./pages/RolesAccess";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth / Landing */}
        <Route path="/" element={<RoleSelection />} />
        {/* Dashboards */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />{" "}
        {/* 2. ADD THE HR ROUTE */}
        {/* Core Sections */}
        <Route path="/workers" element={<Workers />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/deployment" element={<Deployment />} />
        {/* Operations Sections */}
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/leave-mgmt" element={<LeaveMgmt />} />
        {/* Compliance & System */}
        <Route path="/documents" element={<Documents />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/roles" element={<RolesAccess />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
