import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeaderHero from "./components/HeaderHero";
import VehicleBillingStudio from "./components/VehicleBillingStudio";
import FinancierPayoutRecon from "./components/FinancierPayoutRecon";
import WorkshopServiceBilling from "./components/WorkshopServiceBilling";
import OEMSchemeReconciler from "./components/OEMSchemeReconciler";
import GST3WayRecon from "./components/GST3WayRecon";
import MakerCheckerGatePass from "./components/MakerCheckerGatePass";
import CashFlowWorkingCapital from "./components/CashFlowWorkingCapital";
import AiFinanceCopilotModal from "./components/AiFinanceCopilotModal";
import PrintableDealershipDossier from "./components/PrintableDealershipDossier";
import { sound } from "./utils/sound";

export default function App() {
  const [activeTab, setActiveTab] = useState("billing");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Global Keyboard Shortcuts (1-7 for modules, ⌘K for Copilot, ⌘D for Dossier, M for Mute)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInputting =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT";

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.playMilestone();
        setIsAiModalOpen((prev) => !prev);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        sound.playClick();
        setIsDossierOpen((prev) => !prev);
        return;
      }

      if (isInputting) return;

      if (e.key === "1") { sound.playClick(); setActiveTab("billing"); }
      else if (e.key === "2") { sound.playClick(); setActiveTab("financier"); }
      else if (e.key === "3") { sound.playClick(); setActiveTab("workshop"); }
      else if (e.key === "4") { sound.playClick(); setActiveTab("oem"); }
      else if (e.key === "5") { sound.playClick(); setActiveTab("gst"); }
      else if (e.key === "6") { sound.playClick(); setActiveTab("gatepass"); }
      else if (e.key === "7") { sound.playClick(); setActiveTab("capital"); }
      else if (e.key.toLowerCase() === "m") { sound.toggleMute(); }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#050911] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black antialiased">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        <HeaderHero onSelectModule={(tabId) => setActiveTab(tabId)} />

        {/* Active Module View */}
        <div className="relative animate-fadeIn">
          {activeTab === "billing" && <VehicleBillingStudio />}
          {activeTab === "financier" && <FinancierPayoutRecon />}
          {activeTab === "workshop" && <WorkshopServiceBilling />}
          {activeTab === "oem" && <OEMSchemeReconciler />}
          {activeTab === "gst" && <GST3WayRecon />}
          {activeTab === "gatepass" && <MakerCheckerGatePass />}
          {activeTab === "capital" && <CashFlowWorkingCapital />}
        </div>
      </main>

      {/* Global Modals */}
      <AiFinanceCopilotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <PrintableDealershipDossier
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-center text-xs text-slate-400 font-mono space-y-1">
        <p>
          AutoFinance AI™ • Multi-Location Automotive Dealership Finance & Accounts Automation
        </p>
        <p className="text-slate-500">
          Designed by Amit Ashok Swain — Head of Finance Operations & Accounts General Manager
        </p>
      </footer>
    </div>
  );
}
