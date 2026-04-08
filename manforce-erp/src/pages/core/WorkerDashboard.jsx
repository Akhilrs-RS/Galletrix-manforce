import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

const InfoBox = ({ label, value }) => (
  <div className="bg-[#FAF9F6] p-4 rounded-xl border border-slate-100">
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-sm font-bold text-slate-800">{value}</p>
  </div>
);

export default function WorkerDashboard() {
  return (
    <DashboardLayout role="worker">
      <div className="space-y-8">
        {/* TOP STATS */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              My Status
            </p>
            <div>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">
                Deployed
              </span>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Downtown Dubai
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Leave Remaining
            </p>
            <div>
              <h4 className="text-3xl font-bold text-emerald-600">24</h4>
              <p className="text-[10px] text-slate-400 font-medium">
                of 30 days
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Today's Attendance
            </p>
            <div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded">
                Present
              </span>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                In: 07:02
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-5 gap-8">
          {/* My Information */}
          <div className="col-span-3 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-brand-navy mb-8">
              My Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoBox label="Worker ID" value="W001" />
              <InfoBox label="Category" value="Electrician" />
              <InfoBox label="Nationality" value="Pakistani" />
              <InfoBox label="Current Site" value="Downtown Dubai" />
              <InfoBox label="Visa Expiry" value="2025-08-14" />
              <InfoBox label="Client" value="Al Futtaim Group" />
            </div>
          </div>

          {/* My Leave Requests */}
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                My Leave Requests
              </h3>
              <button className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-sm">
                + Apply
              </button>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold">
                      Annual
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    2025-04-10 → 2025-04-15
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-bold">
                      Approved
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
