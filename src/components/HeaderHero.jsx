import { sound } from "../utils/sound";
import {
  TrendingUp,
  ShieldCheck,
  Receipt,
  Building2,
  DollarSign,
  Car,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function HeaderHero({ onSelectModule }) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#071120] to-slate-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AI AUTOMATION FOR AUTOMOBILE DEALERSHIP ACCOUNTS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            Automating Dealership Sales Billing, Financier Payouts, OEM Claims & GSTR-2B 3-Way ITC.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
            Eliminating revenue leakages and working capital bottlenecks across 4 dealership operating units. Engineered by <strong>Amit Ashok Swain</strong> (Head of Finance Operations) to automate reconciliation, enforce maker-checker gate passes, and deliver real-time unit EBITDA telemetry.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onSelectModule("billing");
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>New Vehicle Bill</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSelectModule("gst");
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>GSTR-2B 3-Way Match</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSelectModule("gatepass");
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Gate-Pass Dual-Auth</span>
            </button>
          </div>
        </div>

        {/* 4 Real-time Scorecard Tiles */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400">Monthly Revenue Run-Rate</span>
            <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">₹12.50 Cr</p>
            <span className="text-[10px] text-emerald-400 font-medium">4 Operating Locations</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-1">
            <span className="text-[11px] font-mono text-slate-400">Gross Dealership Margin</span>
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">₹1.58 Cr</p>
            <span className="text-[10px] text-slate-400">12.7% Blended Margin</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-1">
            <span className="text-[11px] font-mono text-slate-400">Cash Conversion Cycle</span>
            <p className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">24 Days</p>
            <span className="text-[10px] text-emerald-400">Compressed from 58d</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-1">
            <span className="text-[11px] font-mono text-slate-400">GSTR-2B ITC Accuracy</span>
            <p className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono">99.98%</p>
            <span className="text-[10px] text-cyan-300">0 Reversal Penalties</span>
          </div>
        </div>
      </div>
    </div>
  );
}
