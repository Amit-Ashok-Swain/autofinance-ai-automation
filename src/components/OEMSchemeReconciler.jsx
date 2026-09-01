import { useState } from "react";
import { OEM_RECONCILIATION_CLAIMS } from "../data/dealershipData";
import { sound } from "../utils/sound";
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Play,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function OEMSchemeReconciler() {
  const [claims, setClaims] = useState(OEM_RECONCILIATION_CLAIMS);
  const [isCrossMatching, setIsCrossMatching] = useState(false);

  const handleCrossMatch = () => {
    if (isCrossMatching) return;
    sound.playMilestone();
    setIsCrossMatching(true);

    setTimeout(() => {
      setClaims((prev) =>
        prev.map((c) => ({
          ...c,
          status: "MATCHED",
          oemApprovedAmount: c.internalClaimAmount,
          variance: 0,
          reconciledDate: "2026-09-01",
        }))
      );
      setIsCrossMatching(false);
      sound.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10b981", "#f59e0b"],
      });
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>MODULE 04 // OEM CLAIMS & REBATE RECONCILIATION ENGINE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Warranty Reimbursements, Volume Target Rebates & Co-op Marketing Claims
          </h3>
          <p className="text-xs text-slate-400">
            Cross-matches dealer claim sub-ledgers against OEM credit notes to eliminate disputed deductions.
          </p>
        </div>

        <button
          onClick={handleCrossMatch}
          disabled={isCrossMatching}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-orange-500 transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>{isCrossMatching ? "Cross-Matching Claims..." : "Execute AI Scheme Cross-Match"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {claims.map((claim) => (
          <div
            key={claim.claimId}
            className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-xl text-xs font-mono"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="font-bold text-white">{claim.claimId}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  claim.status === "MATCHED"
                    ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/30"
                    : "bg-rose-950/60 text-rose-400 border-rose-500/30"
                }`}
              >
                {claim.status.replace("_", " ")}
              </span>
            </div>

            <div className="font-sans">
              <h4 className="font-bold text-slate-200 text-sm">{claim.type}</h4>
              <p className="text-slate-400 text-xs">{claim.period}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Dealer Claim Amount:</span>
                <span className="font-bold text-white">₹{claim.internalClaimAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">OEM Approved Credit Note:</span>
                <span className="font-bold text-emerald-400">₹{claim.oemApprovedAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Credit Note Reference:</span>
                <span className="text-cyan-400">{claim.oemCreditNoteNo}</span>
              </div>
              {claim.variance > 0 && (
                <div className="p-2 rounded bg-rose-950/50 border border-rose-500/30 text-rose-300 text-[10px] mt-1">
                  <strong>Variance Detected:</strong> ₹{claim.variance.toLocaleString()} discrepancy. {claim.reason}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
