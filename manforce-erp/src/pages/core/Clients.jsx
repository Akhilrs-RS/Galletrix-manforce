import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Search,
  Plus,
  X,
  ChevronDown,
  FileText,
  Receipt,
  ClipboardList,
  Building,
  Phone,
  User,
  Calendar,
  DollarSign,
  MapPin,
  Activity,
  CheckCircle2,
} from "lucide-react";

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
  });

  // --- 2. ACTIONS ---
  const handleSaveClient = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", {
        ...newClient,
        rate: 0,
        till: null,
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
      });
    } catch (err) {
      console.error("Failed to save client:", err);
      alert("Failed to save client.");
    }
  };

  // Find max workers for the progress bar calculation (safely)
  const maxWorkers = clientData.length > 0 ? Math.max(...clientData.map((c) => c.workers || 0)) : 1;

  const [selectedClient, setSelectedClient] = useState(null);
  const [activeProfileTab, setActiveProfileTab] = useState("Overview");
  const [profileInvoices, setProfileInvoices] = useState([]);
  const [profileWorkOrders, setProfileWorkOrders] = useState([]);
  const [loadingProfileData, setLoadingProfileData] = useState(false);

  useEffect(() => {
    if (!selectedClient) {
      setProfileInvoices([]);
      setProfileWorkOrders([]);
      setActiveProfileTab("Overview");
      return;
    }

    const fetchProfileData = async () => {
      try {
        setLoadingProfileData(true);
        const [invRes, woRes] = await Promise.all([
          api.get("/invoices"),
          api.get("/work-orders"),
        ]);

        if (invRes.data) {
          const filteredInvs = invRes.data.filter(
            (inv) => inv.client_id === selectedClient.id
          );
          setProfileInvoices(filteredInvs);
        }

        if (woRes.data) {
          const filteredWos = woRes.data.filter(
            (wo) =>
              wo.client_name &&
              wo.client_name.toLowerCase() === selectedClient.name.toLowerCase()
          );
          setProfileWorkOrders(filteredWos);
        }
      } catch (err) {
        console.error("Failed to fetch client profile details:", err);
      } finally {
        setLoadingProfileData(false);
      }
    };

    fetchProfileData();
  }, [selectedClient]);

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
                    <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold shrink-0">
                      {client.name[0]}
                    </div>
                    <div className="text-left">
                      <p 
                        onClick={() => setSelectedClient(client)}
                        className="font-bold text-slate-800 hover:text-brand-gold hover:underline cursor-pointer transition-colors"
                      >
                        {client.name}
                      </p>
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
                    <button
                      onClick={() => setSelectedClient(client)}
                      className="text-[10px] font-bold text-slate-400 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition-all cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- CLIENT PROFILE DETAIL MODAL --- */}
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 animate-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight text-left">
                    {selectedClient.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-left mt-0.5">
                    {selectedClient.type} • {selectedClient.status}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs Section */}
              <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar flex flex-col">
                <div className="flex gap-2 border-b border-slate-100 pb-3 mb-6 overflow-x-auto">
                  {["Overview", "Invoices", "Receipts", "Work History"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveProfileTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeProfileTab === tab
                          ? "bg-brand-navy text-white shadow-md shadow-brand-navy/15"
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Contents */}
                {activeProfileTab === "Overview" && (
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <User size={14} className="text-brand-gold" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Contact Person</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedClient.contact || "N/A"}</p>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone size={14} className="text-brand-gold" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Phone Number</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedClient.phone || "N/A"}</p>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Building size={14} className="text-brand-gold" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Industry Sector</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedClient.type || "N/A"}</p>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Activity size={14} className="text-brand-gold" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Active Workers</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedClient.workers || 0} deployed</p>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <DollarSign size={14} className="text-brand-gold" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Rate per Worker</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">AED {parseFloat(selectedClient.rate || 0).toLocaleString()}</p>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={14} className="text-brand-gold" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Contract Expiration</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">
                        {selectedClient.till ? new Date(selectedClient.till).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                )}

                {activeProfileTab === "Invoices" && (
                  <div className="space-y-4 text-left max-h-[350px] overflow-y-auto custom-scrollbar">
                    {loadingProfileData ? (
                      <p className="text-xs text-slate-400 text-center py-8">Loading invoice history...</p>
                    ) : profileInvoices.length === 0 ? (
                      <div className="text-center py-10 space-y-2 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                        <FileText size={24} className="text-slate-300 mx-auto" />
                        <p className="text-xs font-bold text-slate-500">No Invoices Found</p>
                      </div>
                    ) : (
                      <div className="overflow-hidden border border-slate-100 rounded-2xl shadow-sm">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 text-[9px] uppercase font-bold text-slate-400 border-b border-slate-100">
                            <tr>
                              <th className="px-4 py-3">Inv Number</th>
                              <th className="px-4 py-3">Amount</th>
                              <th className="px-4 py-3">Due Date</th>
                              <th className="px-4 py-3 text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 text-[10px]">
                            {profileInvoices.map((inv) => (
                              <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3 font-bold text-slate-700">{inv.invoice_number}</td>
                                <td className="px-4 py-3 font-bold text-slate-800">AED {parseFloat(inv.amount || 0).toLocaleString()}</td>
                                <td className="px-4 py-3 text-slate-500 font-mono">
                                  {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "N/A"}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                                      inv.status === "Paid"
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                        : inv.status === "Pending"
                                        ? "bg-blue-50 text-blue-600 border-blue-100"
                                        : "bg-red-50 text-red-600 border-red-100"
                                    }`}
                                  >
                                    {inv.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeProfileTab === "Receipts" && (
                  <div className="space-y-4 text-left max-h-[350px] overflow-y-auto custom-scrollbar">
                    {loadingProfileData ? (
                      <p className="text-xs text-slate-400 text-center py-8">Loading receipts...</p>
                    ) : profileInvoices.filter((i) => i.status === "Paid").length === 0 ? (
                      <div className="text-center py-10 space-y-2 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                        <Receipt size={24} className="text-slate-300 mx-auto" />
                        <p className="text-xs font-bold text-slate-500">No Receipts Found</p>
                        <p className="text-[10px] text-slate-400">Payment completions will generate receipts here.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {profileInvoices
                          .filter((inv) => inv.status === "Paid")
                          .map((receipt) => (
                            <div
                              key={receipt.id}
                              className="bg-emerald-50/20 p-4 rounded-2xl border border-emerald-100/50 flex items-center justify-between group hover:border-emerald-200 transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                                  <CheckCircle2 size={16} />
                                </div>
                                <div className="text-left">
                                  <p className="text-[11px] font-black text-slate-700">Receipt #{receipt.invoice_number}</p>
                                  <p className="text-[9px] text-slate-400 font-medium">
                                    Cleared: {receipt.issued_date ? new Date(receipt.issued_date).toLocaleDateString() : "N/A"}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black text-emerald-600">AED {parseFloat(receipt.amount || 0).toLocaleString()}</p>
                                <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-wide">Paid & Confirmed</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {activeProfileTab === "Work History" && (
                  <div className="space-y-4 text-left max-h-[350px] overflow-y-auto custom-scrollbar">
                    {loadingProfileData ? (
                      <p className="text-xs text-slate-400 text-center py-8">Loading work history...</p>
                    ) : profileWorkOrders.length === 0 ? (
                      <div className="text-center py-10 space-y-2 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                        <ClipboardList size={24} className="text-slate-300 mx-auto" />
                        <p className="text-xs font-bold text-slate-500">No Work History Found</p>
                        <p className="text-[10px] text-slate-400">There are no work orders assigned to this client.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {profileWorkOrders.map((wo) => (
                          <div
                            key={wo.id}
                            className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-sm transition-all text-left flex flex-col gap-2"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-[11px] font-black text-slate-800 leading-tight">{wo.site_name}</h5>
                                <p className="text-[9px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                                  <MapPin size={9} /> {wo.site_address}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[8px] font-bold border flex items-center gap-1 shrink-0 ${
                                  wo.status === "Completed"
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                    : wo.status === "Active"
                                    ? "bg-amber-50 text-amber-600 border-amber-100"
                                    : "bg-blue-50 text-blue-600 border-blue-100"
                                }`}
                              >
                                {wo.status}
                              </span>
                            </div>
                            
                            <p className="text-[10px] text-slate-500 leading-normal bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                              {wo.description || "No description provided."}
                            </p>

                            <div className="flex justify-between items-center text-[9px] text-slate-400 border-t border-slate-50 pt-2 font-medium">
                              <span>Assigned: <strong className="text-slate-600">{wo.assigned_name}</strong></span>
                              <span className="text-slate-700 font-black">Budget: ₹{parseFloat(wo.est_budget || 0).toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
