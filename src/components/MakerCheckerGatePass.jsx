import { useState } from "react";
import { sound } from "../utils/sound";
import {
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Printer,
  FileCheck,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function MakerCheckerGatePass() {
  const [step1Downpayment, setStep1Downpayment] = useState(true);
  const [step2BankDo, setStep2BankDo] = useState(true);
  const [step3MakerSign, setStep3MakerSign] = useState(true);
  const [step4GmApproval, setStep4GmApproval] = useState(false);
  const [gatePassGenerated, setGatePassGenerated] = useState(false);

  const isAllApproved = step1Downpayment && step2BankDo && step3MakerSign && step4GmApproval;

  const handleIssueGatePass = () => {
    if (!isAllApproved) return;
    sound.playMilestone();
    setGatePassGenerated(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#f59e0b", "#06b6d4"],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MODULE 06 // ANTI-FRAUD & GATE-PASS DUAL-AUTHORIZATION</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          Maker-Checker Vehicle Release & Security Gate-Pass Generator
        </h3>
        <p className="text-xs text-slate-400">
          Enforces segregation of duties: No vehicle exits showroom without customer downpayment receipt, confirmed financier DO, and General Manager digital signature.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Checklist */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>4-Step Dual-Authorization Checklist</span>
          </h4>

          <div className="space-y-3 text-xs">
            <label className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={step1Downpayment}
                onChange={(e) => {
                  sound.playClick();
                  setStep1Downpayment(e.target.checked);
                }}
                className="mt-0.5 rounded accent-emerald-500 cursor-pointer"
              />
              <div>
                <span className="font-bold text-white block">Step 01: Customer Downpayment Verified</span>
                <span className="text-slate-400 text-[11px]">POS Card / Cash receipt credited to company ledger.</span>
              </div>
            </label>

            <label className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={step2BankDo}
                onChange={(e) => {
                  sound.playClick();
                  setStep2BankDo(e.target.checked);
                }}
                className="mt-0.5 rounded accent-emerald-500 cursor-pointer"
              />
              <div>
                <span className="font-bold text-white block">Step 02: Bank Delivery Order (DO) Validated</span>
                <span className="text-slate-400 text-[11px]">Confirmed DO #DO-HDFC-9921 from financier received.</span>
              </div>
            </label>

            <label className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={step3MakerSign}
                onChange={(e) => {
                  sound.playClick();
                  setStep3MakerSign(e.target.checked);
                }}
                className="mt-0.5 rounded accent-emerald-500 cursor-pointer"
              />
              <div>
                <span className="font-bold text-white block">Step 03: Accounts Maker Token Signed</span>
                <span className="text-slate-400 text-[11px]">Billing officer verified invoice totals and tax codes.</span>
              </div>
            </label>

            <label className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={step4GmApproval}
                onChange={(e) => {
                  sound.playClick();
                  setStep4GmApproval(e.target.checked);
                }}
                className="mt-0.5 rounded accent-emerald-500 cursor-pointer"
              />
              <div>
                <span className="font-bold text-emerald-400 block">Step 04: General Manager (Checker) Final Approval</span>
                <span className="text-slate-400 text-[11px]">Amit Ashok Swain (Accounts GM) multi-factor release token.</span>
              </div>
            </label>
          </div>

          <button
            onClick={handleIssueGatePass}
            disabled={!isAllApproved}
            className={`w-full py-3 rounded-2xl font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAllApproved
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Generate Digital Gate-Pass</span>
          </button>
        </div>

        {/* Generated Gate-Pass Display */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">DIGITAL SECURITY TOKEN</span>
              <h4 className="font-bold text-white text-sm">Official Showroom Exit Gate-Pass</h4>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {gatePassGenerated ? "PASS ISSUED ✓" : "AWAITING AUTH"}
            </span>
          </div>

          {gatePassGenerated ? (
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-[10px]">GATE PASS NUMBER:</p>
                  <p className="text-base font-extrabold text-white font-mono">GP-2026-08991</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
              </div>

              <div className="space-y-1 text-slate-300 text-[11px] pt-2 border-t border-slate-900">
                <p><strong>Customer:</strong> Dr. Vikram Malhotra</p>
                <p><strong>Vehicle:</strong> Apex Electric Stealth EV (Empowered+)</p>
                <p><strong>Chassis / VIN:</strong> ME4JF50EV20268491</p>
                <p><strong>Downpayment (POS):</strong> ₹3,61,000 [Receipt #48291]</p>
                <p><strong>Financier DO:</strong> ₹17,00,000 [HDFC Bank Auto Finance]</p>
                <p className="text-emerald-400 font-bold mt-2">
                  &gt;&gt; AUTHORIZED BY: AMIT ASHOK SWAIN (ACCOUNTS GM)
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2 text-slate-400">
              <ShieldCheck className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-xs">Complete all 4 verification steps on the left to issue digital gate pass.</p>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => window.print()}
              disabled={!gatePassGenerated}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Security Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
