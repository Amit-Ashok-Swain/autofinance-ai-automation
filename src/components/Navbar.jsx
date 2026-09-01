import { useState, useEffect } from "react";
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
} from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, onOpenAiModal, onOpenDossier }) {
  const [time, setTime] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "billing", label: "Vehicle Billing", icon: Car },
    { id: "financier", label: "Financier Recon", icon: DollarSign },
    { id: "workshop", label: "Workshop & Spares", icon: Wrench },
    { id: "oem", label: "OEM Claims", icon: Building2 },
    { id: "gst", label: "GST 3-Way ITC", icon: Receipt },
    { id: "gatepass", label: "Gate-Pass Security", icon: ShieldCheck },
    { id: "capital", label: "Working Capital", icon: TrendingUp },
  ];

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050911]/90 backdrop-blur-xl border-b border-emerald-500/20 px-4 sm:px-8 py-3.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-white text-base tracking-tight">
                AUTOFINANCE <span className="text-emerald-400 font-mono">AI™</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hidden sm:inline-block">
                DEALERSHIP AUTOMATION
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden md:block">
              Apex Motors Group • Amit Ashok Swain (Accounts GM)
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playMilestone();
              onOpenAiModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>AI Copilot</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenDossier();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-all cursor-pointer"
            title="Export Dealership Financial Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Executive Dossier</span>
          </button>

          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all cursor-pointer"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <div className="hidden lg:flex items-center gap-1 font-mono text-[11px] text-slate-400 px-2 py-1 bg-slate-900 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
            <span>{time} IST</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex xl:hidden overflow-x-auto gap-1.5 pt-3 mt-2 border-t border-slate-800/60 pb-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
