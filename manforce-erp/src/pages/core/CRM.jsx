import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  Phone,
  Mail,
  MoreVertical,
  User,
  X,
  ChevronDown,
  GripVertical,
} from "lucide-react";

// --- Internal Component: Reusable Modal Window ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

// --- Sortable Wrapper Component (Preserves Design) ---
const SortableItem = ({ id, children, isTable = false }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 99 : "auto",
  };

  if (isTable) {
    return (
      <tr
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="hover:bg-slate-50 transition-colors cursor-grab active:cursor-grabbing"
      >
        {children}
      </tr>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-2 top-4 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-slate-300 transition-opacity z-10"
      >
        <GripVertical size={16} />
      </div>
      {children}
    </div>
  );
};

export default function CRM({ role = "admin" }) {
  const [activeTab, setActiveTab] = useState("deals");

  // Modal States
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isDealModalOpen, setDealModalOpen] = useState(false);
  const [isActivityModalOpen, setActivityModalOpen] = useState(false);

  // Drag Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // --- STATEFUL DATA (Required for rearranging) ---
  const [contacts, setContacts] = useState([
    {
      id: "c1",
      name: "John Smith",
      company: "Tech Corp",
      email: "john@company.com",
      phone: "+91 98765 43210",
      lastContact: "2025-11-10",
      status: "active",
    },
    {
      id: "c2",
      name: "Sarah Johnson",
      company: "StartUp Inc",
      email: "sarah@startup.io",
      phone: "+91 98765 43211",
      lastContact: "2025-11-09",
      status: "lead",
    },
    {
      id: "c3",
      name: "Mike Wilson",
      company: "Enterprise Ltd",
      email: "mike@enterprise.com",
      phone: "+91 98765 43212",
      lastContact: "2025-11-08",
      status: "prospect",
    },
  ]);

  const [deals, setDeals] = useState([
    {
      id: "d1",
      title: "Annual Maintenance",
      client: "Enterprise Ltd",
      value: "₹45,000",
      stage: "CONTACTED",
    },
    {
      id: "d2",
      title: "Hardware Package",
      client: "StartUp Inc",
      value: "₹85,000",
      stage: "PROPOSAL",
    },
    {
      id: "d3",
      title: "Enterprise Software License",
      client: "Tech Corp",
      value: "₹150,000",
      stage: "NEGOTIATION",
    },
  ]);

  const [activities, setActivities] = useState([
    {
      id: "a1",
      task: "Follow-up call",
      contact: "John Smith",
      date: "2025-11-12",
      priority: "high",
      status: "pending",
    },
    {
      id: "a2",
      task: "Product demo",
      contact: "Sarah Johnson",
      date: "2025-11-13",
      priority: "medium",
      status: "pending",
    },
    {
      id: "a3",
      task: "Proposal sent",
      contact: "Mike Wilson",
      date: "2025-11-11",
      priority: "low",
      status: "completed",
    },
  ]);

  const pipelineStages = [
    "LEAD",
    "CONTACTED",
    "PROPOSAL",
    "NEGOTIATION",
    "WON",
    "LOST",
  ];

  const handleDragEnd = (event, setter) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setter((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleFormSubmit = (e, closeModal) => {
    e.preventDefault();
    alert("New entry saved successfully!");
    closeModal(false);
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* --- NAVIGATION TABS --- */}
        <div className="flex gap-8 border-b border-slate-200 px-4">
          {["contacts", "deals", "activities"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === tab ? "text-brand-gold border-b-2 border-brand-gold" : "text-slate-400 hover:text-slate-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => {
            if (activeTab === "contacts") handleDragEnd(e, setContacts);
            if (activeTab === "deals") handleDragEnd(e, setDeals);
            if (activeTab === "activities") handleDragEnd(e, setActivities);
          }}
        >
          {/* --- SECTION: CONTACTS --- */}
          {activeTab === "contacts" && (
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center px-8 bg-slate-50/30">
                <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest">
                  Contacts List
                </h3>
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="bg-brand-gold text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={14} /> Add Contact
                </button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-12 py-4">Contact</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Email / Phone</th>
                    <th className="px-6 py-4">Last Contact</th>
                    <th className="px-8 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[12px]">
                  <SortableContext
                    items={contacts.map((c) => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {contacts.map((c) => (
                      <SortableItem key={c.id} id={c.id} isTable={true}>
                        <td className="px-12 py-5 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white text-[10px] font-bold">
                            {c.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-bold text-slate-700">
                            {c.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-500 font-medium">
                          {c.company}
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-slate-600">{c.email}</p>
                          <p className="text-[10px] text-slate-400">
                            {c.phone}
                          </p>
                        </td>
                        <td className="px-6 py-5 text-slate-400 font-mono">
                          {c.lastContact}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${c.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}
                          >
                            {c.status}
                          </span>
                        </td>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </tbody>
              </table>
            </div>
          )}

          {/* --- SECTION: DEALS PIPELINE --- */}
          {activeTab === "deals" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  Deals Pipeline
                </h3>
                <button
                  onClick={() => setDealModalOpen(true)}
                  className="bg-brand-gold text-white text-[11px] font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 hover:brightness-105 transition-all cursor-pointer"
                >
                  <Plus size={16} /> Add Deal
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar min-h-[500px]">
                {pipelineStages.map((stage) => (
                  <div
                    key={stage}
                    className="min-w-[280px] bg-slate-50/50 p-4 rounded-[1.5rem] border border-slate-100 flex flex-col gap-4"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-2">
                      {stage}
                    </p>
                    <div className="space-y-3">
                      <SortableContext
                        items={deals
                          .filter((d) => d.stage === stage)
                          .map((d) => d.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {deals
                          .filter((d) => d.stage === stage)
                          .map((deal) => (
                            <SortableItem key={deal.id} id={deal.id}>
                              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">
                                  {deal.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 font-medium mb-3">
                                  {deal.client}
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                  <span className="text-brand-navy font-black text-sm">
                                    {deal.value}
                                  </span>
                                  <select className="bg-slate-50 text-[10px] font-bold text-slate-500 py-1 px-2 rounded-lg border-none outline-none cursor-pointer">
                                    {pipelineStages.map((s) => (
                                      <option key={s} selected={s === stage}>
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </SortableItem>
                          ))}
                      </SortableContext>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- SECTION: ACTIVITIES --- */}
          {activeTab === "activities" && (
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center px-8 bg-slate-50/30">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  Activities & Tasks
                </h3>
                <button
                  onClick={() => setActivityModalOpen(true)}
                  className="bg-brand-gold text-white text-[11px] font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={16} /> Add Activity
                </button>
              </div>
              <div className="p-8 space-y-6">
                <SortableContext
                  items={activities.map((a) => a.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {activities.map((act) => (
                    <SortableItem key={act.id} id={act.id}>
                      <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-5">
                          <div
                            className={`p-3 rounded-xl ${act.status === "completed" ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"}`}
                          >
                            {act.task.includes("call") ? (
                              <Phone size={18} />
                            ) : act.task.includes("demo") ? (
                              <User size={18} />
                            ) : (
                              <Mail size={18} />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800">
                              {act.task}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium">
                              {act.contact} •{" "}
                              <span className="font-mono">{act.date}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-widest ${act.priority === "high" ? "text-red-500" : act.priority === "medium" ? "text-amber-500" : "text-slate-400"}`}
                          >
                            {act.priority}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${act.status === "completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                          >
                            {act.status}
                          </span>
                          <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </div>
            </div>
          )}
        </DndContext>

        {/* --- MODALS (Unchanged design/logic) --- */}
        <Modal
          isOpen={isContactModalOpen}
          onClose={() => setContactModalOpen(false)}
          title="Add New Contact"
        >
          <form
            onSubmit={(e) => handleFormSubmit(e, setContactModalOpen)}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Contact Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. John Smith"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Company
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Tech Corp"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="john@company.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Phone
                </label>
                <input
                  required
                  type="text"
                  placeholder="+91..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-50">
              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-105 transition-all cursor-pointer"
              >
                Save Contact
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={isDealModalOpen}
          onClose={() => setDealModalOpen(false)}
          title="Add New Deal"
        >
          <form
            onSubmit={(e) => handleFormSubmit(e, setDealModalOpen)}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Deal Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Annual Maintenance"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Client Company
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                    <option>Tech Corp</option>
                    <option>StartUp Inc</option>
                    <option>Enterprise Ltd</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Deal Value
                </label>
                <input
                  required
                  type="text"
                  placeholder="₹ Amount"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Pipeline Stage
              </label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                  {pipelineStages.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-50">
              <button
                type="button"
                onClick={() => setDealModalOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-105 transition-all cursor-pointer"
              >
                Save Deal
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={isActivityModalOpen}
          onClose={() => setActivityModalOpen(false)}
          title="Add Activity Task"
        >
          <form
            onSubmit={(e) => handleFormSubmit(e, setActivityModalOpen)}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Activity Type
              </label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                  <option>Follow-up call</option>
                  <option>Product demo</option>
                  <option>Proposal sent</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Assign Contact
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                    {contacts.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Due Date
                </label>
                <input
                  required
                  type="date"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Priority
              </label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-50">
              <button
                type="button"
                onClick={() => setActivityModalOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-105 transition-all cursor-pointer"
              >
                Add Activity
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
