import { useState, useMemo } from "react";
import { sound } from "../utils/sound";
import {
  TrendingUp,
  Sliders,
  RotateCcw,
  Zap,
  Boxes,
  DollarSign,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CashFlowWorkingCapital() {
  const [inventoryDays, setInventoryDays] = useState(48);
  const [financierLag, setFinancierLag] = useState(18);
  const [oemClaimsLag, setOemClaimsLag] = useState(45);
  const [sparesTurnDays, setSparesTurnDays] = useState(75);

  const metrics = useMemo(() => {
    const monthlyPrimary = 38500000;
    const monthlySpares = 4200000;
    const dailyPrimary = monthlyPrimary / 30;
    const dailySpares = monthlySpares / 30;

    const inventoryLocked = dailyPrimary * inventoryDays;
    const receivablesLocked = (dailyPrimary * 0.75) * (financierLag / 30) * 30;
    const claimsLocked = 1200000 * (oemClaimsLag / 30);
    const sparesLocked = dailySpares * sparesTurnDays;

    const totalLocked = inventoryLocked + receivablesLocked + claimsLocked + sparesLocked;
    const baselineLocked = 42500000; // Baseline ₹4.25 Cr
    const cashReleased = Math.max(0, baselineLocked - totalLocked);

    const dso = Math.round(financierLag * 0.7 + oemClaimsLag * 0.3);
    const dio = Math.round(inventoryDays * 0.75 + sparesTurnDays * 0.25);
    const dpo = 24;
    const ccc = Math.max(12, dso + dio - dpo);
    const monthlyInterestSaved = (cashReleased * 0.115) / 12;

    return {
      totalLocked,
      cashReleased,
      ccc,
      monthlyInterestSaved,
    };
  }, [inventoryDays, financierLag, oemClaimsLag, sparesTurnDays]);

  const handleApplyStrategy = () => {
    sound.playMilestone();
    setInventoryDays(22);
    setFinancierLag(4);
    setOemClaimsLag(12);
    setSparesTurnDays(32);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#06b6d4", "#f59e0b"],
    });
  };

  const handleReset = () => {
    sound.playClick();
    setInventoryDays(48);
    setFinancierLag(18);
    setOemClaimsLag(45);
    setSparesTurnDays(75);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>MODULE 07 // WORKING CAPITAL & CASH CONVERSION CYCLE (CCC)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            13-Week Cash Flow & Dealership Liquidity Diagnostic Engine
          </h3>
          <p className="text-xs text-slate-400">
            Simulate how optimizing inventory dwell time, financier DO collection, and OEM claim recovery releases crores in cash.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyStrategy}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Apply 5-Point GM Strategy</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sliders */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
          <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Operational Working Capital Levers</span>
          </h4>

          {/* Slider 1 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-amber-400" />
                Vehicle Stock Dwell Time (Days)
              </span>
              <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">
                {inventoryDays} Days
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="60"
              value={inventoryDays}
              onChange={(e) => {
                sound.playHover();
                setInventoryDays(Number(e.target.value));
              }}
              className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 2 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Financier Bank Settlement Lag (Days)
              </span>
              <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                {financierLag} Days
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="30"
              value={financierLag}
              onChange={(e) => {
                sound.playHover();
                setFinancierLag(Number(e.target.value));
              }}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 3 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-cyan-400" />
                OEM Incentive & Warranty Claim Lag
              </span>
              <span className="font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded">
                {oemClaimsLag} Days
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={oemClaimsLag}
              onChange={(e) => {
                sound.playHover();
                setOemClaimsLag(Number(e.target.value));
              }}
              className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 4 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-purple-400" />
                Spare Parts Holding Period
              </span>
              <span className="font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded">
                {sparesTurnDays} Days
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="120"
              value={sparesTurnDays}
              onChange={(e) => {
                sound.playHover();
                setSparesTurnDays(Number(e.target.value));
              }}
              className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl space-y-4">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Total Liquidity Unlocked
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono">
              ₹{(metrics.cashReleased / 100000).toFixed(2)} Lakhs
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {metrics.cashReleased > 5000000
                ? "🚀 Outstanding! Working capital optimized. Zero avoidable overdraft borrowing."
                : "⚡ Adjust levers to compress the Cash Conversion Cycle."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-[10px]">Cash Conversion Cycle</span>
                <p className="text-base font-bold text-amber-400 mt-0.5">{metrics.ccc} Days</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 text-[10px]">Monthly Interest Saved</span>
                <p className="text-base font-bold text-emerald-400 mt-0.5">₹{(metrics.monthlyInterestSaved / 1000).toFixed(1)}k/mo</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 text-[10px]">Working Capital Required</span>
                <p className="text-base font-bold text-cyan-400 mt-0.5">₹{(metrics.totalLocked / 10000000).toFixed(2)} Cr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
