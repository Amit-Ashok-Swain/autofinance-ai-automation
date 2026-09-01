import { useState, useEffect, useRef } from "react";
import { sound } from "../utils/sound";
import {
  Car,
  Sparkles,
  ShieldCheck,
  Receipt,
  FileSpreadsheet,
  TrendingUp,
  Volume2,
  VolumeX,
  FileText,
  Building2,
  DollarSign,
  Wrench,
  Zap,
  Menu,
  X,
  Keyboard,
  ChevronRight,
  Activity,
  Layers,
} from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, onOpenAiModal, onOpenDossier }) {
  const [time, setTime] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollNavRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "billing", label: "Vehicle Billing", keyNum: "1", icon: Car, tag: "Sales & Margins" },
    { id: "financier", label: "Financier Recon", keyNum: "2", icon: DollarSign, tag: "DO Settlements" },
    { id: "workshop", label: "Workshop & Spares", keyNum: "3", icon: Wrench, tag: "Job-Cards & Spares" },
    { id: "oem", label: "OEM Claims", keyNum: "4", icon: Building2, tag: "Volume Rebates" },
    { id: "gst", label: "GST 3-Way ITC", keyNum: "5", icon: Receipt, tag: "GSTR-2B Match" },
    { id: "gatepass", label: "Gate-Pass Dual-Auth", keyNum: "6", icon: ShieldCheck, tag: "Security Release" },
    { id: "capital", label: "Working Capital", keyNum: "7", icon: TrendingUp, tag: "13-Wk Cash Flow" },
  ];

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleSelectTab = (tabId) => {
    sound.playClick();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050911]/95 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl transition-all">
      {/* Top Telemetry Ticker Bar (Desktop) */}
      <div className="hidden md:flex items-center justify-between px-4 sm:px-8 py-1 bg-slate-950/90 border-b border-slate-800/60 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TELEMETRY: 4 DEALERSHIP HUBS ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span>FY 2026-27 Q2 ACTIVE</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">MONTHLY RUN-RATE: ₹12.50 CR</span>
        </div>
        <div className="flex items-center gap-3">
          <span>SHORTCUTS: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">1-7</kbd> MODULES • <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">⌘K</kbd> COPILOT</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-bold">{time} IST</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo & Dealership Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-amber-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#071120] rounded-[14px] flex items-center justify-center text-emerald-400">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-white text-base sm:text-lg tracking-tight font-sans">
                AUTOFINANCE <span className="text-emerald-400 font-mono text-sm sm:text-base">AI™</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ENTERPRISE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden md:block">
              Apex Motors Group • Amit Ashok Swain (Accounts GM)
            </p>
          </div>
        </div>

        {/* Desktop Tab Selector */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25 scale-[1.02]"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                <span>{item.label}</span>
                <span className={`text-[10px] font-mono px-1 py-0.2 rounded ml-0.5 ${isActive ? "bg-slate-950/30 text-slate-950 font-black" : "text-slate-500"}`}>
                  {item.keyNum}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls (Copilot, Dossier, Sound, Mobile Menu) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* AI Copilot Button */}
          <button
            onClick={() => {
              sound.playMilestone();
              onOpenAiModal();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/30 text-xs font-bold transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
            title="Dealership AI Financial Advisor (⌘K)"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">AI Copilot</span>
            <span className="sm:hidden">Copilot</span>
            <kbd className="hidden lg:inline text-[9px] font-mono bg-emerald-950/80 px-1.5 py-0.5 rounded text-emerald-400 border border-emerald-500/30">
              ⌘K
            </kbd>
          </button>

          {/* Dossier Report */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenDossier();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono transition-all cursor-pointer shadow-sm"
            title="Export Board Dossier (⌘D)"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Dossier</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer shadow-sm"
            title={isMuted ? "Unmute Synthetic Feedback (M)" : "Mute Sound (M)"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Mobile Hamburger Drawer Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Smooth Touch-Scrollable Tab Bar (Medium Screens & Mobile) */}
      <div className="xl:hidden border-t border-slate-800/80 bg-slate-950/90 px-3 py-2 overflow-x-auto scrollbar-none">
        <div ref={scrollNavRef} className="flex items-center gap-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25"
                    : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-950" : "text-emerald-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-emerald-500/20 bg-[#071120] p-4 space-y-3 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1 border-b border-slate-800 pb-2">
            <span>AUTOMOBILE FINANCE MODULES</span>
            <span className="text-emerald-400">AMIT ASHOK SWAIN (GM)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-500/20 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActive ? "bg-emerald-500 text-slate-950" : "bg-slate-900 text-emerald-400"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs">{item.label}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{item.tag}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-slate-500">[{item.keyNum}]</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenDossier();
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Executive Board Dossier</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
