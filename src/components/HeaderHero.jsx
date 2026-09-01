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
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function HeaderHero({ onSelectModule }) {
  return (
    <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#0a1628] via-[#071120] to-[#040813] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Mission & Operational Overview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>DEALERSHIP FINANCE OPERATIONS & ACCOUNTS GM SUITE</span>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
              4 Showroom Locations
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Automating Dealership Sales Billing, Financier DOs, OEM Claims & GSTR-2B 3-Way ITC.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
            Eliminating revenue leakages, un-tracked financier subventions, and working capital cash drags across passenger and commercial dealership networks. Engineered by <strong>Amit Ashok Swain</strong> (Head of Finance Operations & Accounts GM) to automate reconciliations, enforce maker-checker gate passes, and deliver real-time unit EBITDA telemetry.
          </p>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-2.5 pt-3">
            <button
              onClick={() => {
                sound.playClick();
                onSelectModule("billing");
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>New Vehicle Tax Bill</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSelectModule("financier");
              }}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
            >
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <span>Financier DO Sync</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSelectModule("gst");
              }}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-emerald-500 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>GSTR-2B 3-Way ITC</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSelectModule("gatepass");
              }}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Gate-Pass Dual-Auth</span>
            </button>
          </div>
        </div>

        {/* Right Column: 4 Real-time Executive Scorecard Tiles */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-1.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Monthly Run-Rate</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-white font-mono">₹12.50 Cr</p>
            <span className="text-[10px] text-slate-400 block">4 Operating Showrooms</span>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-emerald-500/40 hover:border-emerald-400 transition-all space-y-1.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400">Gross Margin Yield</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">₹1.58 Cr</p>
            <span className="text-[10px] text-emerald-300 block">12.7% Blended EBITDA</span>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-amber-500/40 hover:border-amber-400 transition-all space-y-1.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-400">Cash Conversion</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">24 Days</p>
            <span className="text-[10px] text-emerald-400 block">Compressed from 58d</span>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-cyan-500/40 hover:border-cyan-400 transition-all space-y-1.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400">GSTR-2B 3-Way</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">99.98%</p>
            <span className="text-[10px] text-cyan-300 block">0 Reversal Penalties</span>
          </div>
        </div>
      </div>
    </div>
  );
}
