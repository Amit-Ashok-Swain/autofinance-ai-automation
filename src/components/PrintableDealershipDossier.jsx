import { sound } from "../utils/sound";
import { DEALERSHIP_INFO } from "../data/dealershipData";
import { X, Printer, Download, Car, ShieldCheck } from "lucide-react";

export default function PrintableDealershipDossier({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 text-slate-200 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Apex Motors Group — Dealership Finance & Accounts Dossier
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Author: Amit Ashok Swain (Head of Finance Operations & Accounts GM)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4 text-xs font-mono leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-slate-500">Monthly Run-Rate:</span>
              <p className="font-bold text-white">₹12.50 Crore</p>
            </div>
            <div>
              <span className="text-slate-500">Blended Gross Margin:</span>
              <p className="font-bold text-emerald-400">12.7% (₹1.58 Cr)</p>
            </div>
            <div>
              <span className="text-slate-500">Cash Conversion Cycle:</span>
              <p className="font-bold text-amber-400">24 Days</p>
            </div>
            <div>
              <span className="text-slate-500">ITC 3-Way Match:</span>
              <p className="font-bold text-cyan-400">99.98% Accuracy</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm uppercase text-emerald-400">
              1. Dealership Financial Governance Pillars
            </h4>
            <p className="text-slate-300">
              • <strong>Vehicle Sales Billing:</strong> Multi-tier calculation covering Ex-showroom, RTO, Insurance, Accessories (40% margin), Extended Warranty (25% margin), FASTag, and Section 206C(1F) TCS.<br />
              • <strong>Financier Payouts & Subventions:</strong> Tracking loan commissions (1.5% - 3.2%) and eliminating disbursement lags.<br />
              • <strong>Workshop & Spares:</strong> Labor billability index (18% GST) and spare parts inventory gross margin (28% GST).<br />
              • <strong>OEM Scheme Reconciliations:</strong> Quarterly volume target rebates and warranty parts reimbursements cross-matched with zero variance.<br />
              • <strong>Maker-Checker Gate-Pass:</strong> 100% dual-authorization preventing unauthorized vehicle releases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
