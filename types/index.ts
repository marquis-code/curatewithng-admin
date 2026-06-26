export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface Vendor {
  _id: string;
  businessName: string;
  slug: string;
  description: string;
  logo: string;
  categories: string[];
  isApproved: boolean;
  isActive: boolean;
  totalEarnings: number;
  pendingPayout: number;
}

export interface Gift {
  _id: string;
  name: string;
  price: number;
  vendorId: Vendor;
  isActive: boolean;
  stock: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}
