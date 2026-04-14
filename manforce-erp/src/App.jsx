import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth / Landing
import RoleSelection from "./pages/auth/RoleSelection";

// Core Pages
import AdminDashboard from "./pages/core/AdminDashboard";
import HRDashboard from "./pages/core/HRDashboard";
import SupervisorDashboard from "./pages/core/SupervisorDashboard";
import WorkerDashboard from "./pages/core/WorkerDashboard";
import Workers from "./pages/core/Workers";
import Clients from "./pages/core/Clients";
import Deployment from "./pages/core/Deployment";
import RolesAccess from "./pages/core/RolesAccess";
import CRM from "./pages/core/CRM"; // ✅ Added CRM Import

// Accounts Page
import AccountsDashboard from "./pages/accounts/AccountsDashboard";

// Worker Specific Pages
import WorkerProfile from "./pages/worker/WorkerProfile";
import WorkerLeaves from "./pages/worker/WorkerLeaves";

// Operations Pages
import Attendance from "./pages/operations/Attendance";
import Recruitment from "./pages/operations/Recruitment";
import Payroll from "./pages/operations/Payroll";
import Invoices from "./pages/operations/Invoices";
import LeaveMgmt from "./pages/operations/LeaveMgmt";

// Compliance Pages
import Documents from "./pages/compliance/Documents";
import Reports from "./pages/compliance/Reports";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ENTRY POINT */}
        <Route path="/" element={<RoleSelection />} />
        {/* --- ADMIN MODULE --- */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard role="admin" />}
        />
        <Route path="/workers" element={<Workers />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/deployment" element={<Deployment role="admin" />} />
        <Route path="/attendance" element={<Attendance role="admin" />} />
        <Route path="/recruitment" element={<Recruitment role="admin" />} />
        <Route path="/leave-mgmt" element={<LeaveMgmt role="admin" />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/documents" element={<Documents role="admin" />} />
        <Route path="/reports" element={<Reports role="admin" />} />
        <Route path="/roles" element={<RolesAccess role="admin" />} />
        <Route path="/crm" element={<CRM role="admin" />} />{" "}
        {/* ✅ Added CRM Route */}
        {/* --- HR MODULE --- */}
        <Route path="/hr-dashboard" element={<HRDashboard role="hr" />} />
        <Route path="/hr-workers" element={<Workers role="hr" />} />
        <Route path="/hr-attendance" element={<Attendance role="hr" />} />
        <Route path="/hr-recruitment" element={<Recruitment role="hr" />} />
        <Route path="/hr-leave-mgmt" element={<LeaveMgmt role="hr" />} />
        <Route path="/hr-documents" element={<Documents role="hr" />} />
        <Route path="/hr-reports" element={<Reports role="hr" />} />
        {/* --- SUPERVISOR MODULE --- */}
        <Route
          path="/sv-dashboard"
          element={<SupervisorDashboard role="supervisor" />}
        />
        <Route path="/sv-workers" element={<Workers role="supervisor" />} />
        <Route
          path="/sv-deployment"
          element={<Deployment role="supervisor" />}
        />
        <Route
          path="/sv-attendance"
          element={<Attendance role="supervisor" />}
        />
        {/* --- WORKER MODULE --- */}
        <Route
          path="/worker-dashboard"
          element={<WorkerDashboard role="worker" />}
        />
        <Route
          path="/worker-profile"
          element={<WorkerProfile role="worker" />}
        />
        <Route path="/worker-leaves" element={<WorkerLeaves role="worker" />} />
        {/* --- ACCOUNTS MODULE --- */}
        <Route
          path="/accounts-dashboard"
          element={<AccountsDashboard role="accounts" />}
        />
        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
