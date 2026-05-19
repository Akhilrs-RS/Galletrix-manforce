import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Upload, AlertTriangle, X } from "lucide-react";
import api from "../../utils/api";

export default function Documents({ role }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docData, setDocData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newDoc, setNewDoc] = useState({ type: "Visa", number: "", expiry: "", worker_id: "" });
  const [workers, setWorkers] = useState([]);

  const getExpiryWarning = () => {
    if (!newDoc.expiry) return null;
    const expiry = new Date(newDoc.expiry);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 35) {
      return {
        days: diffDays,
        message: `This document will expire in ${diffDays} days! (Within the critical 30-day window, including the 5-day alert gap).`
      };
    }
    return null;
  };

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const [docsRes, workersRes] = await Promise.all([
        api.get("/documents"),
        api.get("/workers")
      ]);
      setDocData(docsRes.data);
      setWorkers(workersRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDocuments(); }, []);

  const calculateStatus = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: "Expired", color: "text-red-500", days: `${Math.abs(diffDays)} days ago` };
    if (diffDays <= 30) return { label: "Expiring", color: "text-amber-600", days: `${diffDays} days left` };
    return { label: "Valid", color: "text-emerald-600", days: `${diffDays} days left` };
  };

  const handleUpload = async () => {
    if (!selectedFile || !newDoc.worker_id) return;
    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("type", newDoc.type);
    formData.append("number", newDoc.number);
    formData.append("expiry", newDoc.expiry);
    formData.append("worker_id", newDoc.worker_id);

    try {
      await api.post("/documents", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setShowUploadModal(false);
      fetchDocuments();
      setNewDoc({ type: "Visa", number: "", expiry: "", worker_id: "" });
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await api.delete(`/documents/${id}`);
        fetchDocuments();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {docData.filter(d => calculateStatus(d.expiry).label !== "Valid").length > 0 && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 shadow-sm">
            <AlertTriangle size={18} className="text-red-500 shrink-0" />
            <p className="text-xs font-bold text-red-800">
              {docData.filter(d => calculateStatus(d.expiry).label !== "Valid").length} document(s) need attention.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button onClick={() => setShowUploadModal(true)} className="bg-brand-gold text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg transition-all cursor-pointer">
            <Upload size={16} /> Add Document
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Worker</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Number</th>
                <th className="px-6 py-4">Days Left</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[12px]">
              {docData.map((doc, i) => {
                const status = calculateStatus(doc.expiry);
                return (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-800">{doc.worker_name}</td>
                    <td className="px-6 py-5 text-slate-500 font-medium">{doc.type}</td>
                    <td className="px-6 py-5 font-mono text-slate-400">{doc.number}</td>
                    <td className={`px-6 py-5 font-bold ${status.color}`}>{status.days}</td>
                    <td className="px-8 py-5 text-right flex items-center justify-end gap-3">
                      <span className={`font-bold ${status.color}`}>{status.label}</span>
                      <a href={`http://localhost:5001${doc.file_url}`} target="_blank" rel="noopener noreferrer" className="text-brand-gold font-bold text-[10px] hover:underline">Download</a>
                      <button onClick={() => handleDelete(doc.id)} className="text-red-500 font-bold text-[10px] hover:underline">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100/50 flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h3 className="text-base font-black text-slate-800 tracking-tight text-left">
                  Add New Document
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-600 animate-none"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-8 space-y-5 overflow-y-auto custom-scrollbar text-left">
                {/* 1. Worker select field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    Select Worker
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm appearance-none cursor-pointer"
                    value={newDoc.worker_id} 
                    onChange={(e) => setNewDoc({...newDoc, worker_id: e.target.value})}
                  >
                    <option value="">Select Worker...</option>
                    {workers.map(w => <option key={w.id} value={w.id}>{w.name} (ID: {w.worker_id})</option>)}
                  </select>
                </div>

                {/* 2. Type input field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    Document Type
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Visa, Labor Card, Passport" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                    value={newDoc.type} 
                    onChange={(e) => setNewDoc({...newDoc, type: e.target.value})} 
                  />
                </div>

                {/* 3. Number input field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    Document Number
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 784-XXXX-XXXXXXX-X" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm"
                    value={newDoc.number} 
                    onChange={(e) => setNewDoc({...newDoc, number: e.target.value})} 
                  />
                </div>

                {/* 4. Expiry Date input field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    Expiry Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-gold text-sm cursor-pointer"
                    value={newDoc.expiry} 
                    onChange={(e) => setNewDoc({...newDoc, expiry: e.target.value})} 
                  />
                  {getExpiryWarning() && (
                    <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-start gap-2.5 shadow-sm text-[11px] font-bold text-amber-800 tracking-tight animate-in slide-in-from-top-1 duration-200 mt-2">
                      <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                      <span>{getExpiryWarning().message}</span>
                    </div>
                  )}
                </div>

                {/* 5. Document File input field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                    Document File Attachment
                  </label>
                  <input 
                    type="file" 
                    onChange={(e) => setSelectedFile(e.target.files[0])} 
                    className="block w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer" 
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  <button 
                    onClick={() => setShowUploadModal(false)} 
                    className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpload} 
                    className="flex-1 py-2.5 bg-brand-gold text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all cursor-pointer"
                  >
                    Save Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
