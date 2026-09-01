import { useState } from "react";
import { WORKSHOP_JOB_CARDS } from "../data/dealershipData";
import { sound } from "../utils/sound";
import {
  Wrench,
  Activity,
  CheckCircle2,
  FileSpreadsheet,
  Zap,
  TrendingUp,
} from "lucide-react";

export default function WorkshopServiceBilling() {
  const [jobCards, setJobCards] = useState(WORKSHOP_JOB_CARDS);

  const totalLaborHours = jobCards.reduce((sum, jc) => sum + jc.billedLaborHours, 0);
  const totalLaborRevenue = jobCards.reduce((sum, jc) => sum + jc.billedLaborHours * jc.laborRatePerHour, 0);
  const totalPartsRevenue = jobCards.reduce((sum, jc) => sum + jc.partsTotal, 0);
  const totalPartsMargin = jobCards.reduce((sum, jc) => sum + jc.partsMargin, 0);
  const totalServiceGrossProfit = totalLaborRevenue + totalPartsMargin;

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs mb-1">
          <Wrench className="w-3.5 h-3.5" />
          <span>MODULE 03 // WORKSHOP & SPARES REVENUE AUTOMATION</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          Service Job-Cards, Technician Productivity & Accidental Insurance Claims
        </h3>
        <p className="text-xs text-slate-400">
          Tracking workshop labor billability (18% GST), spare parts gross margin (28% GST), and insurance surveyor claim settlements.
        </p>
      </div>

      {/* Workshop Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Billed Labor Hours</span>
          <p className="text-xl font-extrabold text-white font-mono">{totalLaborHours} Hours</p>
          <span className="text-[10px] text-emerald-400">92% Billability Index</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Labor Billing (18% GST)</span>
          <p className="text-xl font-extrabold text-cyan-400 font-mono">₹{totalLaborRevenue.toLocaleString("en-IN")}</p>
          <span className="text-[10px] text-slate-400">₹850/hr Standard Rate</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Spare Parts Billing</span>
          <p className="text-xl font-extrabold text-purple-400 font-mono">₹{totalPartsRevenue.toLocaleString("en-IN")}</p>
          <span className="text-[10px] text-emerald-400">Margin: ₹{totalPartsMargin.toLocaleString("en-IN")} (26.8%)</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Total Workshop Gross Margin</span>
          <p className="text-xl font-extrabold text-emerald-400 font-mono">₹{totalServiceGrossProfit.toLocaleString("en-IN")}</p>
          <span className="text-[10px] text-emerald-400">High-Yield Department</span>
        </div>
      </div>

      {/* Job Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {jobCards.map((jc) => (
          <div
            key={jc.jobCardNumber}
            className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3.5 text-xs font-mono shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-white font-bold">{jc.jobCardNumber}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-emerald-400 border border-slate-700">
                {jc.status.replace("_", " ")}
              </span>
            </div>

            <div className="font-sans space-y-0.5">
              <p className="font-bold text-slate-200">{jc.customerName}</p>
              <p className="text-slate-400 text-[11px]">{jc.vehicleReg} • {jc.serviceType}</p>
              <p className="text-cyan-400 text-[11px]">Tech: {jc.technicianName}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Labor ({jc.billedLaborHours}h @ ₹{jc.laborRatePerHour}):</span>
                <span className="text-white font-bold">₹{(jc.billedLaborHours * jc.laborRatePerHour).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Spare Parts Total:</span>
                <span className="text-white font-bold">₹{jc.partsTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Parts Gross Margin:</span>
                <span>+₹{jc.partsMargin.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-900">
                <span>Total GST (18% + 28%):</span>
                <span>₹{Math.round(jc.laborGst + jc.partsGst).toLocaleString("en-IN")}</span>
              </div>
              {jc.paymentMode === "INSURANCE_CASHLESS" && (
                <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-cyan-300 mt-1">
                  <strong>Cashless Survey:</strong> Approved ₹{jc.surveyorApprovedAmount.toLocaleString()} by {jc.surveyorCompany}. Excess ₹{jc.customerCompulsoryExcess}.
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800 font-sans">
              <span className="text-slate-400 font-mono text-[11px]">Mode: {jc.paymentMode}</span>
              <span className="font-bold text-emerald-400 font-mono text-sm">
                ₹{Math.round(jc.invoiceTotal).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
