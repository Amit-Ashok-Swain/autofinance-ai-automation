import { useState } from "react";
import { GST_INVOICES_3WAY } from "../data/dealershipData";
import { sound } from "../utils/sound";
import {
  Receipt,
  CheckCircle2,
  AlertTriangle,
  Send,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function GST3WayRecon() {
  const [invoices, setInvoices] = useState(GST_INVOICES_3WAY);
  const [filter, setFilter] = useState("all");
  const [isReconciling, setIsReconciling] = useState(false);
  const [noticeSent, setNoticeSent] = useState(false);

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === "all") return true;
    if (filter === "matched") return inv.status === "MATCHED";
    if (filter === "missing") return inv.status === "MISSING_IN_2B";
    if (filter === "blocked") return inv.status === "BLOCKED_17_5";
    return true;
  });

  const handleRunRecon = () => {
    if (isReconciling) return;
    sound.playMilestone();
    setIsReconciling(true);

    setTimeout(() => {
      setIsReconciling(false);
      sound.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10b981", "#3b82f6"],
      });
    }, 800);
  };

  const handleSendNotice = () => {
    sound.playMilestone();
    setNoticeSent(true);
    setTimeout(() => setNoticeSent(false), 5000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-1">
            <Receipt className="w-3.5 h-3.5" />
            <span>MODULE 05 // STATUTORY GST & GSTR-2B 3-WAY RECONCILIATION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Purchase Register vs GSTR-2B Automated ITC Matcher
          </h3>
          <p className="text-xs text-slate-400">
            Eliminating Input Tax Credit leakage, filtering Section 17(5) blocked credits, and dispatching vendor notices before GSTR-3B filing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunRecon}
            disabled={isReconciling}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:from-emerald-400 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>{isReconciling ? "Reconciling 3-Way ITC..." : "Execute 3-Way Match"}</span>
          </button>

          <button
            onClick={handleSendNotice}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>Send Vendor Notice</span>
          </button>
        </div>
      </div>

      {noticeSent && (
        <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Automated Vendor Discrepancy Notice Sent:</strong> Notice dispatched to <em>National Media Hoardings</em> for invoice INV-ADV-3310 (₹27,000 GST) demanding GSTR-1 update prior to the 11th.
            </span>
          </div>
          <span className="font-mono text-[10px] text-amber-400 font-bold">DISPATCHED ✓</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
            <tr>
              <th className="p-4">Invoice / GSTIN</th>
              <th className="p-4 font-sans">Vendor & Description</th>
              <th className="p-4 text-right">Purchase Reg GST</th>
              <th className="p-4 text-right">GSTR-2B GST</th>
              <th className="p-4 text-center">Status & Rule</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-white">{inv.id}</p>
                  <span className="text-[10px] text-slate-500">{inv.gstin}</span>
                </td>
                <td className="p-4 font-sans">
                  <p className="font-semibold text-slate-200">{inv.vendor}</p>
                  <span className="text-[11px] text-slate-400">{inv.category}</span>
                </td>
                <td className="p-4 text-right font-bold text-slate-200">
                  ₹{inv.prGst.toLocaleString("en-IN")}
                </td>
                <td className="p-4 text-right font-bold text-emerald-400">
                  ₹{inv.gstr2bGst.toLocaleString("en-IN")}
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${inv.statusClass}`}>
                    {inv.badge}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
