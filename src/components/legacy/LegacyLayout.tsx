import { ReactNode } from "react";

interface LegacyLayoutProps {
  children: ReactNode;
  title?: string;
}

export function LegacyLayout({ children, title }: LegacyLayoutProps) {
  return (
    <div className="bg-[#F5F3F0] min-h-screen -mx-6 -my-8">
      {/* Legacy Header */}
      <div className="bg-[#3C3C3C] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold">LedgerLite ERP</span>
          <span className="text-[10px] opacity-70">v4.2.1</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="opacity-70">Admin: clerk@apexoffice.com</span>
          <span className="opacity-50">|</span>
          <span className="opacity-70">Apex Office Supply</span>
        </div>
      </div>

      {/* Legacy Navigation */}
      <div className="bg-[#4A4A4A] text-white px-6 py-1.5 flex items-center gap-1 text-[10px]">
        <a href="/legacy" className="px-2 py-1 hover:bg-[#5A5A5A] rounded">Home</a>
        <a href="/legacy" className="px-2 py-1 bg-[#6A6A6A] rounded">Vendors</a>
        <a href="/legacy" className="px-2 py-1 hover:bg-[#5A5A5A] rounded">Invoices</a>
        <a href="/legacy" className="px-2 py-1 hover:bg-[#5A5A5A] rounded">Purchase Orders</a>
        <a href="/legacy" className="px-2 py-1 hover:bg-[#5A5A5A] rounded">Payments</a>
        <a href="/legacy" className="px-2 py-1 hover:bg-[#5A5A5A] rounded">Reports</a>
      </div>

      {/* Tab Bar */}
      <div className="bg-[#E8E6E4] border-b border-[#D0CECC] px-6 flex items-center gap-0 text-[10px]">
        <div className="px-3 py-1.5 bg-[#F5F3F0] border border-b-0 border-[#D0CECC] rounded-t text-[var(--color-text)] font-medium">
          {title || "Vendor Management"}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>

      {/* Legacy Footer */}
      <div className="bg-[#E8E6E4] border-t border-[#D0CECC] px-6 py-2 text-[10px] text-[#666] flex items-center justify-between">
        <span>LedgerLite ERP © 2024 Apex Office Supply</span>
        <span>Synthetic demo — no real system</span>
      </div>
    </div>
  );
}
