import { useState, useRef, useEffect } from "react";
import { sound } from "../utils/sound";
import { Sparkles, Send, Bot, X, RotateCcw } from "lucide-react";

const COPILOT_KB = [
  {
    keywords: ["margin", "profit", "vehicle profit", "yield"],
    answer:
      "Automobile Dealership Margin Breakdown:\n\n1. Base Ex-Showroom Margin: ~5.0% on vehicle price (₹95k - ₹1.27L per unit).\n2. Genuine Accessories Package: 40% margin on retail billing.\n3. Extended Warranty & RSA: 25% margin yield.\n4. Motor Insurance Commission: 15% payout from insurance partners.\n5. Financier Payout Commission: 2.2% - 3.2% on disbursed loan amounts from HDFC/ICICI/Tata Capital.\n\nTotal Gross Unit Yield: ~11.5% - 13.2% per vehicle before dealer discount.",
  },
  {
    keywords: ["gst", "itc", "gstr", "section 17", "206c", "tcs"],
    answer:
      "Automobile GST & Statutory Tax Framework:\n\n• Ex-Showroom: 28% GST + Compensation Cess (0% EV, 1% Commercial, 20-22% SUVs).\n• Workshop Labor: 18% GST with full ITC eligibility.\n• Spare Parts: 28% GST with full ITC eligibility.\n• TCS u/s 206C(1F): Mandatory 1% tax collected on any vehicle sale exceeding ₹10 Lakhs.\n• GSTR-2B 3-Way Reconciliation: Automated Purchase Register matching preventing input credit loss.",
  },
  {
    keywords: ["financier", "do", "delivery order", "payout", "subvention"],
    answer:
      "Financier & DO Management Controls:\n\n1. Strict DO Validation: Delivery Order must specify net loan amount, customer margin money, and hypothecation clause.\n2. Subvention Deductions: Reconcile 0% interest OEM subvention share against dealer commercial incentives.\n3. Payout Aging: Enforce daily follow-ups on bank disbursements older than 7 days.",
  },
  {
    keywords: ["maker checker", "gate pass", "fraud", "security"],
    answer:
      "Maker-Checker Anti-Fraud Architecture:\n\n• Gate Pass Dual-Auth: No chassis exits showroom without 4 verified keys: 1) Cashier receipt, 2) Financier DO, 3) Accounts Maker token, 4) General Manager Checker approval.\n• Segregation of Duties: Billing clerks cannot collect cash; cashiers cannot issue gate passes.",
  },
  {
    keywords: ["working capital", "cash flow", "ccc"],
    answer:
      "Working Capital Strategy (Accounts GM Model):\n\n1. Inventory Holding: Compress from 48 to 22 days to eliminate floor-plan compounding interest.\n2. Financier Lag: Reduce DO realization time from 18 to 4 days.\n3. OEM Claims: Submit warranty and volume rebate claims within 48 hours of period close.\n4. Impact: Unlocks ₹1.42 Crore liquidity across 4 operating locations.",
  },
];

export default function AiFinanceCopilotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am the AutoFinance AI™ Copilot for Apex Motors Group. Ask me anything regarding vehicle margin economics, financier payouts, workshop labor billing, GSTR-2B 3-way reconciliation, or maker-checker gate-pass security.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    sound.playClick();
    const userMsg = input.trim();
    const queryLower = userMsg.toLowerCase();

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    let bestMatch = null;
    let maxMatches = 0;

    for (const item of COPILOT_KB) {
      const count = item.keywords.filter((kw) => queryLower.includes(kw)).length;
      if (count > maxMatches) {
        maxMatches = count;
        bestMatch = item.answer;
      }
    }

    setTimeout(() => {
      sound.playHover();
      const reply =
        bestMatch ||
        "AutoFinance AI™ handles full-cycle dealership accounting: Vehicle Sales Billing, Financier Loan Payouts, Workshop Job-Cards, OEM Warranty/Rebate Claims, GSTR-2B 3-Way ITC, and Maker-Checker Gate-Passes. Please ask about 'margins', 'GST rules', 'financier payouts', or 'working capital'.";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[620px] bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">AutoFinance AI™ Copilot</h3>
              <p className="text-[11px] text-slate-400">Trained on Automobile Accounts & Dealership Finance Governance</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-4 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-semibold"
                    : "bg-slate-950/80 text-slate-200 border border-slate-800 font-mono"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="px-5 py-2 bg-slate-950/40 border-t border-slate-800/80 flex flex-wrap gap-1.5">
          {["Vehicle Margin Yield", "GST & TCS 206C(1F)", "Financier DO Recon", "Gate Pass Dual-Auth"].map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(q);
                sound.playClick();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about dealership margins, GST, DO payouts, or working capital..."
            className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-400 text-xs font-mono"
          />
          <button
            type="submit"
            className="px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs flex items-center justify-center hover:from-emerald-400 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
