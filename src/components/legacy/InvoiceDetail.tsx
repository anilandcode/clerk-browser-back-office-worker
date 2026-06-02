import { Invoice } from "@/lib/types";
import { getPurchaseOrderById } from "@/data/clerk/purchaseOrders";
import { getVendorById } from "@/data/clerk/vendors";

interface InvoiceDetailProps {
  invoice: Invoice;
}

export function InvoiceDetail({ invoice }: InvoiceDetailProps) {
  const po = getPurchaseOrderById(invoice.purchaseOrderId);
  const vendor = getVendorById(invoice.vendorId);
  const poMatch = po ? po.approvedAmount === invoice.amount : false;

  return (
    <div className="bg-white border border-[#D0CECC] rounded">
      <div className="px-4 py-3 border-b border-[#D0CECC] bg-[#F8F8F8] flex items-center justify-between">
        <h3 className="text-xs font-semibold text-[var(--color-text)]">Invoice Detail</h3>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded ${
            invoice.status === "matched"
              ? "bg-green-100 text-green-700"
              : invoice.status === "duplicate"
              ? "bg-red-100 text-red-700"
              : invoice.status === "blocked"
              ? "bg-gray-100 text-gray-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {invoice.status}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Invoice Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Invoice Number</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
              {invoice.id}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Vendor</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
              {vendor?.name || invoice.vendorId}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Amount</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
              ${invoice.amount.toLocaleString()} {invoice.currency}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Due Date</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
              {invoice.dueDate}
            </div>
          </div>
        </div>

        {/* Extracted Fields */}
        <div>
          <h4 className="text-[10px] text-[#666] uppercase tracking-wider mb-2">Extracted Fields</h4>
          <div className="bg-[#F8F8F8] border border-[#CCC] rounded p-2">
            {Object.entries(invoice.extractedFields).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-0.5 text-[10px]">
                <span className="text-[#666]">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="font-mono text-[var(--color-text)]">
                  {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PO Match Section */}
        {po && (
          <div>
            <h4 className="text-[10px] text-[#666] uppercase tracking-wider mb-2">Purchase Order Match</h4>
            <div
              className={`border rounded p-3 ${
                poMatch
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono">{po.id}</span>
                <span
                  className={`text-[10px] font-medium ${
                    poMatch ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {poMatch ? "✓ Amount matches" : "✗ Amount mismatch"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-[#666]">PO Amount:</span>
                  <span className="ml-2 font-mono">${po.approvedAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#666]">Invoice Amount:</span>
                  <span className="ml-2 font-mono">${invoice.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* PO Line Items */}
            <div className="mt-2">
              <h5 className="text-[10px] text-[#666] mb-1">Line Items</h5>
              <table className="w-full text-[10px]">
                <tbody className="divide-y divide-[#E8E6E4]">
                  {po.lineItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-1">{item.description}</td>
                      <td className="py-1 text-right font-mono">${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Duplicate Warning */}
        {invoice.extractedFields.duplicateOf && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-[10px] text-red-700">
            ⚠ Possible duplicate of {String(invoice.extractedFields.duplicateOf)}. 
            {invoice.extractedFields.duplicateReason && (
              <span className="ml-1">{String(invoice.extractedFields.duplicateReason)}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
