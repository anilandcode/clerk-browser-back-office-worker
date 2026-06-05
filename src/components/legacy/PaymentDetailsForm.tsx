"use client";

interface PaymentDetailsFormProps {
  isBlocked?: boolean;
  blockReason?: string;
}

export function PaymentDetailsForm({ isBlocked, blockReason }: PaymentDetailsFormProps) {
  return (
    <div className="bg-white border border-[#D0CECC] rounded">
      <div className="px-4 py-3 border-b border-[#D0CECC] bg-[#F8F8F8]">
        <h3 className="text-xs font-semibold text-[var(--color-ink)]">Payment Details</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Block Warning */}
        {isBlocked && (
          <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded px-3 py-2 text-[10px] text-[#F57F17]">
            ⚠ {blockReason || "Action blocked — approval required"}
          </div>
        )}

        {/* Payment Form */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Bank Name</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
              First National Bank
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Account Type</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
              Business Checking
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Routing Number</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
              ****6789
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Account Number</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs font-mono">
              ****4582
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Payment Method</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
              ACH Transfer
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#666] block mb-0.5">Currency</label>
            <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1 text-xs">
              USD
            </div>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-[10px] text-[#666] block mb-0.5">Payment Amount</label>
          <div className="bg-[#F8F8F8] border border-[#CCC] rounded px-2 py-1.5 text-sm font-mono font-semibold">
            $4,860.00
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#D0CECC]">
          {isBlocked ? (
            <>
              <button
                className="px-4 py-1.5 text-xs bg-[#CCC] text-[#666] rounded cursor-not-allowed"
                disabled
              >
                Save Payment Details
              </button>
              <span className="text-[10px] text-[#F57F17]">Disabled — approval required</span>
            </>
          ) : (
            <>
              <button className="px-4 py-1.5 text-xs bg-[#4A4A4A] text-white rounded hover:bg-[#5A5A5A]">
                Save Payment Details
              </button>
              <button className="px-4 py-1.5 text-xs bg-white border border-[#CCC] text-[#666] rounded hover:bg-[#F8F8F8]">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
