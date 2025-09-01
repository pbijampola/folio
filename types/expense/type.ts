export interface Expenses{
    data:ExpenseData[],
} 

export type ExpenseData = {
    id: string;
    user_id: string;
    category_id: string;
    title: string;
    amount: number;
    date: string;
    notes: string;
    currency: string | null;
    payment_method: string | null;
    attachment: string | null;
    created_at: string;
    updated_at: string;
  };

  export type ExpenseResponse = {
    data: ExpenseData | null;
    error: string | null;
    success: boolean;
  };