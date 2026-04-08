import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Search, Eye, Download } from "lucide-react";

// 1. Accept the role prop (defaults to admin if not provided)
export default function Documents({ role = "admin" }) {
  const docData = [
    {
      name: "Mohammed Al Rashidi",
      type: "Visa Copy",
      expiry: "2024-12-14",
      status: "Expiring Soon",
    },
    {
      name: "Carlos Fernandez",
      type: "Labor Card",
      expiry: "2025-08-20",
      status: "Valid",
    },
    {
      name: "Ahmed Hassan",
      type: "Passport",
      expiry: "2024-11-10",
      status: "Expiring Soon",
    },
    {
      name: "Ramesh Kumar",
      type: "Insurance",
      expiry: "2026-03-15",
      status: "Valid",
    },
    {
      name: "Sanjay Patel",
      type: "Emirates ID",
      expiry: "2025-01-05",
      status: "Valid",
    },
  ];

  return (
    // 2. Pass the dynamic role prop here
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
          <div className="flex-1 flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 group focus-within:border-brand-gold">
            <Search
              size={16}
              className="text-slate-400 mr-3 group-focus-within:text-brand-gold"
            />
            <input
              type="text"
              placeholder="Search by worker or document type..."
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {docData.map((doc, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors text-[12px]"
                >
                  <td className="px-6 py-4 font-bold text-slate-700">
                    {doc.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {doc.type}
                  </td>
                  <td
                    className={`px-6 py-4 font-mono ${doc.status === "Expiring Soon" ? "text-red-500 font-bold" : "text-slate-600"}`}
                  >
                    {doc.expiry}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        doc.status === "Valid"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-brand-navy transition-colors cursor-pointer">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors cursor-pointer">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
