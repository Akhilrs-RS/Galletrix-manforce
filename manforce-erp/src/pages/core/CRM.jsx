import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
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
  MapPin,
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  );
};

const DroppableColumn = ({ stage, children }) => {
  const { setNodeRef } = useDroppable({
    id: stage,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-50/50 p-4 rounded-[1.5rem] border border-slate-100 flex flex-col gap-4 flex-1 min-w-[150px] min-h-[250px]"
    >
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-2 text-left">
        {stage}
      </p>
      <div className="space-y-3 flex-1 flex flex-col justify-start">
        {children}
      </div>
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

  // --- 2. EFFECTS ---
  useEffect(() => {
    fetchData();
  }, []);

  const isSeeding = React.useRef(false);

  const fetchData = async () => {
    try {
      const [cRes, dRes, aRes] = await Promise.all([
        api.get("/crm/contacts"),
        api.get("/crm/deals"),
        api.get("/crm/activities"),
      ]);
      
      if (cRes.data && cRes.data.length > 0) setContacts(cRes.data);
      if (aRes.data && aRes.data.length > 0) setActivities(aRes.data);

      if (dRes.data && dRes.data.length > 0) {
        setDeals(dRes.data.map(d => ({
          ...d,
          id: d.id.toString(),
          client: d.client || "Enterprise Ltd",
          address: d.address || "",
          value: typeof d.value === "string" && d.value.includes("₹") ? d.value : `₹${parseInt(d.value || 0).toLocaleString()}`
        })));
      } else if (!isSeeding.current) {
        isSeeding.current = true;
        // Seed initial mock deals so they can be permanently dragged and saved
        const initialDeals = [
          { title: "Annual Maintenance", value: 45000, stage: "CONTACTED", address: "123 Business Bay, Dubai" },
          { title: "Hardware Package", value: 85000, stage: "PROPOSAL", address: "Downtown Suite 404, Dubai" },
          { title: "Enterprise Software License", value: 150000, stage: "NEGOTIATION", address: "Marina Heights Tower, Dubai" },
        ];
        for (let deal of initialDeals) {
          await api.post("/crm/deals", deal);
        }
        const newDRes = await api.get("/crm/deals");
        setDeals(newDRes.data.map(d => ({
          ...d,
          id: d.id.toString(),
          client: "Enterprise Ltd",
          address: d.address || "",
          value: `₹${parseInt(d.value || 0).toLocaleString()}`
        })));
      }
    } catch (err) {
      console.error("CRM fetch error:", err);
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (activeTab === "deals") {
      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return;

      const activeDeal = deals.find((d) => d.id === activeId);
      if (!activeDeal) return;

      const overStage = pipelineStages.find((s) => s === overId) || deals.find((d) => d.id === overId)?.stage;

      if (overStage && activeDeal.stage !== overStage) {
        setDeals((prevDeals) => {
          const oldIndex = prevDeals.findIndex((d) => d.id === activeId);
          const newDeals = [...prevDeals];
          newDeals[oldIndex] = { ...activeDeal, stage: overStage };
          return newDeals;
        });
      }
    }
  };

  const handleDragEnd = async (event, setter, type) => {
    const { active, over } = event;
    if (!over) return;

    if (type === "deals") {
      const activeId = active.id;
      const overId = over.id;

      // Find the deal being dragged
      const activeDeal = deals.find((d) => d.id === activeId);
      if (!activeDeal) return;

      // Check if overId is one of the pipeline stages directly
      let newStage = pipelineStages.find((s) => s === overId);

      // If overId is another deal, get its stage
      if (!newStage) {
        const overDeal = deals.find((d) => d.id === overId);
        if (overDeal) {
          newStage = overDeal.stage;
        }
      }

      if (newStage && activeDeal.stage !== newStage) {
        // Move to the new stage
        setDeals((prevDeals) =>
          prevDeals.map((d) =>
            d.id === activeId ? { ...d, stage: newStage } : d
          )
        );

        try {
          await api.patch(`/crm/deals/${activeId}`, { stage: newStage });
        } catch (err) {
          console.error("Deal stage update error:", err);
        }
      } else if (activeId !== overId) {
        // Just reordering within the same stage
        setDeals((prevDeals) => {
          const oldIndex = prevDeals.findIndex((d) => d.id === activeId);
          const newIndex = prevDeals.findIndex((d) => d.id === overId);
          return arrayMove(prevDeals, oldIndex, newIndex);
        });
      }
    } else {
      // For contacts or activities
      if (active.id !== over.id) {
        setter((items) => {
          const oldIndex = items.findIndex((i) => i.id === active.id);
          const newIndex = items.findIndex((i) => i.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  const [newContact, setNewContact] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const [newDeal, setNewDeal] = useState({
    title: "",
    value: "",
    stage: "LEAD",
    client: "Tech Corp",
    address: "",
  });
  const [newActivity, setNewActivity] = useState({
    task: "",
    contact: "",
    date: "",
    priority: "Medium",
    status: "pending",
  });

  const handleFormSubmit = async (e, setModalOpen, type = "deals", data = null) => {
    e.preventDefault();
    if (type === "deals") {
      try {
        const dealToSubmit = {
          title: newDeal.title,
          value: parseInt(newDeal.value.toString().replace(/[^0-9]/g, "")) || 0,
          stage: newDeal.stage,
          address: newDeal.address,
        };
        await api.post("/crm/deals", dealToSubmit);
        setModalOpen(false);
        setNewDeal({ title: "", value: "", stage: "LEAD", client: "Tech Corp", address: "" });
        fetchData(); // Refresh UI
      } catch (err) {
        console.error("Failed to save deal", err);
      }
    }
  };

  // ... inside Modal components ...
  // Example Modal usage for Contacts:
  // <form onSubmit={(e) => handleFormSubmit(e, setContactModalOpen, 'contacts', newContact)}
  // ... and update inputs to bind to newContact state

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* --- NAVIGATION TABS --- */}
        <div className="flex gap-8 border-b border-slate-200 px-4">
          {["contacts", "deals", "activities", "insights"].map((tab) => (
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
          onDragOver={handleDragOver}
          onDragEnd={(e) => {
            if (activeTab === "contacts")
              handleDragEnd(e, setContacts, "contacts");
            if (activeTab === "deals") handleDragEnd(e, setDeals, "deals");
            if (activeTab === "activities")
              handleDragEnd(e, setActivities, "activities");
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
                              ? c.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "?"}
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
                          {c.last_contact ? new Date(c.last_contact).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${c.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}
                          >
                            {c.status || "active"}
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
                <h3 className="text-xl font-black text-slate-800 tracking-tight text-left">
                  Deals Pipeline
                </h3>
                <button
                  onClick={() => setDealModalOpen(true)}
                  className="bg-brand-gold text-white text-[11px] font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 hover:brightness-105 transition-all cursor-pointer"
                >
                  <Plus size={16} /> Add Deal
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 pb-6 min-h-[500px]">
                {pipelineStages.map((stage) => (
                  <DroppableColumn key={stage} stage={stage}>
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
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left">
                              <h4 className="text-xs font-bold text-slate-800 leading-tight mb-1">
                                {deal.title}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-medium mb-1">
                                {deal.client}
                              </p>
                              {deal.address && (
                                <p className="text-[9px] text-slate-500 font-medium bg-slate-50 p-1.5 rounded-lg border border-slate-100/50 mt-1 mb-2 leading-tight flex items-start gap-1">
                                  <MapPin size={10} className="text-slate-400 mt-0.5 shrink-0" />
                                  <span>{deal.address}</span>
                                </p>
                              )}
                              <div className="flex flex-col gap-2 mt-4">
                                <span className="text-brand-navy font-black text-xs">
                                  {deal.value}
                                </span>
                                <select
                                  value={deal.stage}
                                  onChange={async (e) => {
                                    const newStage = e.target.value;
                                    setDeals((prev) =>
                                      prev.map((d) =>
                                        d.id === deal.id ? { ...d, stage: newStage } : d
                                      )
                                    );
                                    try {
                                      await api.patch(`/crm/deals/${deal.id}`, { stage: newStage });
                                    } catch (err) {
                                      console.error("Deal stage select error:", err);
                                    }
                                  }}
                                  className="bg-slate-50 text-[9px] font-bold text-slate-500 py-1 px-1.5 rounded-lg border-none outline-none cursor-pointer w-full"
                                >
                                  {pipelineStages.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </SortableItem>
                        ))}
                    </SortableContext>
                  </DroppableColumn>
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

          {activeTab === "insights" && (
            <div className="space-y-6">
              {/* --- METRIC CARDS --- */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                <InsightCard
                  title="Total Pipeline Value"
                  value={(() => {
                    const total = deals.reduce((acc, curr) => {
                      const val = parseInt(curr.value.replace(/[^0-9]/g, "")) || 0;
                      return acc + val;
                    }, 0);
                    return `₹${total.toLocaleString()}`;
                  })()}
                  desc="Combined value of all pipeline deals"
                  trend="+12.5% vs last month"
                  trendColor="text-emerald-500"
                />
                <InsightCard
                  title="Total Contacts"
                  value={contacts.length}
                  desc="Leads and active partners"
                  trend={`${contacts.filter(c => c.status === "active").length} active members`}
                  trendColor="text-blue-500"
                />
                <InsightCard
                  title="Open Activities"
                  value={activities.filter(a => a.status === "pending").length}
                  desc="Tasks requiring action"
                  trend="3 due this week"
                  trendColor="text-amber-500"
                />
                <InsightCard
                  title="Conversion Rate"
                  value="64%"
                  desc="Won vs lost deals ratio"
                  trend="+4.2% from Q3"
                  trendColor="text-emerald-500"
                />
              </div>

              {/* --- PIPELINE BREAKDOWN & ACTIVITIES GRAPHICS --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                {/* Pipeline Stages Breakdown */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
                    Deals by Pipeline Stage
                  </h4>
                  <div className="space-y-4">
                    {pipelineStages.map((stage) => {
                      const stageDeals = deals.filter((d) => d.stage === stage);
                      const totalStageVal = stageDeals.reduce((acc, curr) => {
                        const val = parseInt(curr.value.replace(/[^0-9]/g, "")) || 0;
                        return acc + val;
                      }, 0);
                      const maxStageCount = Math.max(...pipelineStages.map(s => deals.filter(d => d.stage === s).length), 1);
                      const percent = (stageDeals.length / maxStageCount) * 100;

                      return (
                        <div key={stage} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-500 uppercase tracking-wider">{stage}</span>
                            <span className="text-slate-700">
                              {stageDeals.length} {stageDeals.length === 1 ? "deal" : "deals"} (₹{totalStageVal.toLocaleString()})
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${percent}%` }}
                              className={`h-full rounded-full transition-all duration-500 ${
                                stage === "WON"
                                  ? "bg-emerald-500"
                                  : stage === "LOST"
                                    ? "bg-rose-500"
                                    : "bg-brand-gold"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Priority & Tasks Overview */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Task Priority & Status Overview
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Task status split */}
                    <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-slate-50 flex flex-col justify-between">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Task Completion Status
                      </p>
                      <div className="space-y-3">
                        {["completed", "pending"].map((status) => {
                          const count = activities.filter(a => a.status === status).length;
                          const total = activities.length || 1;
                          const pct = Math.round((count / total) * 100);
                          return (
                            <div key={status}>
                              <div className="flex justify-between text-[11px] font-bold mb-1">
                                <span className="text-slate-600 capitalize">{status}</span>
                                <span className="text-slate-500">{pct}%</span>
                              </div>
                              <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                                <div
                                  style={{ width: `${pct}%` }}
                                  className={`h-full rounded-full ${status === "completed" ? "bg-emerald-500" : "bg-amber-500"}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Task Priority list */}
                    <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-slate-50 flex flex-col justify-between">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Priority Level Breakdown
                      </p>
                      <div className="space-y-3">
                        {["high", "medium", "low"].map((priority) => {
                          const count = activities.filter(a => a.priority.toLowerCase() === priority).length;
                          return (
                            <div key={priority} className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 uppercase font-black text-[9px] tracking-wider flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${
                                  priority === "high"
                                    ? "bg-red-500"
                                    : priority === "medium"
                                      ? "bg-amber-500"
                                      : "bg-slate-400"
                                }`} />
                                {priority}
                              </span>
                              <span className="font-bold text-slate-700">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action insight list */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Key Recommendations
                    </p>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li className="flex gap-2 items-start">
                        <span className="text-amber-500">⚡</span>
                        <span>You have <strong>{activities.filter(a => a.status === "pending" && a.priority === "high").length} high-priority</strong> tasks pending action.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-emerald-500">📈</span>
                        <span>Stage <strong>NEGOTIATION</strong> holds the highest deal value. Focus on closing those deals.</span>
                      </li>
                    </ul>
                  </div>
                </div>
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
            onSubmit={(e) => handleFormSubmit(e, 'contacts', setContactModalOpen, newContact)}
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
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
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
                value={newContact.company}
                onChange={(e) => setNewContact({...newContact, company: e.target.value})}
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
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
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
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
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
            onSubmit={(e) => handleFormSubmit(e, setDealModalOpen, "deals")}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Deal Title
              </label>
              <input
                required
                type="text"
                value={newDeal.title}
                onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
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
                  <select
                    value={newDeal.client}
                    onChange={(e) => setNewDeal({ ...newDeal, client: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer"
                  >
                    <option value="Tech Corp">Tech Corp</option>
                    <option value="StartUp Inc">StartUp Inc</option>
                    <option value="Enterprise Ltd">Enterprise Ltd</option>
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
                  value={newDeal.value}
                  onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
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
                <select
                  value={newDeal.stage}
                  onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer"
                >
                  {pipelineStages.map((s) => (
                    <option key={s} value={s}>{s}</option>
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
                Address
              </label>
              <textarea
                value={newDeal.address}
                onChange={(e) => setNewDeal({ ...newDeal, address: e.target.value })}
                placeholder="e.g. 123 Business Bay, Dubai"
                rows={2}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm resize-none"
              />
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

function InsightCard({ title, value, desc, trend, trendColor }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        {title}
      </p>
      <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
        {value}
      </h3>
      <p className="text-[11px] text-slate-400 mb-3">{desc}</p>
      <div className={`text-[10px] font-bold ${trendColor}`}>{trend}</div>
    </div>
  );
}
