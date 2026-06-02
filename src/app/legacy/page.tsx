"use client";

import { useState } from "react";
import { LegacyLayout } from "@/components/legacy/LegacyLayout";
import { VendorSearchForm } from "@/components/legacy/VendorSearchForm";
import { VendorProfile } from "@/components/legacy/VendorProfile";
import { InvoiceDetail } from "@/components/legacy/InvoiceDetail";
import { PaymentDetailsForm } from "@/components/legacy/PaymentDetailsForm";
import { getVendorById } from "@/data/clerk/vendors";
import { getInvoiceById, getInvoicesByVendor } from "@/data/clerk/invoices";
import { Disclosure } from "@/components/shared/Disclosure";

type Tab = "search" | "vendor" | "invoice" | "payment";

export default function LegacyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("search");
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  const selectedVendor = selectedVendorId ? getVendorById(selectedVendorId) : null;
  const selectedInvoice = selectedInvoiceId ? getInvoiceById(selectedInvoiceId) : null;

  const handleVendorSelect = (vendorId: string) => {
    setSelectedVendorId(vendorId);
    setSelectedInvoiceId(null);
    setActiveTab("vendor");
  };

  const handleInvoiceSelect = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setActiveTab("invoice");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">LedgerLite ERP</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Synthetic legacy vendor admin portal — for demonstration only
          </p>
        </div>
        <Disclosure variant="inline" />
      </div>

      <LegacyLayout title="Vendor Management">
        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mb-4 bg-[#E8E6E4] p-1 rounded">
          <button
            onClick={() => setActiveTab("search")}
            className={`px-3 py-1.5 text-xs rounded ${
              activeTab === "search"
                ? "bg-white shadow-sm text-[var(--color-text)]"
                : "text-[#666] hover:bg-[#D0CECC]"
            }`}
          >
            Vendor Search
          </button>
          {selectedVendor && (
            <button
              onClick={() => setActiveTab("vendor")}
              className={`px-3 py-1.5 text-xs rounded ${
                activeTab === "vendor"
                  ? "bg-white shadow-sm text-[var(--color-text)]"
                  : "text-[#666] hover:bg-[#D0CECC]"
              }`}
            >
              Vendor Profile
            </button>
          )}
          {selectedInvoice && (
            <button
              onClick={() => setActiveTab("invoice")}
              className={`px-3 py-1.5 text-xs rounded ${
                activeTab === "invoice"
                  ? "bg-white shadow-sm text-[var(--color-text)]"
                  : "text-[#666] hover:bg-[#D0CECC]"
              }`}
            >
              Invoice Detail
            </button>
          )}
          {selectedInvoiceId === "INV-1048" && (
            <button
              onClick={() => setActiveTab("payment")}
              className={`px-3 py-1.5 text-xs rounded ${
                activeTab === "payment"
                  ? "bg-white shadow-sm text-[var(--color-text)]"
                  : "text-[#666] hover:bg-[#D0CECC]"
              }`}
            >
              Payment Details
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "search" && (
          <VendorSearchForm onSelect={handleVendorSelect} />
        )}

        {activeTab === "vendor" && selectedVendor && (
          <div className="space-y-4">
            <VendorProfile vendor={selectedVendor} />
            
            {/* Invoice Links */}
            {selectedVendorId && (
              <div className="bg-white border border-[#D0CECC] rounded p-4">
                <h4 className="text-[10px] text-[#666] uppercase tracking-wider mb-2">
                  View Invoice Details
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getInvoicesByVendor(selectedVendorId).map((inv) => (
                    <button
                      key={inv.id}
                      onClick={() => handleInvoiceSelect(inv.id)}
                      className="px-2 py-1 text-xs bg-[#F8F8F8] border border-[#CCC] rounded hover:bg-[#E8E6E4]"
                    >
                      {inv.id}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "invoice" && selectedInvoice && (
          <div className="space-y-4">
            <InvoiceDetail invoice={selectedInvoice} />
            
            {selectedInvoiceId === "INV-1048" && (
              <button
                onClick={() => setActiveTab("payment")}
                className="px-3 py-1.5 text-xs bg-[#4A4A4A] text-white rounded hover:bg-[#5A5A5A]"
              >
                View Payment Details →
              </button>
            )}
          </div>
        )}

        {activeTab === "payment" && (
          <PaymentDetailsForm
            isBlocked={true}
            blockReason="Bank account changed recently — Finance Manager approval required before submission"
          />
        )}
      </LegacyLayout>
    </div>
  );
}
