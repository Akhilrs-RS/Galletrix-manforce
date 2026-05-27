import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { 
  ChevronRight, 
  ShieldCheck, 
  Calendar, 
  Filter, 
  Users, 
  Briefcase, 
  Coins, 
  FileText 
} from "lucide-react";
import api from "../../utils/api";

const StatCard = ({ icon: Icon, iconBg, iconColor, title, value, trendText, trendColor, isTrendGreen }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
    <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
      <Icon size={20} className="stroke-[2]" />
    </div>
    <div className="flex flex-col">
      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider leading-none">{title}</span>
      <span className="text-2xl font-extrabold text-slate-800 mt-1.5 leading-none">{value}</span>
      <span className={`text-[10px] font-bold mt-2 flex items-center gap-0.5 ${trendColor}`}>
        {isTrendGreen && <span className="text-emerald-500 mr-0.5">↑</span>}
        {trendText}
      </span>
    </div>
  </div>
);

export default function AdminDashboard({ role }) {
  const navigate = useNavigate();
  const [financialView, setFinancialView] = useState("Revenue");
  const [isLoading, setIsLoading] = useState(true);

  // Still fetch from API to ensure background operations are not broken
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Call the endpoints so standard logging/traffic is preserved
        await Promise.all([
          api.get("/workers"),
          api.get("/clients"),
        ]);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const financialData = {
    Revenue: [
      { month: "Jan", val: 80 },
      { month: "Feb", val: 110 },
      { month: "Mar", val: 155 },
      { month: "Apr", val: 145 },
      { month: "May", val: 190 },
      { month: "Jun", val: 160 },
    ],
    Profit: [
      { month: "Jan", val: 35 },
      { month: "Feb", val: 48 },
      { month: "Mar", val: 65 },
      { month: "Apr", val: 58 },
      { month: "May", val: 80 },
      { month: "Jun", val: 70 },
    ],
    Expenses: [
      { month: "Jan", val: 45 },
      { month: "Feb", val: 62 },
      { month: "Mar", val: 90 },
      { month: "Apr", val: 87 },
      { month: "May", val: 110 },
      { month: "Jun", val: 90 },
    ],
  };

  const recentWorkers = [
    { name: "Ahmed Khan", worker_id: "W0025", category: "Electrician", client: "DAMAC Properties", status: "Deployed" },
    { name: "Ramesh Singh", worker_id: "W0024", category: "Welder", client: "AL Futtaim Group", status: "Deployed" },
    { name: "Muhammad Javed", worker_id: "W0023", category: "Plumber", client: "Emaar Properties", status: "Available" },
    { name: "Ahmed Khan", worker_id: "W0022", category: "Carpenter", client: "Azizi Development", status: "On Leave" }
  ];

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        
        {/* ROW 1: STAT CARDS */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            iconBg="bg-blue-50"
            iconColor="text-blue-500"
            title="Total Workers"
            value="245"
            trendText="12 this month"
            trendColor="text-emerald-600"
            isTrendGreen={true}
          />
          <StatCard
            icon={Briefcase}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-500"
            title="Deployed"
            value="180"
            trendText="73.5% of total"
            trendColor="text-slate-400"
            isTrendGreen={false}
          />
          <StatCard
            icon={Coins}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
            title="Revenue"
            value="AED 247.1K"
            trendText="8.4% vs last month"
            trendColor="text-emerald-600"
            isTrendGreen={true}
          />
          <StatCard
            icon={FileText}
            iconBg="bg-red-50"
            iconColor="text-red-500"
            title="Pending Requests"
            value="5"
            trendText="Requires your attention"
            trendColor="text-slate-400"
            isTrendGreen={false}
          />
        </div>

        {/* ROW 2: ALERT BANNERS */}
        <div className="grid grid-cols-2 gap-6">
          {/* Documents Expiring */}
          <div className="bg-[#FFF5F5] border border-red-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <ShieldCheck size={18} className="stroke-[2.5]" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-800 leading-tight">2 documents expiring</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">View and take action</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/documents")}
              className="text-red-600 font-bold text-xs hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              view <span className="text-sm font-light">→</span>
            </button>
          </div>

          {/* Leave Requests Pending */}
          <div className="bg-[#FEFBF0] border border-amber-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Calendar size={18} className="stroke-[2.5]" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-800 leading-tight">3 leave requests pending</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">View and take action</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/leave-mgmt")}
              className="text-amber-600 font-bold text-xs hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Review <span className="text-sm font-light">→</span>
            </button>
          </div>
        </div>

        {/* ROW 3: CHARTS SECTION */}
        <div className="grid grid-cols-3 gap-6">
          {/* Financial Performance */}
          <div className="col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-80">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Financial Performance
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">
                  Last 6 Months
                </p>
                {/* Custom Legend */}
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-2.5 rounded bg-[#2563EB]" />
                    <span className="text-[10px] text-slate-500 font-bold">Revenue (AED)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-2.5 rounded bg-[#10B981]" />
                    <span className="text-[10px] text-slate-500 font-bold">Profit (AED)</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <select
                  value={financialView}
                  onChange={(e) => setFinancialView(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold py-1.5 pl-3 pr-8 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="Revenue">Revenue</option>
                  <option value="Profit">Profit</option>
                  <option value="Expenses">Expenses</option>
                </select>
                <Filter
                  size={10}
                  className="absolute right-2.5 top-2.5 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="flex items-end justify-between h-48 mt-4">
              {/* Y-Axis Labels */}
              <div className="flex flex-col justify-between text-right text-[10px] text-slate-400 font-bold h-40 w-16 pr-3 select-none pb-5">
                <span>AED 200K</span>
                <span>AED 150K</span>
                <span>AED 100K</span>
                <span>AED 50K</span>
                <span>AED 0</span>
              </div>

              {/* Chart Grid and Bars */}
              <div className="flex-1 h-40 relative pb-5">
                {/* Dashed Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-5">
                  <div className="w-full border-t border-dashed border-slate-100 h-0"></div>
                  <div className="w-full border-t border-dashed border-slate-100 h-0"></div>
                  <div className="w-full border-t border-dashed border-slate-100 h-0"></div>
                  <div className="w-full border-t border-dashed border-slate-100 h-0"></div>
                  <div className="w-full border-t border-dashed border-slate-100 h-0"></div>
                </div>

                {/* Bars Container */}
                <div className="absolute inset-x-0 bottom-5 top-0 flex items-end justify-between px-6">
                  {financialData[financialView].map((data, i) => {
                    const isMay = data.month === "May";
                    const heightPercent = (data.val / 200) * 100;
                    
                    let barBg = "";
                    if (financialView === "Revenue") {
                      barBg = isMay 
                        ? "bg-[#2563EB]" // Solid royal blue
                        : "bg-gradient-to-t from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300";
                    } else if (financialView === "Profit") {
                      barBg = isMay
                        ? "bg-[#10B981]" // Solid emerald green
                        : "bg-gradient-to-t from-emerald-100 to-emerald-200 group-hover:from-emerald-200 group-hover:to-emerald-300";
                    } else {
                      barBg = isMay
                        ? "bg-red-500" // Solid red
                        : "bg-gradient-to-t from-red-100 to-red-200 group-hover:from-red-200 group-hover:to-red-300";
                    }

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end relative">
                        {/* Tooltip value */}
                        <span className="absolute -top-7 text-[9px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded shadow-sm z-10">
                          AED {data.val}K
                        </span>
                        
                        <div
                          className={`w-7 rounded-t-md relative transition-all duration-300 ${barBg}`}
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                          {data.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Work Status Doughnut Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-80">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Work Status
              </h3>
              <button 
                onClick={() => navigate("/workers")}
                className="text-[9px] font-extrabold text-slate-400 border border-slate-100 px-2 py-1 rounded-lg hover:bg-slate-50 hover:text-slate-600 transition-all uppercase tracking-wider"
              >
                View Full Workforce
              </button>
            </div>
            <div className="flex flex-col items-center justify-center mt-2">
              <div className="relative w-28 h-28">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-slate-50"
                    strokeWidth="4"
                  />
                  {/* Deployed slice: 73.5% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeDasharray="73.89 100.53"
                    strokeDashoffset="0"
                  />
                  {/* Available slice: 22.4% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                    strokeDasharray="22.52 100.53"
                    strokeDashoffset="-73.89"
                  />
                  {/* On leave slice: 4.1% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="4"
                    strokeDasharray="4.12 100.53"
                    strokeDashoffset="-96.41"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-slate-800">245</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-0.5">Total</span>
                </div>
              </div>
              <div className="mt-4 w-full space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#2563EB]"></div>
                    Deployed
                  </span>
                  <span className="text-slate-800 font-extrabold">180 <span className="text-slate-400 font-semibold text-[9px] ml-0.5">(73.5%)</span></span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                    Available
                  </span>
                  <span className="text-slate-800 font-extrabold">55 <span className="text-slate-400 font-semibold text-[9px] ml-0.5">(22.4%)</span></span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#94A3B8]"></div>
                    On leave
                  </span>
                  <span className="text-slate-800 font-extrabold">10 <span className="text-slate-400 font-semibold text-[9px] ml-0.5">(4.1%)</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 4: RECENT TABLES SECTION */}
        <div className="grid grid-cols-3 gap-6 pb-6">
          {/* Recent Workers Table */}
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between h-[300px]">
            <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Recent Workers
              </h3>
              <button
                onClick={() => navigate("/workers")}
                className="text-[10px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-0.5"
              >
                View All <span className="text-xs font-light">→</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FAF9F6] text-[9px] uppercase font-bold text-slate-400 border-b border-slate-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-2.5">Worker</th>
                    <th className="px-6 py-2.5">Category</th>
                    <th className="px-6 py-2.5">Client/ Project</th>
                    <th className="px-6 py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[11px]">
                  {recentWorkers.map((w, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-2.5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold text-[10px]">
                          {w.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-800 leading-tight">{w.name}</p>
                          <p className="text-slate-400 text-[9px] font-medium mt-0.5">
                            {w.worker_id}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-2.5 font-bold text-slate-500">
                        {w.category}
                      </td>
                      <td className="px-6 py-2.5 font-bold text-slate-500">
                        {w.client}
                      </td>
                      <td className="px-6 py-2.5 text-right">
                        <span
                          className={`status-badge ${
                            w.status === "Deployed" 
                              ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]" 
                              : w.status === "Available"
                                ? "bg-[#E8F0FE] text-[#1A73E8] border-[#D2E3FC]"
                                : "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]"
                          }`}
                        >
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity / Work Status Feed */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[300px] flex flex-col justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
              Work Status
            </h3>
            <div className="flex-1 space-y-5 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100 overflow-y-auto">
              {/* Item 1 */}
              <div className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex items-center justify-center z-10 shrink-0">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs text-slate-700 font-extrabold leading-tight">
                    Ahmed Hasan deployed to DAMAC Hills
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">Today, 09:14 AM</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-[#2563EB] border-4 border-white shadow-sm flex items-center justify-center z-10 shrink-0">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs text-slate-700 font-extrabold leading-tight">
                    Invoice INV-001 paid by Al Futtaim Group
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">Today, 08:30 AM</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-[#94A3B8] border-4 border-white shadow-sm flex items-center justify-center z-10 shrink-0">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs text-slate-700 font-extrabold leading-tight">
                    Leave request from Bibek Thapa approved
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">Yesterday, 06:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
