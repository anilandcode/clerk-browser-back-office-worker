"use client";

import { ReplayFrame } from "@/lib/types";
import { Lock } from "@phosphor-icons/react/dist/ssr";

interface BrowserFrameProps {
  currentFrame?: ReplayFrame;
  children?: React.ReactNode;
}

const screenLabels: Record<string, string> = {
  queue: "Work Queue",
  vendor_search: "Vendor Search",
  vendor_profile: "Vendor Profile",
  invoice_detail: "Invoice Detail",
  po_match: "Purchase Order Match",
  payment_details: "Payment Details",
  approval_gate: "Approval Required",
  confirmation: "Confirmation",
};

const navItems = [
  "Home",
  "Vendors",
  "Invoices",
  "Purchase Orders",
  "Payments",
  "Reports",
];

export function BrowserFrame({ currentFrame, children }: BrowserFrameProps) {
  const tabLabel = currentFrame
    ? screenLabels[currentFrame.screen] || "LedgerLite ERP"
    : "Dashboard";

  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-rule)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-sm)]">
      {/* Browser Chrome */}
      <div className="bg-[var(--color-surface-sunken)] px-3 py-2 flex items-center gap-3 border-b border-[var(--color-rule)]">
        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#27C93F]" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 bg-[var(--color-surface-elevated)] rounded-[var(--radius-sm)] px-2.5 py-1 flex items-center gap-2">
          <Lock
            size={10}
            weight="fill"
            className="text-[var(--color-ink-ghost)] shrink-0"
          />
          <span className="text-[10px] font-mono text-[var(--color-ink-tertiary)] truncate">
            {currentFrame
              ? `erp.ledgerlite.internal/${currentFrame.screen.replace(/_/g, "/")}`
              : "erp.ledgerlite.internal/admin"}
          </span>
        </div>

        {/* Action indicator */}
        {currentFrame && (
          <span className="text-[10px] text-[var(--color-accent)] font-medium shrink-0 max-w-[140px] truncate">
            {currentFrame.action}
          </span>
        )}
      </div>

      {/* Browser Content */}
      <div className="bg-[#F5F3F0] min-h-[420px]">
        {/* Legacy Header */}
        <div className="bg-[#3C3C3C] text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-tight">
              LedgerLite ERP
            </span>
            <span className="text-[10px] opacity-50 font-mono">v4.2.1</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="opacity-60">Admin: clerk@apexoffice.com</span>
            <span className="opacity-30">|</span>
            <span className="opacity-60">Apex Office Supply</span>
          </div>
        </div>

        {/* Legacy Navigation */}
        <div className="bg-[#4A4A4A] text-white px-4 py-1 flex items-center gap-0.5 text-[10px]">
          {navItems.map((item) => (
            <span
              key={item}
              className="px-2 py-1 rounded cursor-pointer hover:bg-[#5A5A5A] transition-colors"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="bg-[#E8E6E4] border-b border-[#D0CECC] px-4 flex items-center gap-0 text-[10px]">
          <div className="px-3 py-1.5 bg-[#F5F3F0] border border-b-0 border-[#D0CECC] rounded-t text-[var(--color-ink)] font-medium">
            {tabLabel}
          </div>
          <div className="px-3 py-1.5 text-[var(--color-ink-ghost)] cursor-pointer hover:bg-[#E0DED8] transition-colors">
            +
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
