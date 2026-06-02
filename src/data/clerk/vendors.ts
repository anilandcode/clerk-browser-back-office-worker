import { Vendor } from "@/lib/types";

export const vendors: Vendor[] = [
  {
    id: "VENDOR-001",
    name: "Northwind Packaging",
    taxId: "12-3456789",
    status: "review",
    bankAccountLastChangedAt: "2026-05-28T14:30:00Z",
    documents: {
      w9: "current",
      insurance: "current",
    },
  },
  {
    id: "VENDOR-002",
    name: "Contoso Shipping Co.",
    taxId: "98-7654321",
    status: "active",
    bankAccountLastChangedAt: "2025-11-15T09:00:00Z",
    documents: {
      w9: "current",
      insurance: "current",
    },
  },
  {
    id: "VENDOR-003",
    name: "Fabrikam Office Solutions",
    taxId: "45-6789012",
    status: "active",
    documents: {
      w9: "current",
      insurance: "current",
    },
  },
  {
    id: "VENDOR-004",
    name: "Woodgrove Logistics",
    taxId: "67-8901234",
    status: "inactive",
    documents: {
      w9: "expired",
      insurance: "missing",
    },
  },
  {
    id: "VENDOR-005",
    name: "Tailspin Tax Services",
    taxId: "23-4567890",
    status: "active",
    documents: {
      w9: "current",
      insurance: "current",
    },
  },
];

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}
