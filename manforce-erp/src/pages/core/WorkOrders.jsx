import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import {
  Plus,
  Search,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Briefcase,
  Layers,
  AlertCircle,
  CheckCircle2,
  Clock,
  X,
  FileText,
} from "lucide-react";

// --- Internal Component: Reusable Modal ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-base font-black text-slate-800 tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function WorkOrders({ role }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clientsList, setClientsList] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    site_name: "",
    client_name: "",
    assigned_name: "",
    site_address: "",
    status: "Pending",
    start_date: "",
    est_budget: "",
    description: "",
  });

  const isSeeding = useRef(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/work-orders");

      if (res.data && res.data.length > 0) {
        setWorkOrders(res.data);
      } else if (!isSeeding.current) {
        isSeeding.current = true;
        // Seed initial beautiful mock work orders
        const mockWorkOrders = [
          {
            site_name: "Burj Khalifa Renovation",
            client_name: "Emaar Properties",
            assigned_name: "John Doe",
            site_address: "Downtown Dubai, UAE",
            status: "Active",
            start_date: "2026-05-01",
            est_budget: 250000,
            description: "Complete facade cleaning and reinforcement of levels 120-125.",
          },
          {
            site_name: "Marina Heights Tower C",
            client_name: "Dubai Properties Group",
            assigned_name: "Sarah Connor",
            site_address: "Dubai Marina, UAE",
            status: "Pending",
            start_date: "2026-06-15",
            est_budget: 180000,
            description: "HVAC system overhaul and fire safety compliance installation.",
          },
          {
            site_name: "Palm Jumeirah Villa 48",
            client_name: "Nakheel PJSC",
            assigned_name: "David Beckham",
            site_address: "Frond C, Palm Jumeirah, Dubai",
            status: "Completed",
            start_date: "2026-04-10",
            est_budget: 95000,
            description: "Premium smart home automation and electrical rewiring.",
          },
        ];

        for (const order of mockWorkOrders) {
          await api.post("/work-orders", order);
        }

        const freshRes = await api.get("/work-orders");
        setWorkOrders(freshRes.data);
      }
    } catch (err) {
      console.error("Failed to fetch work orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");
      setClientsList(res.data || []);
    } catch (err) {
      console.error("Failed to fetch clients list:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchClients();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        est_budget: parseFloat(formData.est_budget.toString().replace(/[^0-9.]/g, "")) || 0,
      };
      await api.post("/work-orders", payload);
      setIsModalOpen(false);
      setFormData({
        site_name: "",
        client_name: "",
        assigned_name: "",
        site_address: "",
        status: "Pending",
        start_date: "",
        est_budget: "",
        description: "",
      });
      fetchData();
    } catch (err) {
      console.error("Failed to save work order:", err);
    }
  };

  // Helper functions
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Pending":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <Layers size={12} className="text-amber-500" />;
      case "Completed":
        return <CheckCircle2 size={12} className="text-emerald-500" />;
      case "Pending":
        return <Clock size={12} className="text-blue-500" />;
      default:
        return <AlertCircle size={12} className="text-slate-500" />;
    }
  };

  const filteredOrders = workOrders.filter((order) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      order.site_name.toLowerCase().includes(query) ||
      order.client_name.toLowerCase().includes(query) ||
      order.assigned_name.toLowerCase().includes(query) ||
      order.site_address.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalBudget = filteredOrders.reduce((sum, order) => sum + parseFloat(order.est_budget || 0), 0);
  const activeCount = filteredOrders.filter((o) => o.status === "Active").length;
  const pendingCount = filteredOrders.filter((o) => o.status === "Pending").length;
  const completedCount = filteredOrders.filter((o) => o.status === "Completed").length;

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
      {/* Top Banner and Quick Add */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight text-left">
            Work Orders
          </h3>
          <p className="text-xs text-slate-400 font-medium text-left">
            Manage, schedule, and dispatch service tasks across Dubai sites.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto bg-brand-gold text-white text-[11px] font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-brand-gold/10 flex items-center gap-2 hover:brightness-105 transition-all cursor-pointer"
        >
          <Plus size={16} /> Create Work Order
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total Orders
            </p>
            <p className="text-xl font-black text-slate-700 mt-0.5">
              {filteredOrders.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Layers size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Active Status
            </p>
            <p className="text-xl font-black text-slate-700 mt-0.5">
              {activeCount}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Pending Setup
            </p>
            <p className="text-xl font-black text-slate-700 mt-0.5">
              {pendingCount}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Est Budget
            </p>
            <p className="text-xl font-black text-slate-700 mt-0.5">
              ₹{totalBudget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Site, Client, Assigned worker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
          />
        </div>
        <div className="flex gap-2 self-start md:self-auto overflow-x-auto">
          {["All", "Pending", "Active", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === status
                  ? "bg-brand-navy text-white shadow-md shadow-brand-navy/15"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Work Orders */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
          <span className="text-xs text-slate-400 font-bold mt-4">Loading Work Orders...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <AlertCircle size={32} className="text-slate-300" />
          <p className="text-sm font-bold text-slate-500 mt-4">No Work Orders Found</p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs text-center">
            We couldn't find any orders matching your criteria. Create a new one to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col text-left group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-sm font-black text-slate-800 leading-tight group-hover:text-brand-navy transition-colors">
                    {order.site_name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                    <Briefcase size={10} /> {order.client_name}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[9px] font-bold border flex items-center gap-1.5 shrink-0 ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-500 line-clamp-3 mb-4 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100/50 flex-1">
                {order.description || "No description provided."}
              </p>

              {/* Details List */}
              <div className="space-y-2 border-t border-slate-50 pt-4 mb-4 text-[10px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <User size={12} className="text-slate-400" />
                  <span>Assigned: <strong className="text-slate-700">{order.assigned_name}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="truncate">Address: <strong className="text-slate-700">{order.site_address}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-slate-400" />
                  <span>Start Date: <strong className="text-slate-700">{order.start_date ? new Date(order.start_date).toLocaleDateString() : "TBD"}</strong></span>
                </div>
              </div>

              {/* Footer / Value */}
              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Budget Allocation
                </span>
                <span className="text-sm font-black text-brand-navy">
                  ₹{parseFloat(order.est_budget || 0).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Work Order"
      >
        <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Site Name
              </label>
              <input
                required
                type="text"
                value={formData.site_name}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                placeholder="e.g. Burj Khalifa Renovation"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Client Name
              </label>
              <select
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm cursor-pointer"
              >
                <option value="">Select a Client...</option>
                {clientsList.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Assigned Staff/Worker
              </label>
              <input
                required
                type="text"
                value={formData.assigned_name}
                onChange={(e) => setFormData({ ...formData, assigned_name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Site Address
              </label>
              <input
                required
                type="text"
                value={formData.site_address}
                onChange={(e) => setFormData({ ...formData, site_address: e.target.value })}
                placeholder="e.g. Downtown Dubai, UAE"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Initial Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Start Date
              </label>
              <input
                required
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Est Budget (₹)
              </label>
              <input
                required
                type="text"
                value={formData.est_budget}
                onChange={(e) => setFormData({ ...formData, est_budget: e.target.value })}
                placeholder="Amount"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Description / Task Details
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a detailed description of the tasks to perform..."
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/10 hover:brightness-105 transition-all cursor-pointer text-center"
            >
              Save Work Order
            </button>
          </div>
        </form>
      </Modal>
      </div>
    </DashboardLayout>
  );
}
