import { useState, useMemo } from "react";
import { VEHICLE_MODELS, FINANCIER_PARTNERS } from "../data/dealershipData";
import { sound } from "../utils/sound";
import {
  Car,
  Calculator,
  Receipt,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function VehicleBillingStudio({ onInvoiceGenerated }) {
  const [selectedModelId, setSelectedModelId] = useState(VEHICLE_MODELS[0].id);
  const [customerName, setCustomerName] = useState("Vikramaditya Roy");
  const [customerPhone, setCustomerPhone] = useState("+91-9820199882");
  const [selectedFinancierId, setSelectedFinancierId] = useState(FINANCIER_PARTNERS[0].id);
  const [dealerDiscount, setDealerDiscount] = useState(15000);
  const [includeAccessories, setIncludeAccessories] = useState(true);
  const [includeWarranty, setIncludeWarranty] = useState(true);
  const [loanAmount, setLoanAmount] = useState(1600000);

  const model = VEHICLE_MODELS.find((m) => m.id === selectedModelId) || VEHICLE_MODELS[0];
  const financier = FINANCIER_PARTNERS.find((f) => f.id === selectedFinancierId) || FINANCIER_PARTNERS[0];

  const calculations = useMemo(() => {
    const exShowroom = model.baseExShowroom;
    const gstAmount = exShowroom * model.gstRate;
    const cessAmount = exShowroom * model.cessRate;
    const rtoTax = exShowroom * model.rtoPercent;
    const insurance = model.insuranceBase;
    const accessories = includeAccessories ? model.mandatoryAccessories : 0;
    const warranty = includeWarranty ? model.extendedWarranty : 0;
    const fastag = model.fastag;

    // TCS 206C(1F): 1% if invoice consideration exceeds Rs 10,00,000
    const grossConsideration = exShowroom + accessories;
    const tcsApplicable = grossConsideration > 1000000;
    const tcsAmount = tcsApplicable ? grossConsideration * 0.01 : 0;

    const onRoadTotal =
      exShowroom +
      rtoTax +
      insurance +
      accessories +
      warranty +
      fastag +
      tcsAmount -
      dealerDiscount;

    const marginMoney = Math.max(0, onRoadTotal - loanAmount);
    const payoutCommission = loanAmount * financier.commissionRate;
    const subventionCost = loanAmount * financier.subventionShare;

    // Net Dealership Profit Breakdown
    const accessoriesMargin = accessories * 0.4; // 40% margin on accessories
    const warrantyMargin = warranty * 0.25; // 25% margin on extended warranty
    const insuranceCommission = insurance * 0.15; // 15% payout from insurer

    const totalDealershipProfit =
      model.dealerBaseMargin +
      accessoriesMargin +
      warrantyMargin +
      insuranceCommission +
      payoutCommission -
      dealerDiscount -
      subventionCost;

    const profitPercentage = ((totalDealershipProfit / exShowroom) * 100).toFixed(2);

    return {
      exShowroom,
      gstAmount,
      cessAmount,
      rtoTax,
      insurance,
      accessories,
      warranty,
      fastag,
      tcsAmount,
      tcsApplicable,
      onRoadTotal,
      marginMoney,
      payoutCommission,
      subventionCost,
      accessoriesMargin,
      warrantyMargin,
      insuranceCommission,
      totalDealershipProfit,
      profitPercentage,
    };
  }, [
    model,
    financier,
    dealerDiscount,
    includeAccessories,
    includeWarranty,
    loanAmount,
  ]);

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    sound.playMilestone();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#10b981", "#06b6d4", "#f59e0b"],
    });

    if (onInvoiceGenerated) {
      onInvoiceGenerated({
        customerName,
        model: model.name,
        onRoadTotal: calculations.onRoadTotal,
        profit: calculations.totalDealershipProfit,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>MODULE 01 // VEHICLE SALES & MARGIN ENGINE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Vehicle Tax Invoice & Commercial Profit Calculator
          </h3>
          <p className="text-xs text-slate-400">
            Real-time margin computation including GST, RTO, Insurance payout, Financier subvention, and Section 206C(1F) TCS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Vehicle & Financing Config */}
        <form
          onSubmit={handleGenerateInvoice}
          className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl backdrop-blur-xl"
        >
          <div className="space-y-3">
            <label className="text-xs font-mono text-slate-300 font-semibold block">
              Select Vehicle Chassis & Model:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {VEHICLE_MODELS.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedModelId(m.id);
                    setLoanAmount(Math.round(m.baseExShowroom * 0.8));
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedModelId === m.id
                      ? "bg-emerald-500/20 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <p className="text-xs leading-snug">{m.name}</p>
                  <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                    ₹{(m.baseExShowroom / 100000).toFixed(2)} Lakhs
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">Customer Full Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">Customer Contact:</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-semibold">Select Auto Loan Partner:</label>
            <select
              value={selectedFinancierId}
              onChange={(e) => {
                sound.playClick();
                setSelectedFinancierId(e.target.value);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
            >
              {FINANCIER_PARTNERS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} — Payout: {(f.commissionRate * 100).toFixed(1)}% | Subvention: {(f.subventionShare * 100).toFixed(1)}%
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">Sanctioned Loan (₹):</label>
              <input
                type="number"
                value={loanAmount}
                step="50000"
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">Dealer Discount Given (₹):</label>
              <input
                type="number"
                value={dealerDiscount}
                step="1000"
                onChange={(e) => setDealerDiscount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAccessories}
                onChange={(e) => setIncludeAccessories(e.target.checked)}
                className="rounded accent-emerald-500 cursor-pointer"
              />
              <span>Accessories Kit (₹{model.mandatoryAccessories.toLocaleString()})</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeWarranty}
                onChange={(e) => setIncludeWarranty(e.target.checked)}
                className="rounded accent-emerald-500 cursor-pointer"
              />
              <span>Extended Warranty (₹{model.extendedWarranty.toLocaleString()})</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Lock Margin & Generate Tax Invoice</span>
          </button>
        </form>

        {/* Right Panel: Live Tax Invoice & Margin Telemetry */}
        <div className="lg:col-span-6 space-y-5">
          {/* Top Dealership Profit Scorecard */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Net Dealership Profit per Unit
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1 font-mono">
                  ₹{Math.round(calculations.totalDealershipProfit).toLocaleString("en-IN")}
                </div>
                <span className="text-xs text-slate-300 font-mono">
                  {calculations.profitPercentage}% Net Ex-Showroom Yield
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-800/80 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-mono">Base Margin</span>
                <p className="font-mono font-bold text-white mt-0.5">
                  ₹{model.dealerBaseMargin.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-mono">Financier Payout</span>
                <p className="font-mono font-bold text-cyan-400 mt-0.5">
                  +₹{Math.round(calculations.payoutCommission).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 font-mono">VAS & Add-ons</span>
                <p className="font-mono font-bold text-amber-400 mt-0.5">
                  +₹{Math.round(calculations.accessoriesMargin + calculations.warrantyMargin + calculations.insuranceCommission).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* On-Road Price & Statutory Tax Invoice Breakdown */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3.5 text-xs shadow-xl font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-white text-sm">Automobile Tax Invoice Summary</h4>
              </div>
              <span className="text-[10px] text-slate-400">HSN: 8703</span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">1. Base Ex-Showroom (incl GST {model.gstRate * 100}% + Cess {model.cessRate * 100}%):</span>
                <span className="font-bold text-white">₹{calculations.exShowroom.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">2. RTO Registration Tax ({model.rtoPercent * 100}%):</span>
                <span>₹{Math.round(calculations.rtoTax).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">3. Comprehensive Motor Insurance (1+3 Yr):</span>
                <span>₹{calculations.insurance.toLocaleString("en-IN")}</span>
              </div>
              {includeAccessories && (
                <div className="flex justify-between">
                  <span className="text-slate-400">4. Genuine Accessories Package (28% GST):</span>
                  <span>₹{calculations.accessories.toLocaleString("en-IN")}</span>
                </div>
              )}
              {includeWarranty && (
                <div className="flex justify-between">
                  <span className="text-slate-400">5. Extended Warranty Program (18% GST):</span>
                  <span>₹{calculations.warranty.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">6. FASTag & Registration Handling:</span>
                <span>₹{calculations.fastag.toLocaleString("en-IN")}</span>
              </div>
              {calculations.tcsApplicable && (
                <div className="flex justify-between text-amber-400">
                  <span>7. TCS u/s 206C(1F) @ 1% (&gt; ₹10 Lakhs):</span>
                  <span>+₹{Math.round(calculations.tcsAmount).toLocaleString("en-IN")}</span>
                </div>
              )}
              {dealerDiscount > 0 && (
                <div className="flex justify-between text-rose-400">
                  <span>8. Approved Dealer Festive Discount:</span>
                  <span>-₹{dealerDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-emerald-400 bg-slate-950/80 p-3 rounded-xl">
                <span>Total On-Road Customer Price:</span>
                <span>₹{Math.round(calculations.onRoadTotal).toLocaleString("en-IN")}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Customer Margin Money (Cash/POS):</span>
                  <span className="font-bold text-white">₹{Math.round(calculations.marginMoney).toLocaleString("en-IN")}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Financier Disbursed DO:</span>
                  <span className="font-bold text-cyan-400">₹{loanAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
