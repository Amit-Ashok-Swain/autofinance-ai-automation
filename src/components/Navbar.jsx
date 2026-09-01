import { useState, useEffect } from "react";
import { sound } from "../utils/sound";
import {
  Car,
  Sparkles,
  ShieldCheck,
  Receipt,
  TrendingUp,
  Volume2,
  VolumeX,
  FileText,
  Building2,
  DollarSign,
  Wrench,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, onOpenAiModal, onOpenDossier }) {
  const [time, setTime] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { id: "billing", label: "Billing", keyNum: "1", icon: Car },
    { id: "financier", label: "Financier", keyNum: "2", icon: DollarSign },
    { id: "workshop", label: "Workshop", keyNum: "3", icon: Wrench },
    { id: "oem", label: "OEM Rebates", keyNum: "4", icon: Building2 },
    { id: "gst", label: "GST 3-Way", keyNum: "5", icon: Receipt },
    { id: "gatepass", label: "Gate-Pass", keyNum: "6", icon: ShieldCheck },
    { id: "capital", label: "Cash Flow", keyNum: "7", icon: TrendingUp },
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
    <header className="sticky top-0 z-50 bg-[#060b14]/95 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl w-full">
      {/* Top Telemetry Strip (Visible on Desktop) */}
      <div className="hidden xl:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1 bg-[#03070f] border-b border-slate-900 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TELEMETRY: 4 DEALERSHIP HUBS ONLINE
          </span>
          <span className="text-slate-700">•</span>
          <span>FY 2026-27 Q2</span>
          <span className="text-slate-700">•</span>
          <span className="text-cyan-400">RUN-RATE: ₹12.50 CR/MO</span>
        </div>
        <div className="flex items-center gap-3">
          <span>SHORTCUTS: <kbd className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-800">1-7</kbd> MODULES • <kbd className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-800">⌘K</kbd> COPILOT</span>
          <span className="text-slate-700">•</span>
          <span className="text-amber-400 font-bold">{time} IST</span>
        </div>
      </div>

      {/* Main Bar (Single Clean Row across all devices, zero sub-bars) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-amber-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#071120] rounded-[14px] flex items-center justify-center text-emerald-400">
              <Car className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="font-black text-white text-sm sm:text-base tracking-tight font-sans">
                AUTOFINANCE <span className="text-emerald-400 font-mono text-xs sm:text-sm">AI™</span>
              </h1>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                DEALERSHIP OS
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono hidden md:block">
              Apex Motors Group • Amit Ashok Swain (Accounts GM)
            </p>
          </div>
        </div>

        {/* Center Segmented Nav Tabs (Desktop: lg and up) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#091122] p-1 rounded-2xl border border-slate-800/90 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-950" : "text-emerald-400"}`} />
                <span>{item.label}</span>
                <span className={`text-[9px] font-mono px-1 py-0.2 rounded ml-0.5 ${isActive ? "bg-slate-950/30 text-slate-950 font-black" : "text-slate-500"}`}>
                  {item.keyNum}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Active Module Pill (Visible on < lg) */}
        <button
          onClick={() => {
            sound.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="flex lg:hidden items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="capitalize">{activeTab}</span>
          <span className="text-[10px] text-slate-500">▾</span>
        </button>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playMilestone();
              onOpenAiModal();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/30 text-xs font-bold transition-all shadow-md shadow-emerald-500/10 cursor-pointer h-9 sm:h-10"
            title="Dealership AI Copilot (⌘K)"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">AI Copilot</span>
            <span className="sm:hidden">AI</span>
            <kbd className="hidden xl:inline text-[9px] font-mono bg-emerald-950/80 px-1.5 py-0.5 rounded text-emerald-400 border border-emerald-500/30">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenDossier();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono transition-all cursor-pointer h-9 sm:h-10"
            title="Export Dealership Dossier (⌘D)"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Dossier</span>
          </button>

          <button
            onClick={handleToggleMute}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center"
            title={isMuted ? "Unmute Sound (M)" : "Mute Sound (M)"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all cursor-pointer h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Clean Full-Width Mobile/Tablet Drawer (< lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-500/20 bg-[#050a14] p-4 space-y-3 shadow-2xl animate-fadeIn max-w-full overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1 border-b border-slate-800 pb-2">
            <span>DEALERSHIP FINANCE MODULES</span>
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
                      : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActive ? "bg-emerald-500 text-slate-950" : "bg-slate-950 text-emerald-400 border border-slate-800"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs">{item.label}</p>
                      <span className="text-[10px] text-slate-400 font-mono">Module 0{item.keyNum}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-slate-500">[{item.keyNum}]</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenDossier();
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Dealership Dossier PDF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
