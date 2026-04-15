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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden p-8 space-y-4">
              <h3 className="text-lg font-bold">Add New Document</h3>
              <select className="w-full p-3 bg-slate-50 border rounded-xl text-sm" value={newDoc.worker_id} onChange={(e) => setNewDoc({...newDoc, worker_id: e.target.value})}>
                <option value="">Select Worker</option>
                {workers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
              <input type="text" placeholder="Type (e.g. Visa)" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" value={newDoc.type} onChange={(e) => setNewDoc({...newDoc, type: e.target.value})} />
              <input type="text" placeholder="Doc Number" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" value={newDoc.number} onChange={(e) => setNewDoc({...newDoc, number: e.target.value})} />
              <input type="date" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" value={newDoc.expiry} onChange={(e) => setNewDoc({...newDoc, expiry: e.target.value})} />
              <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="block w-full text-sm p-3 border rounded-xl" />
              <div className="flex gap-3">
                <button onClick={() => setShowUploadModal(false)} className="flex-1 py-3 border rounded-xl font-bold text-xs">Cancel</button>
                <button onClick={handleUpload} className="flex-1 py-3 bg-brand-gold text-white rounded-xl font-bold text-xs">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
