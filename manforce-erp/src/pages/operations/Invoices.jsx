import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Plus,
  X,
  ChevronDown,
  Check,
  Loader2,
  Download,
  Receipt as ReceiptIcon,
  FileText,
  Search,
  Trash2,
  Edit,
  Eye,
  Save,
  Printer,
  Bell
} from "lucide-react";
import api from "../../utils/api";

export default function Invoices({ role }) {
  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("invoices"); // "invoices" | "receipts" | "history"
  const [historySubTab, setHistorySubTab] = useState("invoices"); // "invoices" | "receipts"
  const [notification, setNotification] = useState(null);
  const [clientsList, setClientsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals for Previews
  const [previewInvoiceData, setPreviewInvoiceData] = useState(null);
  const [previewReceiptData, setPreviewReceiptData] = useState(null);

  // Invoices Database / State (Includes Mock Data reflecting the Mockup values on load)
  const [invoices, setInvoices] = useState([
    {
      id: "INV/2026/05/026",
      client: "Al Futtaim Group",
      projectTitle: "Retails Store Setup",
      siteAddress: "500 Shopping Center ,Dubai,UAE",
      date: "20/05/2026",
      amt: 40200,
      discount: 500,
      amountReceived: 0,
      status: "Pending",
      items: [
        { id: 1, description: "False Celling(Gypsum Board)", quantity: 120.00, price: 85.00, total: 10200.00 },
        { id: 2, description: "Bedroom Interior Setup", quantity: 1.00, price: 18500.00, total: 18500.00 },
        { id: 3, description: "Wall Paneling(wood finish)", quantity: 80.00, price: 75.00, total: 6000.00 }
      ]
    },
    {
      id: "INV/2026/05/025",
      client: "Emaar Properties",
      projectTitle: "Residential Lobby Setup",
      siteAddress: "Downtown Dubai",
      date: "01/05/2026",
      amt: 157500,
      discount: 1500,
      amountReceived: 156000,
      status: "Paid",
      items: [
        { id: 1, description: "Lobby Flooring & Marble", quantity: 1, price: 157500, total: 157500 }
      ]
    },
    {
      id: "INV/2026/05/024",
      client: "DAMAC Properties",
      projectTitle: "Villa Renovation",
      siteAddress: "Damac Hills",
      date: "01/05/2026",
      amt: 58900,
      discount: 0,
      amountReceived: 0,
      status: "Pending",
      items: [
        { id: 1, description: "Bathroom Fitout", quantity: 2, price: 29450, total: 58900 }
      ]
    }
  ]);

  // Receipts State
  const [receipts, setReceipts] = useState([
    {
      id: "REC/2026/05/012",
      client: "Al Futtaim Group",
      invoiceRef: "INV/2026/05/026",
      amt: 10000,
      date: "21/05/2026",
      paymentMethod: "Bank Transfer",
      notes: "Part payment for false ceiling work"
    },
    {
      id: "REC/2026/05/011",
      client: "Emaar Properties",
      invoiceRef: "INV/2026/05/025",
      amt: 156000,
      date: "05/05/2026",
      paymentMethod: "Bank Transfer",
      notes: "Full payment settlement"
    }
  ]);

  // --- FORM STATE (INVOICE CREATOR) ---
  // Defaults set exactly to mockup values for wow-effect on first look
  const [invoiceForm, setInvoiceForm] = useState({
    documentNumber: "INV/2026/05/026",
    date: "20/05/2026",
    clientName: "Al Futtaim Group",
    siteAddress: "500 Shopping Center ,Dubai,UAE",
    projectTitle: "Retails Store Setup",
    discount: "500.00",
    amountReceived: "00.00",
    workItems: [
      { id: 1, description: "False Celling(Gypsum Board)", quantity: "120.00", price: "85.00", total: 10200.00 },
      { id: 2, description: "Bedroom Interior Setup", quantity: "1.00", price: "18500.00", total: 18500.00 },
      { id: 3, description: "Wall Paneling(wood finish)", quantity: "80.00", price: "75.00", total: 6000.00 }
    ]
  });

  // --- FORM STATE (RECEIPT CREATOR) ---
  const [receiptForm, setReceiptForm] = useState({
    documentNumber: "REC/2026/05/012",
    date: "21/05/2026",
    clientName: "Al Futtaim Group",
    invoiceRef: "INV/2026/05/026",
    amountPaid: "10000.00",
    paymentMethod: "Bank Transfer",
    notes: "Part payment for false ceiling work"
  });

  // Load clients from API on mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClientsList(res.data || []);
        if (res.data && res.data.length > 0) {
          // If loaded successfully, update forms' client selector if not already edited
          setInvoiceForm((prev) => ({
            ...prev,
            clientName: prev.clientName || res.data[0].name
          }));
          setReceiptForm((prev) => ({
            ...prev,
            clientName: prev.clientName || res.data[0].name
          }));
        }
      } catch (err) {
        console.error("Failed to load clients in Invoices page:", err);
      }
    };
    fetchClients();
  }, []);

  // Update receipt invoice references when selected client changes
  useEffect(() => {
    const clientInvoices = invoices.filter(
      (inv) => inv.client === receiptForm.clientName && inv.status !== "Paid"
    );
    if (clientInvoices.length > 0) {
      setReceiptForm((prev) => ({
        ...prev,
        invoiceRef: clientInvoices[0].id,
        amountPaid: (clientInvoices[0].amt - clientInvoices[0].amountReceived - clientInvoices[0].discount).toString()
      }));
    } else {
      setReceiptForm((prev) => ({
        ...prev,
        invoiceRef: "General Deposit",
        amountPaid: ""
      }));
    }
  }, [receiptForm.clientName, invoices]);

  // Toast notifier helper
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- INVOICE FORM DYNAMIC MATHS ---
  const subtotal = useMemo(() => {
    return invoiceForm.workItems.reduce(
      (sum, item) => sum + (parseFloat(item.total) || 0),
      0
    );
  }, [invoiceForm.workItems]);

  const balanceAmount = useMemo(() => {
    const disc = parseFloat(invoiceForm.discount) || 0;
    const rec = parseFloat(invoiceForm.amountReceived) || 0;
    return subtotal - disc - rec;
  }, [subtotal, invoiceForm.discount, invoiceForm.amountReceived]);

  const paymentStatus = useMemo(() => {
    const rec = parseFloat(invoiceForm.amountReceived) || 0;
    const net = balanceAmount + rec; // Subtotal - Discount
    if (rec <= 0) return "Pending";
    if (rec >= net) return "Paid";
    return "Partially Paid";
  }, [balanceAmount, invoiceForm.amountReceived]);

  // --- RECEIPT FORM DYNAMIC MATHS ---
  const receiptSubtotal = useMemo(() => {
    return parseFloat(receiptForm.amountPaid) || 0;
  }, [receiptForm.amountPaid]);

  // --- INVOICE WORK ITEMS HANDLERS ---
  const handleAddItem = () => {
    const newId = invoiceForm.workItems.length > 0 
      ? Math.max(...invoiceForm.workItems.map(item => item.id)) + 1 
      : 1;
    setInvoiceForm((prev) => ({
      ...prev,
      workItems: [
        ...prev.workItems,
        { id: newId, description: "", quantity: "1.00", price: "0.00", total: 0.00 }
      ]
    }));
  };

  const handleUpdateItem = (index, field, value) => {
    const updatedItems = [...invoiceForm.workItems];
    updatedItems[index][field] = value;
    
    if (field === "quantity" || field === "price") {
      const q = parseFloat(updatedItems[index].quantity) || 0;
      const p = parseFloat(updatedItems[index].price) || 0;
      updatedItems[index].total = q * p;
    }
    
    setInvoiceForm((prev) => ({
      ...prev,
      workItems: updatedItems
    }));
  };

  const handleDeleteItem = (index) => {
    const updatedItems = invoiceForm.workItems.filter((_, i) => i !== index);
    setInvoiceForm((prev) => ({
      ...prev,
      workItems: updatedItems
    }));
  };

  // --- ACTIONS HANDLERS ---
  const handleSaveInvoiceDraft = () => {
    triggerNotify("Invoice Draft saved successfully!");
  };

  const handleGenerateInvoice = () => {
    const invoiceId = `INV/2026/05/${String(invoices.length + 1).padStart(3, "0")}`;
    const newInvoiceObj = {
      id: invoiceId,
      client: invoiceForm.clientName,
      projectTitle: invoiceForm.projectTitle,
      siteAddress: invoiceForm.siteAddress,
      date: invoiceForm.date,
      amt: subtotal,
      discount: parseFloat(invoiceForm.discount) || 0,
      amountReceived: parseFloat(invoiceForm.amountReceived) || 0,
      status: paymentStatus,
      items: invoiceForm.workItems.map(item => ({
        ...item,
        quantity: parseFloat(item.quantity) || 0,
        price: parseFloat(item.price) || 0,
        total: parseFloat(item.total) || 0
      }))
    };

    setInvoices([newInvoiceObj, ...invoices]);
    triggerNotify(`Invoice ${invoiceId} generated & stored in History!`);
    
    // Switch to history tab
    setActiveTab("history");
    setHistorySubTab("invoices");

    // Reset Form for next input
    setInvoiceForm({
      documentNumber: `INV/2026/05/${String(invoices.length + 2).padStart(3, "0")}`,
      date: new Date().toLocaleDateString("en-GB"),
      clientName: clientsList[0]?.name || "Al Futtaim Group",
      siteAddress: "",
      projectTitle: "",
      discount: "0.00",
      amountReceived: "0.00",
      workItems: [
        { id: 1, description: "", quantity: "1.00", price: "0.00", total: 0.00 }
      ]
    });
  };

  const handleGenerateReceipt = () => {
    const receiptId = `REC/2026/05/${String(receipts.length + 1).padStart(3, "0")}`;
    const newReceiptObj = {
      id: receiptId,
      client: receiptForm.clientName,
      invoiceRef: receiptForm.invoiceRef,
      amt: receiptSubtotal,
      date: receiptForm.date,
      paymentMethod: receiptForm.paymentMethod,
      notes: receiptForm.notes
    };

    // Update the invoice amountReceived & status in state if linked
    if (receiptForm.invoiceRef && receiptForm.invoiceRef !== "General Deposit") {
      setInvoices((prevInvoices) =>
        prevInvoices.map((inv) => {
          if (inv.id === receiptForm.invoiceRef) {
            const updatedReceived = inv.amountReceived + receiptSubtotal;
            const updatedStatus = updatedReceived >= (inv.amt - inv.discount) ? "Paid" : "Partially Paid";
            return {
              ...inv,
              amountReceived: updatedReceived,
              status: updatedStatus
            };
          }
          return inv;
        })
      );
    }

    setReceipts([newReceiptObj, ...receipts]);
    triggerNotify(`Receipt ${receiptId} generated successfully!`);

    // Switch to history tab
    setActiveTab("history");
    setHistorySubTab("receipts");

    // Reset Receipt Form
    setReceiptForm({
      documentNumber: `REC/2026/05/${String(receipts.length + 2).padStart(3, "0")}`,
      date: new Date().toLocaleDateString("en-GB"),
      clientName: clientsList[0]?.name || "Al Futtaim Group",
      invoiceRef: "",
      amountPaid: "0.00",
      paymentMethod: "Bank Transfer",
      notes: ""
    });
  };

  const handleDownloadPDF = (id) => {
    triggerNotify(`Generating PDF for ${id}...`);
  };

  // Header Actions Integration
  const headerActions = (
    <div className="flex items-center gap-3">
      <button
        onClick={() => {
          setActiveTab("invoices");
          // Re-populate with defaults/draft values if desired
        }}
        className="bg-[#0b132b] text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
      >
        <Plus size={14} /> Add Invoice
      </button>
      <button
        onClick={() => {
          setActiveTab("receipts");
        }}
        className="bg-brand-gold text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
      >
        <Plus size={14} /> Add Receipt
      </button>
    </div>
  );

  // Filtered lists based on search
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) =>
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [invoices, searchQuery]);

  const filteredReceipts = useMemo(() => {
    return receipts.filter((rec) =>
      rec.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.invoiceRef.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [receipts, searchQuery]);

  return (
    <DashboardLayout role={role} headerActions={headerActions}>
      <div className="space-y-6 relative">
        {/* SUCCESS NOTIFICATION TOAST */}
        {notification && (
          <div className="fixed top-24 right-12 z-50 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-[#0b132b] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
              {notification.includes("Generating") ? (
                <Loader2 size={16} className="animate-spin text-blue-400" />
              ) : (
                <Check size={16} className="text-emerald-400" />
              )}
              <span className="text-[13px] font-bold tracking-tight">
                {notification}
              </span>
            </div>
          </div>
        )}

        {/* TOP TAB CONTROL BAR */}
        <div className="flex border-b border-slate-200/80 -mx-8 px-8 mb-6">
          <button
            onClick={() => {
              setActiveTab("invoices");
              setSearchQuery("");
            }}
            className={`pb-4 px-2 text-sm font-semibold relative transition-all cursor-pointer ${
              activeTab === "invoices"
                ? "text-brand-gold border-b-2 border-brand-gold font-bold"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => {
              setActiveTab("receipts");
              setSearchQuery("");
            }}
            className={`pb-4 px-2 ml-8 text-sm font-semibold relative transition-all cursor-pointer ${
              activeTab === "receipts"
                ? "text-brand-gold border-b-2 border-brand-gold font-bold"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Receipts
          </button>
          <button
            onClick={() => {
              setActiveTab("history");
              setSearchQuery("");
            }}
            className={`pb-4 px-2 ml-8 text-sm font-semibold relative transition-all cursor-pointer ${
              activeTab === "history"
                ? "text-brand-gold border-b-2 border-brand-gold font-bold"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            History
          </button>
        </div>

        {/* --- INVOICES DESIGNER VIEW --- */}
        {activeTab === "invoices" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left Steps Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Step 1: Invoice Number */}
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-blue-600/10">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Invoice Number</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Document Number
                    </label>
                    <input
                      disabled
                      type="text"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-semibold text-slate-400 cursor-not-allowed shadow-sm"
                      value={invoiceForm.documentNumber}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm"
                      value={invoiceForm.date}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Client Name
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm appearance-none cursor-pointer"
                        value={invoiceForm.clientName}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, clientName: e.target.value })}
                      >
                        {clientsList.length > 0 ? (
                          clientsList.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Al Futtaim Group">Al Futtaim Group</option>
                            <option value="Emaar Properties">Emaar Properties</option>
                            <option value="DAMAC Properties">DAMAC Properties</option>
                            <option value="DP World">DP World</option>
                          </>
                        )}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Site Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm"
                      value={invoiceForm.siteAddress}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, siteAddress: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Project Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm"
                      value={invoiceForm.projectTitle}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, projectTitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Work Items */}
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-blue-600/10">
                      2
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Work Items</h3>
                  </div>

                  <button
                    onClick={handleAddItem}
                    className="border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-slate-600 transition-all cursor-pointer"
                  >
                    <Plus size={13} /> Add Item
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-200/60 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-200/60">
                      <tr>
                        <th className="px-4 py-3 w-12 text-center">#</th>
                        <th className="px-4 py-3">Work Description</th>
                        <th className="px-4 py-3 w-28 text-center">Quantity</th>
                        <th className="px-4 py-3 w-32 text-center">Price (AED)</th>
                        <th className="px-4 py-3 w-32 text-center">Total (AED)</th>
                        <th className="px-4 py-3 w-20 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                      {invoiceForm.workItems.map((item, index) => (
                        <tr key={item.id} className="hover:bg-slate-50/20 transition-all">
                          <td className="px-4 py-3 text-center text-slate-400 font-bold">{index + 1}</td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-gold text-xs text-slate-700 shadow-inner"
                              value={item.description}
                              onChange={(e) => handleUpdateItem(index, "description", e.target.value)}
                              placeholder="Enter description..."
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="text"
                              className="w-20 text-center px-2 py-1.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-gold text-xs text-slate-700 shadow-inner font-medium"
                              value={item.quantity}
                              onChange={(e) => handleUpdateItem(index, "quantity", e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="text"
                              className="w-24 text-center px-2 py-1.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-gold text-xs text-slate-700 shadow-inner font-medium"
                              value={item.price}
                              onChange={(e) => handleUpdateItem(index, "price", e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              disabled
                              type="text"
                              className="w-24 text-center px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 font-semibold cursor-not-allowed"
                              value={(parseFloat(item.total) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => {
                                  // Just a focus effect for inline edits
                                  triggerNotify("Row is ready for inline editing");
                                }}
                                className="p-1.5 text-blue-500 hover:bg-blue-50 border border-slate-100 rounded-lg transition-all cursor-pointer"
                                title="Edit Item"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(index)}
                                className="p-1.5 text-red-500 hover:bg-red-50 border border-slate-100 rounded-lg transition-all cursor-pointer"
                                title="Delete Item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total amount summary line inside Step 2 */}
                <div className="flex justify-end items-center gap-4 mt-6 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Total Amount (AED0
                  </span>
                  <span className="text-lg font-black text-slate-800 pr-4">
                    {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Step 3: Payment Deteails */}
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-blue-600/10">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Payment Deteails</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Discount (AED)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-semibold text-slate-700 shadow-sm"
                      value={invoiceForm.discount}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, discount: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Amount Recevied (AED)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-semibold text-slate-700 shadow-sm"
                      value={invoiceForm.amountReceived}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, amountReceived: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Payment Status
                    </label>
                    <div className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center min-h-[42px] shadow-inner">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : paymentStatus === "Partially Paid"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Invoice Summary Panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">
                  Invoice Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                    <span>Subtotal</span>
                    <span className="text-slate-800 font-bold">
                      AED {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                    <span>Discount</span>
                    <span className="text-slate-800 font-bold">
                      AED {(parseFloat(invoiceForm.discount) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                    <span>Amount Received</span>
                    <span className="text-slate-800 font-bold">
                      AED {(parseFloat(invoiceForm.amountReceived) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-200 my-4 pt-3 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-500">Balance Amount</span>
                    <span className="text-red-500 font-black">
                      AED {balanceAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="bg-[#EFF6FF] border border-blue-100 rounded-xl p-4 text-center mt-5 mb-5 shadow-sm">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 leading-none">
                    Net Payable
                  </p>
                  <p className="text-xl font-black text-blue-700">
                    AED {balanceAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="space-y-3 pt-3">
                  <button
                    onClick={() => {
                      setPreviewInvoiceData({
                        id: invoiceForm.documentNumber,
                        client: invoiceForm.clientName,
                        projectTitle: invoiceForm.projectTitle,
                        siteAddress: invoiceForm.siteAddress,
                        date: invoiceForm.date,
                        amt: subtotal,
                        discount: parseFloat(invoiceForm.discount) || 0,
                        amountReceived: parseFloat(invoiceForm.amountReceived) || 0,
                        status: paymentStatus,
                        items: invoiceForm.workItems.map(item => ({
                          ...item,
                          quantity: parseFloat(item.quantity) || 0,
                          price: parseFloat(item.price) || 0,
                          total: parseFloat(item.total) || 0
                        }))
                      });
                    }}
                    className="w-full py-2.5 bg-[#0b132b] text-white hover:bg-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Eye size={14} /> Preview Invoice
                  </button>

                  <button
                    onClick={handleSaveInvoiceDraft}
                    className="w-full py-2.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Save size={14} /> Save Draft
                  </button>

                  <button
                    onClick={handleGenerateInvoice}
                    className="w-full py-3 bg-brand-gold text-white hover:brightness-110 rounded-xl text-xs font-black shadow-md shadow-brand-gold/10 uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Generate & Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- RECEIPTS DESIGNER VIEW --- */}
        {activeTab === "receipts" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left Steps Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Step 1: Receipt Details */}
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-blue-600/10">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Receipt Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Receipt Number
                    </label>
                    <input
                      disabled
                      type="text"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-semibold text-slate-400 cursor-not-allowed shadow-sm"
                      value={receiptForm.documentNumber}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm"
                      value={receiptForm.date}
                      onChange={(e) => setReceiptForm({ ...receiptForm, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Client Name
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm appearance-none cursor-pointer"
                        value={receiptForm.clientName}
                        onChange={(e) => setReceiptForm({ ...receiptForm, clientName: e.target.value })}
                      >
                        {clientsList.length > 0 ? (
                          clientsList.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Al Futtaim Group">Al Futtaim Group</option>
                            <option value="Emaar Properties">Emaar Properties</option>
                            <option value="DAMAC Properties">DAMAC Properties</option>
                            <option value="DP World">DP World</option>
                          </>
                        )}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Invoice Reference
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm appearance-none cursor-pointer"
                        value={receiptForm.invoiceRef}
                        onChange={(e) => {
                          const val = e.target.value;
                          const invMatch = invoices.find(i => i.id === val);
                          setReceiptForm({
                            ...receiptForm,
                            invoiceRef: val,
                            amountPaid: invMatch ? (invMatch.amt - invMatch.amountReceived - invMatch.discount).toString() : ""
                          });
                        }}
                      >
                        <option value="General Deposit">General Deposit / Account Payment</option>
                        {invoices
                          .filter(i => i.client === receiptForm.clientName)
                          .map((inv) => (
                            <option key={inv.id} value={inv.id}>
                              {inv.id} (Balance: AED {(inv.amt - inv.amountReceived - inv.discount).toLocaleString()})
                            </option>
                          ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Receipt Data */}
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-blue-600/10">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Amount & Method</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Amount Paid (AED)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-semibold text-slate-700 shadow-sm"
                      value={receiptForm.amountPaid}
                      onChange={(e) => setReceiptForm({ ...receiptForm, amountPaid: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Payment Method
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm appearance-none cursor-pointer"
                        value={receiptForm.paymentMethod}
                        onChange={(e) => setReceiptForm({ ...receiptForm, paymentMethod: e.target.value })}
                      >
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Card">Card Payment</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Notes / Reference
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-xs font-medium text-slate-700 shadow-sm"
                      placeholder="Add transaction reference numbers, cheque numbers, etc."
                      value={receiptForm.notes}
                      onChange={(e) => setReceiptForm({ ...receiptForm, notes: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Receipt Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">
                  Receipt Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                    <span>Client Name</span>
                    <span className="text-slate-800 font-bold text-right truncate max-w-[150px]">
                      {receiptForm.clientName}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                    <span>Linked Invoice</span>
                    <span className="text-slate-800 font-bold">
                      {receiptForm.invoiceRef || "General Deposit"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                    <span>Method</span>
                    <span className="text-slate-800 font-bold">
                      {receiptForm.paymentMethod}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 my-4 pt-3 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-500">Collected Amount</span>
                    <span className="text-emerald-500 font-black">
                      AED {receiptSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-6">
                  <button
                    onClick={() => {
                      setPreviewReceiptData({
                        id: receiptForm.documentNumber,
                        client: receiptForm.clientName,
                        invoiceRef: receiptForm.invoiceRef,
                        amt: receiptSubtotal,
                        date: receiptForm.date,
                        paymentMethod: receiptForm.paymentMethod,
                        notes: receiptForm.notes
                      });
                    }}
                    className="w-full py-2.5 bg-[#0b132b] text-white hover:bg-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Eye size={14} /> Preview Receipt
                  </button>

                  <button
                    onClick={handleGenerateReceipt}
                    className="w-full py-3 bg-brand-gold text-white hover:brightness-110 rounded-xl text-xs font-black shadow-md shadow-brand-gold/10 uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Generate & Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TRANSACTION HISTORY LISTINGS --- */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            {/* Card Header, Tab Switches & Search Bar */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/10">
              {/* Internal Subtabs for Invoices vs Receipts */}
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1 shrink-0">
                <button
                  onClick={() => {
                    setHistorySubTab("invoices");
                    setSearchQuery("");
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    historySubTab === "invoices"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FileText size={14} /> Invoices ({invoices.length})
                </button>
                <button
                  onClick={() => {
                    setHistorySubTab("receipts");
                    setSearchQuery("");
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    historySubTab === "receipts"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <ReceiptIcon size={14} /> Receipts ({receipts.length})
                </button>
              </div>

              {/* Filter Search Input */}
              <div className="relative w-full md:w-64">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={historySubTab === "invoices" ? "Search invoices..." : "Search receipts..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-brand-gold transition-all"
                />
              </div>
            </div>

            {/* Sub-table view based on sub-tab */}
            <div className="overflow-x-auto">
              {historySubTab === "invoices" ? (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Invoice #</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4 text-right">Amount (AED)</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4">Issued</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/20 transition-colors">
                          <td className="px-6 py-4 font-bold text-brand-gold">{inv.id}</td>
                          <td className="px-6 py-4 font-bold text-slate-800">{inv.client}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-800">
                            {inv.amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                inv.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : inv.status === "Partially Paid"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 font-medium">{inv.date}</td>
                          <td className="px-6 py-4 text-right flex gap-2 justify-end">
                            <button
                              onClick={() => setPreviewInvoiceData(inv)}
                              className="text-[10px] font-bold text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-[#0b132b] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Eye size={12} /> View
                            </button>
                            <button
                              onClick={() => handleDownloadPDF(inv.id)}
                              className="text-[10px] font-bold text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-brand-gold hover:text-white transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Download size={12} /> PDF
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-10 text-center text-slate-400 font-medium">
                          No invoices found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Receipt #</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Invoice Reference</th>
                      <th className="px-6 py-4 text-right">Amount Paid (AED)</th>
                      <th className="px-6 py-4">Date Paid</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {filteredReceipts.length > 0 ? (
                      filteredReceipts.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50/20 transition-colors">
                          <td className="px-6 py-4 font-bold text-brand-gold">{rec.id}</td>
                          <td className="px-6 py-4 font-bold text-slate-800">{rec.client}</td>
                          <td className="px-6 py-4 font-medium text-slate-500">{rec.invoiceRef}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-800">
                            {rec.amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4 text-slate-400 font-medium">{rec.date}</td>
                          <td className="px-6 py-4 text-right flex gap-2 justify-end">
                            <button
                              onClick={() => setPreviewReceiptData(rec)}
                              className="text-[10px] font-bold text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-[#0b132b] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Eye size={12} /> View
                            </button>
                            <button
                              onClick={() => handleDownloadPDF(rec.id)}
                              className="text-[10px] font-bold text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-brand-gold hover:text-white transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Download size={12} /> PDF
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-10 text-center text-slate-400 font-medium">
                          No receipts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* --- PREVIEW INVOICE MODAL --- */}
        {previewInvoiceData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden my-8 animate-in zoom-in-95 duration-200 text-left border border-slate-100 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Invoice Document Preview</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Ready for print and distribution</p>
                </div>
                <button
                  onClick={() => setPreviewInvoiceData(null)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Invoice A4 Sheet Wrapper */}
              <div className="p-8 flex-1 overflow-y-auto bg-slate-50/40 print-container">
                <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm max-w-2xl mx-auto space-y-8 font-sans">
                  {/* Top A4 Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-brand-gold text-white font-black px-3 py-1 text-sm rounded-lg shadow-sm">
                        M
                      </span>
                      <h1 className="text-sm font-black text-slate-800 tracking-tight mt-3">
                        ManForce Interior & ERP Solutions
                      </h1>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">
                        Dubai · United Arab Emirates
                      </p>
                    </div>

                    <div className="text-right">
                      <h2 className="text-lg font-black text-brand-gold uppercase tracking-wider">
                        INVOICE
                      </h2>
                      <p className="text-[10px] font-bold text-slate-700 mt-1">
                        No: <span className="font-black text-blue-600">{previewInvoiceData.id}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        Date: {previewInvoiceData.date}
                      </p>
                    </div>
                  </div>

                  {/* Client & Project Specs */}
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Billed To:
                      </p>
                      <p className="font-extrabold text-slate-800 text-sm">
                        {previewInvoiceData.client}
                      </p>
                      <p className="text-slate-500 font-medium mt-1 leading-relaxed">
                        {previewInvoiceData.siteAddress || "No site address specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Project / Scope:
                      </p>
                      <p className="font-extrabold text-slate-800 text-sm">
                        {previewInvoiceData.projectTitle || "Interior Fitout Project"}
                      </p>
                      <p className="text-slate-500 font-medium mt-1">
                        Galletrix-Manforce Team Execution
                      </p>
                    </div>
                  </div>

                  {/* Items List Table */}
                  <div className="pt-4">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-200 font-bold text-slate-400 text-[10px] uppercase">
                          <th className="py-2 w-10 text-center">#</th>
                          <th className="py-2">Work Description</th>
                          <th className="py-2 w-20 text-center">Qty</th>
                          <th className="py-2 w-24 text-right">Price (AED)</th>
                          <th className="py-2 w-28 text-right">Total (AED)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        {previewInvoiceData.items && previewInvoiceData.items.length > 0 ? (
                          previewInvoiceData.items.map((item, index) => (
                            <tr key={item.id}>
                              <td className="py-3 text-center text-slate-400">{index + 1}</td>
                              <td className="py-3 font-bold text-slate-800">{item.description || "N/A"}</td>
                              <td className="py-3 text-center">{(parseFloat(item.quantity) || 0).toFixed(2)}</td>
                              <td className="py-3 text-right">{(parseFloat(item.price) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td className="py-3 text-right font-bold text-slate-800">{(parseFloat(item.total) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="py-6 text-center text-slate-400 font-medium">
                              No billing items entered.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Subtotal & Calculations */}
                  <div className="border-t border-slate-200 pt-4 flex justify-end">
                    <div className="w-64 space-y-2 text-xs">
                      <div className="flex justify-between items-center text-slate-500 font-semibold">
                        <span>Subtotal</span>
                        <span className="text-slate-800 font-bold">
                          AED {previewInvoiceData.amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-500 font-semibold">
                        <span>Discount</span>
                        <span className="text-slate-800 font-bold">
                          AED {previewInvoiceData.discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-500 font-semibold">
                        <span>Paid To Date</span>
                        <span className="text-slate-800 font-bold">
                          AED {previewInvoiceData.amountReceived.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-slate-800 font-bold border-t border-slate-100 pt-2 text-sm">
                        <span>Net Balance Due</span>
                        <span className="text-blue-600 font-extrabold">
                          AED {(previewInvoiceData.amt - previewInvoiceData.discount - previewInvoiceData.amountReceived).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Footer */}
                  <div className="pt-8 border-t border-slate-100 flex justify-between items-end text-[10px] text-slate-400">
                    <div>
                      <p className="font-bold text-slate-500 uppercase tracking-widest mb-1">Payment Instructions:</p>
                      <p className="font-medium">Direct Bank Transfer to Galletrix Manforce Accounts.</p>
                      <p className="font-medium">Please quote Invoice Reference Number on remittances.</p>
                    </div>

                    <div className="text-center font-bold text-slate-500 w-44">
                      <div className="border-b border-slate-300 h-10 w-full mb-2"></div>
                      <p>Authorized Signature</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                <button
                  onClick={() => setPreviewInvoiceData(null)}
                  className="px-5 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-5 py-2 bg-brand-gold text-white rounded-xl text-xs font-bold hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-brand-gold/10 transition-all cursor-pointer"
                >
                  <Printer size={13} /> Print Document
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- PREVIEW RECEIPT MODAL --- */}
        {previewReceiptData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200 text-left border border-slate-100 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Receipt Voucher Preview</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Record of client payment collection</p>
                </div>
                <button
                  onClick={() => setPreviewReceiptData(null)}
                  className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Receipt A4/Voucher Wrapper */}
              <div className="p-8 flex-1 overflow-y-auto bg-slate-50/40 print-container">
                <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm max-w-xl mx-auto space-y-6 font-sans">
                  <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                    <div>
                      <span className="bg-brand-gold text-white font-black px-2.5 py-0.5 text-xs rounded-md shadow-sm">
                        M
                      </span>
                      <h1 className="text-xs font-black text-slate-800 tracking-tight mt-2">
                        ManForce Interior & ERP Solutions
                      </h1>
                    </div>

                    <div className="text-right">
                      <h2 className="text-base font-black text-emerald-500 uppercase tracking-wider">
                        RECEIPT VOUCHER
                      </h2>
                      <p className="text-[10px] font-bold text-slate-700 mt-1">
                        No: <span className="font-black text-slate-800">{previewReceiptData.id}</span>
                      </p>
                      <p className="text-[9px] text-slate-400 font-medium mt-0.5">
                        Date: {previewReceiptData.date}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Received From:</span>
                      <span className="font-extrabold text-slate-800">{previewReceiptData.client}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Invoice Reference:</span>
                      <span className="font-bold text-blue-600">{previewReceiptData.invoiceRef || "Account Payment"}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Payment Method:</span>
                      <span className="font-bold text-slate-700">{previewReceiptData.paymentMethod}</span>
                    </div>

                    {previewReceiptData.notes && (
                      <div className="flex justify-between border-b border-slate-100 py-1">
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Remarks / Note:</span>
                        <span className="text-slate-600 font-medium italic text-right max-w-[200px] truncate">{previewReceiptData.notes}</span>
                      </div>
                    )}

                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex justify-between items-center mt-6">
                      <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                        Total Cash/Transfer Received:
                      </span>
                      <span className="text-lg font-black text-emerald-600">
                        AED {previewReceiptData.amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-between items-center text-[10px] text-slate-400">
                    <div>
                      <p className="font-semibold">Galletrix Accounts Department</p>
                      <p className="font-medium mt-0.5">Automated ERP Transaction Voucher</p>
                    </div>

                    <div className="text-center font-bold text-slate-500 w-32">
                      <div className="border-b border-slate-300 h-8 w-full mb-1"></div>
                      <p>Receiver Signature</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                <button
                  onClick={() => setPreviewReceiptData(null)}
                  className="px-5 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-5 py-2 bg-brand-gold text-white rounded-xl text-xs font-bold hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-brand-gold/10 transition-all cursor-pointer"
                >
                  <Printer size={13} /> Print Voucher
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
