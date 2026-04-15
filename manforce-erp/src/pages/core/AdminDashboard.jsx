import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { ChevronRight, ShieldCheck, Calendar, Filter } from "lucide-react";

const StatCard = ({ title, value, subtext, trend, isLoss }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-brand-gold flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-all">
    <div>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
        {title}
      </p>
      <h4 className="text-xl font-bold text-slate-800 mt-1">{value}</h4>
    </div>
    <div className="flex items-center gap-1 mt-2">
      {trend && (
        <span
          className={`text-[10px] font-bold ${isLoss ? "text-red-500" : "text-emerald-500"}`}
        >
          {isLoss ? "↓" : "↑"} {trend}
        </span>
      )}
      <p className="text-[9px] text-slate-400 font-medium truncate">
        {subtext}
      </p>
    </div>
  </div>
);

import api from "../../utils/api";

export default function AdminDashboard({ role }) {
  const navigate = useNavigate();
  const [financialView, setFinancialView] = useState("Revenue");
  const [stats, setStats] = useState({
    totalWorkers: 0,
    deployedWorkers: 0,
    activeClients: 0,
    monthlyRevenue: 0,
  });
  const [recentWorkers, setRecentWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const financialData = {
    Revenue: [
      { month: "Jan", val: 78 },
      { month: "Feb", val: 82 },
      { month: "Mar", val: 91 },
      { month: "Apr", val: 88 },
      { month: "May", val: 95 },
      { month: "Jun", val: 103 },
    ],
    Profit: [
      { month: "Jan", val: 32 },
      { month: "Feb", val: 35 },
      { month: "Mar", val: 40 },
      { month: "Apr", val: 38 },
      { month: "May", val: 45 },
      { month: "Jun", val: 52 },
    ],
    Expenses: [
      { month: "Jan", val: 46 },
      { month: "Feb", val: 47 },
      { month: "Mar", val: 51 },
      { month: "Apr", val: 50 },
      { month: "May", val: 50 },
      { month: "Jun", val: 51 },
    ],
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [workersRes, clientsRes] = await Promise.all([
          api.get("/workers"),
          api.get("/clients"),
        ]);

        const workers = workersRes.data;
        const clients = clientsRes.data;

        setStats({
          totalWorkers: workers.length,
          deployedWorkers: workers.filter((w) => w.status === "Deployed")
            .length,
          activeClients: clients.filter((c) => c.status === "Active").length,
          monthlyRevenue: clients.reduce(
            (acc, c) => acc + Number(c.revenue || 0),
            0,
          ),
        });

        setRecentWorkers(workers.slice(0, 5));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* STAT CARDS - Updated to grid-cols-6 to include Profit and Expenses */}
        <div className="grid grid-cols-6 gap-4">
          <StatCard
            title="Total Workers"
            value={stats.totalWorkers}
            subtext="Active in system"
          />
          <StatCard
            title="Deployed"
            value={stats.deployedWorkers}
            subtext={`Utilization: ${Math.round((stats.deployedWorkers / stats.totalWorkers) * 100) || 0}%`}
          />
          <StatCard
            title="Active Clients"
            value={stats.activeClients}
            subtext="Contracted"
          />
          <StatCard
            title="Monthly Revenue"
            value={`AED ${(stats.monthlyRevenue / 1000).toFixed(1)}K`}
            subtext="Gross income"
          />
          {/* NEW CARDS */}
          <StatCard
            title="Monthly Profit"
            value="AED 185K"
            subtext="Net Margin: 43%"
            trend="8.4%"
          />
          <StatCard
            title="Monthly Expenses"
            value="AED 242K"
            subtext="Operational costs"
            trend="2.1%"
            isLoss={true}
          />
        </div>

        {/* ALERT BANNERS */}
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-center justify-between text-[12px] shadow-sm">
            <div className="flex items-center gap-2 text-red-700">
              <ShieldCheck size={16} className="text-red-500" />
              <span className="font-bold">2 documents</span>
              <span className="text-red-600/80 font-medium">
                expiring or expired.
              </span>
              <button
                onClick={() => navigate("/documents")}
                className="text-red-700 font-bold hover:underline flex items-center gap-1 ml-1"
              >
                View <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex items-center justify-between text-[12px] shadow-sm">
            <div className="flex items-center gap-2 text-amber-700">
              <Calendar size={16} className="text-amber-500" />
              <span className="font-bold">3 leave requests</span>
              <span className="text-amber-600/80 font-medium">
                awaiting approval.
              </span>
              <button
                onClick={() => navigate("/leave-mgmt")}
                className="text-amber-700 font-bold hover:underline flex items-center gap-1 ml-1"
              >
                Review <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-7 rounded-2xl border border-slate-100 shadow-sm relative">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[13px] font-bold text-slate-700 uppercase tracking-widest">
                Financial Performance (Last 6 Months)
              </h3>
              <div className="relative">
                <select
                  value={financialView}
                  onChange={(e) => setFinancialView(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold py-1.5 pl-3 pr-8 rounded-lg outline-none cursor-pointer"
                >
                  <option value="Revenue">Revenue</option>
                  <option value="Profit">Profit</option>
                  <option value="Expenses">Expenses</option>
                </select>
                <Filter
                  size={12}
                  className="absolute right-2.5 top-2.5 text-brand-gold pointer-events-none"
                />
              </div>
            </div>

            <div className="flex items-end justify-between h-48 gap-4 px-2 border-b border-slate-100">
              {financialData[financialView].map((data, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-3 group h-full justify-end"
                >
                  <span className="text-[10px] font-bold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    AED {data.val}K
                  </span>
                  <div
                    className="w-full bg-brand-gold rounded-t-md relative transition-all duration-500 hover:brightness-110"
                    style={{ height: `${(data.val / 110) * 100}%` }}
                  ></div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-[13px] font-bold text-slate-700 mb-8 uppercase tracking-widest">
              Worker Status
            </h3>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-32 h-32">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-slate-100"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-brand-gold"
                    strokeWidth="3.5"
                    strokeDasharray="50, 100"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-emerald-500"
                    strokeWidth="3.5"
                    strokeDasharray="33, 100"
                    strokeDashoffset="-50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">50%</span>
                </div>
              </div>
              <div className="mt-8 w-full space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-gold"></div>{" "}
                    Deployed (3)
                  </span>
                  <span className="text-slate-800">50%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>{" "}
                    Available (2)
                  </span>
                  <span className="text-slate-800">33%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-800"></div>{" "}
                    On Leave (1)
                  </span>
                  <span className="text-slate-800">17%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT TABLES SECTION */}
        <div className="grid grid-cols-3 gap-6 pb-10">
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                Recent Workers
              </h3>
              <button
                onClick={() => navigate("/workers")}
                className="text-[10px] font-bold text-brand-gold uppercase border border-brand-gold/20 px-3 py-1 rounded hover:bg-brand-gold hover:text-white transition-all"
              >
                View all
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[11px]">
                {recentWorkers.map((w, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-[10px]">
                        {w.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{w.name}</p>
                        <p className="text-slate-400 text-[9px]">
                          {w.worker_id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500">
                      {w.category}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-bold ${w.status === "Deployed" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}
                      >
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-6">
              Recent Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              <div className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center border-4 border-white z-10"></div>
                <div>
                  <p className="text-xs text-slate-700 font-bold">
                    Ahmed Hassan deployed to DAMAC — Arjan
                  </p>
                  <p className="text-[10px] text-slate-400">Today, 09:14 AM</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center border-4 border-white z-10"></div>
                <div>
                  <p className="text-xs text-slate-700 font-bold">
                    INV-001 paid by Al Futtaim (AED 89,600)
                  </p>
                  <p className="text-[10px] text-slate-400">Today, 08:30 AM</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center border-4 border-white z-10"></div>
                <div>
                  <p className="text-xs text-slate-700 font-bold">
                    Leave request from Bibek Thapa — Emergency
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Yesterday, 06:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
