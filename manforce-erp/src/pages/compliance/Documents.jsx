import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Search,
  Eye,
  Download,
  Upload,
  AlertTriangle,
  X,
  ChevronDown,
} from "lucide-react";

export default function Documents({ role = "admin" }) {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const docData = [
    {
      name: "Mohammed Al Rashidi",
      type: "Visa",
      number: "UAE-V-20241234",
      expiry: "2025-08-14",
      daysLeft: "65 days",
      status: "Valid",
    },
    {
      name: "Carlos Fernandez",
      type: "Visa",
      number: "UAE-V-20239876",
      expiry: "2024-12-20",
      daysLeft: "Expired 172 days ago",
      status: "Expired",
    },
    {
      name: "Bibek Thapa",
      type: "Visa",
      number: "UAE-V-20215555",
      expiry: "2025-07-05",
      daysLeft: "25 days",
      status: "Expiring",
    },
    {
      name: "Ramesh Kumar",
      type: "Emirates ID",
      number: "784-2019-9876543-2",
      expiry: "2025-11-30",
      daysLeft: "173 days",
      status: "Valid",
    },
    {
      name: "Sanjay Patel",
      type: "Labour Card",
      number: "LBR-2021-77777",
      expiry: "2025-09-15",
      daysLeft: "97 days",
      status: "Valid",
    },
    {
      name: "Ahmed Hassan",
      type: "Emirates ID",
      number: "784-2022-3333333-5",
      expiry: "2026-03-10",
      daysLeft: "273 days",
      status: "Valid",
    },
  ];

  // Logic to count expiring or expired documents
  const criticalCount = docData.filter(
    (d) => d.status === "Expired" || d.status === "Expiring",
  ).length;
  const criticalList = docData
    .filter((d) => d.status === "Expired" || d.status === "Expiring")
    .map((d) => `${d.name} (${d.type}: ${d.status})`)
    .join(", ");

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg transition-all cursor-pointer"
          >
            <Upload size={16} /> Upload Doc
          </button>
        </div>

        {/* --- CRITICAL ALERT BAR (Matches Screenshot) --- */}
        {criticalCount > 0 && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 shadow-sm">
            <AlertTriangle size={18} className="text-red-500 shrink-0" />
            <p className="text-xs font-bold text-red-800">
              {criticalCount} critical document issue(s):{" "}
              <span className="font-medium text-red-600 ml-1">
                {criticalList}
              </span>
            </p>
          </div>
        )}

        {/* Document Tracker Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center px-8">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              Document Tracker
            </h3>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-[#c5a447] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:brightness-105 transition-all cursor-pointer"
            >
              Upload Document
            </button>
          </div>

          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Worker</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Number</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Days Left</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {docData.map((doc, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-800">
                    {doc.name}
                  </td>
                  <td className="px-6 py-5 text-slate-500 font-medium">
                    {doc.type}
                  </td>
                  <td className="px-6 py-5 font-mono text-slate-400 uppercase">
                    {doc.number}
                  </td>
                  <td className="px-6 py-5 font-mono text-slate-500">
                    {doc.expiry}
                  </td>
                  <td
                    className={`px-6 py-5 font-bold ${
                      doc.status === "Expired"
                        ? "text-red-500"
                        : doc.status === "Expiring"
                          ? "text-amber-600"
                          : "text-emerald-600"
                    }`}
                  >
                    {doc.daysLeft}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${
                        doc.status === "Valid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : doc.status === "Expired"
                            ? "bg-red-50 text-red-400 border-red-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- UPLOAD MODAL (UI Placeholder) --- */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">
                  Upload New Document
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-brand-gold transition-colors cursor-pointer group">
                  <Upload
                    size={32}
                    className="mx-auto text-slate-300 group-hover:text-brand-gold mb-3"
                  />
                  <p className="text-sm font-bold text-slate-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">
                    PDF, JPG or PNG (Max 5MB)
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-3 bg-brand-gold text-white rounded-xl font-bold text-xs shadow-lg">
                    Save Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
