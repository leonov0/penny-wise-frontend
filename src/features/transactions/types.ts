export interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  category_name: string;
  wallet_id: number;
  amount: string;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
  currency: string;
}

export interface Wallet {
  id: number;
  name: string;
  balance: string;
  created_at: string;
  updated_at: string;
  currency: string;
  transactions: Transaction[];
}

export interface Category {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface AddTransactionPayload {
  category_name: string;
  amount: string;
  description: string;
  date: string;
}

export interface AddWalletPayload {
  name: string;
  currency: string;
  balance: string;
}