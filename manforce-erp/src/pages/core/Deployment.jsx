import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Truck, MapPin, Clock, Users } from "lucide-react";

export default function Deployment({ role = "admin" }) {
  const deployments = [
    {
      id: "DEP-101",
      site: "DAMAC Arjan",
      client: "DAMAC Properties",
      workers: 12,
      supervisor: "Ahmed Hassan",
      status: "On-Site",
      time: "07:00 AM",
    },
    {
      id: "DEP-102",
      site: "Emaar Beachfront",
      client: "Emaar Properties",
      workers: 25,
      supervisor: "Ramesh Kumar",
      status: "In Transit",
      time: "08:30 AM",
    },
    {
      id: "DEP-103",
      site: "Al Maktoum Airport",
      client: "DAEP",
      workers: 18,
      supervisor: "Sanjay Patel",
      status: "On-Site",
      time: "06:00 AM",
    },
    {
      id: "DEP-104",
      site: "Dubai Mall Expansion",
      client: "Emaar Properties",
      workers: 30,
      supervisor: "Mohammed Al Rashidi",
      status: "Completed",
      time: "04:00 PM",
    },
  ];

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Live Tracking
          </h2>
          <button className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg transition-all">
            <Truck size={16} /> New Deployment
          </button>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
              <Truck size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Active Transports
              </p>
              <h4 className="text-2xl font-bold text-slate-800">14 Vehicles</h4>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-l-4 border-amber-500 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Live Projects
              </p>
              <h4 className="text-2xl font-bold text-slate-800">8 Sites</h4>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-l-4 border-emerald-500 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Total Deployed
              </p>
              <h4 className="text-2xl font-bold text-slate-800">85 Workers</h4>
            </div>
          </div>
        </div>

        {/* Deployment Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
              Live Deployment Status
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button className="px-3 py-1 text-[10px] font-bold bg-white rounded shadow-sm text-brand-navy cursor-pointer">
                Today
              </button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                Weekly
              </button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Deployment ID</th>
                <th className="px-6 py-4">Site / Project</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Workers</th>
                <th className="px-6 py-4">Supervisor</th>
                <th className="px-6 py-4">Check-in</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {deployments.map((dep, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors group text-[12px]"
                >
                  <td className="px-6 py-4 font-bold text-brand-gold">
                    {dep.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-300" />
                      <span className="font-bold text-slate-700">
                        {dep.site}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-500">
                    {dep.client}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {dep.workers} Persons
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    {dep.supervisor}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={14} />
                      <span className="font-medium">{dep.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                        dep.status === "On-Site"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : dep.status === "In Transit"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}
                    >
                      {dep.status}
                    </span>
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
