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

export default function WorkerProfile() {
  return (
    <DashboardLayout role="worker">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Profile Card & General Info */}
        <div className="col-span-2 space-y-6">
          <div className="bg-brand-navy rounded-3xl p-8 text-center text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold text-2xl mb-4 border-4 border-white/10 shadow-xl">
                MA
              </div>
              <h3 className="text-xl font-bold">Mohammed Al Rashidi</h3>
              <p className="text-brand-gold text-xs font-medium mt-1">
                W001 · Electrician
              </p>
              <div className="mt-4 inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold border border-white/20">
                Deployed
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-2 gap-4">
            <InfoBox label="Worker ID" value="W001" />
            <InfoBox label="Category" value="Electrician" />
            <InfoBox label="Nationality" value="Pakistani" />
            <InfoBox label="Emirates ID" value="784-2020-1234567-1" />
            <InfoBox label="Current Client" value="Al Futtaim Group" />
            <InfoBox label="Site" value="Downtown Dubai" />
          </div>
        </div>

        {/* Right Column: Documents & Attendance */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                My Documents
              </h3>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Document</th>
                  <th className="px-6 py-4">Expiry</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">Visa</td>
                  <td className="px-6 py-4 font-mono text-slate-500">
                    2025-08-14
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] font-bold">
                      Valid
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-[12px] font-bold text-slate-700 uppercase tracking-widest mb-6">
              My Attendance — Today
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">
                  Check In
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">07:02</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">
                  Check Out
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">18:05</p>
              </div>
              <div className="bg-brand-navy/5 p-3 rounded-xl border border-brand-navy/10 text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">
                  OT Hours
                </p>
                <p className="text-sm font-bold text-brand-navy mt-1">
                  1.08 hrs
                </p>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[9px] font-bold">
              Present
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
