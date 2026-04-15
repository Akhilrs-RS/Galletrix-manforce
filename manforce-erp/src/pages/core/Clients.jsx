import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Search, Plus, X, ChevronDown } from "lucide-react";

import api from "../../utils/api";

export default function Clients({ role }) {
  // --- 1. STATE MANAGEMENT ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/clients");
      setClientData(response.data);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const [newClient, setNewClient] = useState({
    name: "",
    contact: "",
    phone: "",
    type: "Construction",
    rate: "",
    till: "",
  });

  // --- 2. ACTIONS ---
  const handleSaveClient = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", {
        ...newClient,
        status: "Active",
        revenue: 0,
        workers: 0,
      });
      setShowAddModal(false);
      fetchClients();
      setNewClient({
        name: "",
        contact: "",
        phone: "",
        type: "Construction",
        rate: "",
        till: "",
      });
    } catch (err) {
      console.error("Failed to save client:", err);
      alert("Failed to save client.");
    }
  };

  // Find max workers for the progress bar calculation
  const maxWorkers = Math.max(...clientData.map((c) => c.workers));

  return (
    <DashboardLayout role={role}>
      <div className="space-y-8">
        {/* Search and Action Bar */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
          <div className="flex-1 flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 group focus-within:border-brand-gold transition-all">
            <Search
              size={16}
              className="text-slate-400 mr-3 group-focus-within:text-brand-gold"
            />
            <input
              type="text"
              placeholder="Search clients..."
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg cursor-pointer transition-all"
          >
            <Plus size={16} /> Add Client
          </button>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-center">Workers</th>
                <th className="px-6 py-4">Rate/Worker</th>
                <th className="px-6 py-4">Contract Till</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[11px]">
              {clientData.map((client, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">
                      {client.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{client.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {client.contact}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-500 font-medium">
                    {client.type}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">
                      {client.workers} workers
                    </span>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-700 uppercase">
                    AED {client.rate}
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-mono">
                    {client.till ? client.till.split("T")[0] : "N/A"}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold border ${client.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[10px] font-bold text-slate-400 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- ANALYTICS SECTION (Added from Screenshot) --- */}
        <div className="grid grid-cols-2 gap-8 pb-10">
          {/* Top Clients by Workers */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[13px] font-bold text-brand-navy mb-8 uppercase tracking-widest">
              Top Clients by Workers
            </h3>
            <div className="space-y-7">
              {clientData
                .sort((a, b) => b.workers - a.workers)
                .map((client, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="text-xs font-bold text-slate-700">
                        {client.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">
                        {client.workers} workers
                      </p>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-gold h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(client.workers / maxWorkers) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Revenue by Client */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-[13px] font-bold text-brand-navy mb-8 uppercase tracking-widest">
              Revenue by Client (AED)
            </h3>
            <div className="space-y-6 flex-1">
              {clientData.map((client, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0"
                >
                  <span className="text-xs font-medium text-slate-600">
                    {client.name}
                  </span>
                  <span className="text-xs font-bold text-brand-navy tracking-tight">
                    AED {client.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- ADD CLIENT MODAL --- */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">
                  Add New Client
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveClient} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                      Company Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Nakheel Properties"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all text-sm"
                      value={newClient.name}
                      onChange={(e) =>
                        setNewClient({ ...newClient, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                        Contact Person
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Mohammed Ahmed"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all text-sm"
                        value={newClient.contact}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            contact: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                        Phone
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="+971-4-XXX-XXXX"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all text-sm"
                        value={newClient.phone}
                        onChange={(e) =>
                          setNewClient({ ...newClient, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                        Industry
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all text-sm appearance-none cursor-pointer"
                          value={newClient.type}
                          onChange={(e) =>
                            setNewClient({
                              ...newClient,
                              type: e.target.value,
                            })
                          }
                        >
                          <option>Construction</option>
                          <option>Real Estate</option>
                          <option>Logistics</option>
                          <option>Retail</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                        Rate/Worker (AED)
                      </label>
                      <input
                        required
                        type="number"
                        placeholder="3200"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all text-sm"
                        value={newClient.rate}
                        onChange={(e) =>
                          setNewClient({ ...newClient, rate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                      Contract End
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold transition-all text-sm"
                      value={newClient.till}
                      onChange={(e) =>
                        setNewClient({ ...newClient, till: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
