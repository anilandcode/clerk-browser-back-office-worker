import { Vendor } from "@/lib/types";
import { getInvoicesByVendor } from "@/data/clerk/invoices";

interface VendorProfileProps {
  vendor: Vendor;
}

export function VendorProfile({ vendor }: VendorProfileProps) {
  const invoices = getInvoicesByVendor(vendor.id);

  return (
    <div className="bg-white border border-[#D0CECC] rounded">
      <div className="px-4 py-3 border-b border-[#D0CECC] bg-[#F8F8F8] flex items-center justify-between">
        <h3 className="text-xs font-semibold text-[var(--color-text)]">Vendor Profile</h3>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded ${
            vendor.status === "active"
              ? "bg-green-100 text-green-700"
              : vendor.status === "review"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {vendor.status}
        </span>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Vendor ID</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
              {vendor.id}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Name</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
              {vendor.name}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Tax ID</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
              {vendor.taxId}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Bank Account Last Changed</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
              {vendor.bankAccountLastChangedAt
                ? new Date(vendor.bankAccountLastChangedAt).toLocaleString()
                : "No changes recorded"}
            </div>
          </div>
        </div>

        {/* Bank Change Warning */}
        {vendor.bankAccountLastChangedAt && (
          <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded px-3 py-2 text-[10px] text-[#F57F17]">
            ⚠ Bank account changed within the last 7 days — approval required for payment updates
          </div>
        )}

        {/* Documents */}
        <div>
          <h4 className="text-[10px] text-[#666] uppercase tracking-wider mb-2">Documents</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1.5">
              <span className="text-[10px] text-[#666]">W-9:</span>
              <span
                className={`ml-2 text-[10px] font-medium ${
                  vendor.documents.w9 === "current"
                    ? "text-green-600"
                    : vendor.documents.w9 === "expired"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {vendor.documents.w9}
              </span>
            </div>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1.5">
              <span className="text-[10px] text-[#666]">Insurance:</span>
              <span
                className={`ml-2 text-[10px] font-medium ${
                  vendor.documents.insurance === "current"
                    ? "text-green-600"
                    : vendor.documents.insurance === "expired"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {vendor.documents.insurance}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        {invoices.length > 0 && (
          <div>
            <h4 className="text-[10px] text-[#666] uppercase tracking-wider mb-2">Recent Invoices</h4>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#D0CECC]">
                  <th className="text-left py-1 text-[10px] text-[#666] font-normal">Invoice</th>
                  <th className="text-left py-1 text-[10px] text-[#666] font-normal">Amount</th>
                  <th className="text-left py-1 text-[10px] text-[#666] font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-[#E8E6E4]">
                    <td className="py-1.5 font-mono">{inv.id}</td>
                    <td className="py-1.5">${inv.amount.toLocaleString()}</td>
                    <td className="py-1.5">
                      <span
                        className={`text-[10px] px-1 py-0.5 rounded ${
                          inv.status === "matched"
                            ? "bg-green-100 text-green-700"
                            : inv.status === "duplicate"
                            ? "bg-red-100 text-red-700"
                            : inv.status === "blocked"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
