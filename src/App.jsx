import { useState } from "react";
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

export default function App() {
  const [activeTab, setActiveTab] = useState("billing");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050911] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        <HeaderHero onSelectModule={(tabId) => setActiveTab(tabId)} />

        {/* Module Views */}
        <div className="relative">
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
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <p>
          AutoFinance AI™ • Automobile Dealership Accounts & Financial Automation Platform
        </p>
        <p className="text-slate-400 mt-1">
          Designed by Amit Ashok Swain — Head of Finance Operations & Accounts General Manager
        </p>
      </footer>
    </div>
  );
}
