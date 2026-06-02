"use client";

import { useState } from "react";
import { vendors } from "@/data/clerk/vendors";

interface VendorSearchFormProps {
  onSelect?: (vendorId: string) => void;
}

export function VendorSearchForm({ onSelect }: VendorSearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(vendors);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setResults(vendors);
    } else {
      setResults(
        vendors.filter(
          (v) =>
            v.name.toLowerCase().includes(term.toLowerCase()) ||
            v.id.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="bg-white border border-[#D0CECC] rounded">
      <div className="px-4 py-3 border-b border-[#D0CECC] bg-[#F8F8F8]">
        <h3 className="text-xs font-semibold text-[var(--color-text)]">Vendor Search</h3>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search vendors by name or ID..."
            className="flex-1 bg-[#F8F8F8] border border-[#CCC] rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#666]"
          />
          <button className="px-3 py-1.5 text-xs bg-[#4A4A4A] text-white rounded hover:bg-[#5A5A5A]">
            Search
          </button>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#D0CECC]">
              <th className="text-left py-2 text-[10px] text-[#666] font-normal">ID</th>
              <th className="text-left py-2 text-[10px] text-[#666] font-normal">Name</th>
              <th className="text-left py-2 text-[10px] text-[#666] font-normal">Tax ID</th>
              <th className="text-left py-2 text-[10px] text-[#666] font-normal">Status</th>
              <th className="text-left py-2 text-[10px] text-[#666] font-normal">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E6E4]">
            {results.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-[#F8F8F8]">
                <td className="py-2 font-mono">{vendor.id}</td>
                <td className="py-2">{vendor.name}</td>
                <td className="py-2 font-mono">{vendor.taxId}</td>
                <td className="py-2">
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
                </td>
                <td className="py-2">
                  <button
                    onClick={() => onSelect?.(vendor.id)}
                    className="text-[#0066CC] hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {results.length === 0 && (
          <p className="text-xs text-[#666] text-center py-4">No vendors found</p>
        )}
      </div>
    </div>
  );
}
