import { useState } from "react";
import { INITIAL_DELIVERY_ORDERS } from "../data/dealershipData";
import { sound } from "../utils/sound";
import {
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  FileSpreadsheet,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function FinancierPayoutRecon() {
  const [orders, setOrders] = useState(INITIAL_DELIVERY_ORDERS);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.doNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.vin.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === "all") return true;
    if (filter === "disbursed") return o.status === "DISBURSED";
    if (filter === "pending") return o.status === "PENDING_DISBURSEMENT";
    if (filter === "lag") return o.status === "DISBURSEMENT_LAG";
    return true;
  });

  const handleSyncBankFeed = () => {
    if (isSyncing) return;
    sound.playMilestone();
    setIsSyncing(true);

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((ord) => ({
          ...ord,
          status: "DISBURSED",
          disbursementDate: "2026-09-01",
          agingDays: 0,
        }))
      );
      setIsSyncing(false);
      sound.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10b981", "#3b82f6"],
      });
    }, 1000);
  };

  const totalSanctioned = orders.reduce((sum, o) => sum + o.loanSanctioned, 0);
  const totalDisbursed = orders
    .filter((o) => o.status === "DISBURSED")
    .reduce((sum, o) => sum + o.loanSanctioned, 0);
  const totalPending = totalSanctioned - totalDisbursed;
  const totalCommission = orders.reduce((sum, o) => sum + o.payoutCommission, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>MODULE 02 // FINANCIER & DELIVERY ORDER (DO) RECONCILIATION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Auto Loan Sanction, Payout Commission & Disbursement Aging
          </h3>
          <p className="text-xs text-slate-400">
            Cross-matching retail delivery orders with bank settlement feeds to eliminate financing cash drag.
          </p>
        </div>

        <button
          onClick={handleSyncBankFeed}
          disabled={isSyncing}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? "Syncing Bank Feeds..." : "Sync Bank Settlement Feed"}</span>
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Total Sanctioned Loans</span>
          <p className="text-xl font-extrabold text-white font-mono">₹{(totalSanctioned / 100000).toFixed(2)} L</p>
          <span className="text-[10px] text-slate-400">4 Active DOs</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Disbursed & Realized</span>
          <p className="text-xl font-extrabold text-emerald-400 font-mono">₹{(totalDisbursed / 100000).toFixed(2)} L</p>
          <span className="text-[10px] text-emerald-400">100% In Bank Account</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Pending Bank Payout</span>
          <p className="text-xl font-extrabold text-amber-400 font-mono">₹{(totalPending / 100000).toFixed(2)} L</p>
          <span className="text-[10px] text-amber-300">Aging &gt; 7 Days</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-1">
          <span className="text-[11px] font-mono text-slate-400">Dealer Payout Commission</span>
          <p className="text-xl font-extrabold text-purple-400 font-mono">₹{totalCommission.toLocaleString("en-IN")}</p>
          <span className="text-[10px] text-slate-400">Avg 2.4% Payout</span>
        </div>
      </div>

      {/* Filter & Table Bar */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setFilter("all");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                filter === "all" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter("disbursed");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                filter === "disbursed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Disbursed (2)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter("pending");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                filter === "pending" ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Pending (1)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter("lag");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                filter === "lag" ? "bg-rose-500/20 text-rose-400 border border-rose-500/40" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Disbursement Lag (1)
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search DO, Customer, VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">DO Number / Date</th>
                <th className="p-3.5 font-sans">Customer & Vehicle</th>
                <th className="p-3.5">Financier / Loan (₹)</th>
                <th className="p-3.5 text-right">Payout Comm.</th>
                <th className="p-3.5 text-center">Status & Aging</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredOrders.map((ord) => (
                <tr key={ord.doNumber} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3.5">
                    <p className="font-bold text-white">{ord.doNumber}</p>
                    <span className="text-[10px] text-slate-500">{ord.invoiceDate}</span>
                  </td>
                  <td className="p-3.5 font-sans">
                    <p className="font-semibold text-slate-200">{ord.customerName}</p>
                    <span className="text-[11px] text-slate-400 block">{ord.vehicleModel}</span>
                    <span className="text-[10px] text-slate-500 font-mono">VIN: {ord.vin}</span>
                  </td>
                  <td className="p-3.5">
                    <p className="text-white font-semibold">{ord.financierName}</p>
                    <span className="text-cyan-400 font-bold">₹{ord.loanSanctioned.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-slate-500 block">Margin: ₹{ord.marginMoneyReceived.toLocaleString("en-IN")}</span>
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-400">
                    +₹{ord.payoutCommission.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        ord.status === "DISBURSED"
                          ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/30"
                          : ord.status === "PENDING_DISBURSEMENT"
                          ? "bg-amber-950/60 text-amber-400 border-amber-500/30"
                          : "bg-rose-950/60 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {ord.status.replace("_", " ")} ({ord.agingDays}d)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
