import { PurchaseOrder } from "@/lib/types";

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2024-0891",
    vendorId: "VENDOR-001",
    approvedAmount: 4860,
    currency: "USD",
    status: "approved",
    lineItems: [
      { description: "Corrugated shipping boxes (500 units)", amount: 2400 },
      { description: "Bubble wrap rolls (20 units)", amount: 1200 },
      { description: "Packing tape (100 rolls)", amount: 860 },
      { description: "Shipping labels (2000 count)", amount: 400 },
    ],
  },
  {
    id: "PO-2024-0894",
    vendorId: "VENDOR-002",
    approvedAmount: 1250,
    currency: "USD",
    status: "approved",
    lineItems: [
      { description: "Ground shipping Q2 service fee", amount: 1250 },
    ],
  },
  {
    id: "PO-2024-0897",
    vendorId: "VENDOR-003",
    approvedAmount: 3200,
    currency: "USD",
    status: "approved",
    lineItems: [
      { description: "Office desk chairs (4 units)", amount: 2400 },
      { description: "Monitor stands (4 units)", amount: 800 },
    ],
  },
  {
    id: "PO-2024-0902",
    vendorId: "VENDOR-005",
    approvedAmount: 7800,
    currency: "USD",
    status: "approved",
    lineItems: [
      { description: "Q2 tax preparation services", amount: 5000 },
      { description: "Amended return filing (2025)", amount: 2800 },
    ],
  },
  {
    id: "PO-2024-0905",
    vendorId: "VENDOR-004",
    approvedAmount: 5400,
    currency: "USD",
    status: "approved",
    lineItems: [
      { description: "Regional freight service May", amount: 3200 },
      { description: "Warehousing fee May", amount: 2200 },
    ],
  },
];

export function getPurchaseOrderById(id: string): PurchaseOrder | undefined {
  return purchaseOrders.find((po) => po.id === id);
}
