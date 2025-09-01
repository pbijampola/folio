import z from "zod";
import { ExpenseSchema } from "../../types/expense/schema";
import { supabase } from "../supabase";
import { useUserStore } from "../../state/store";
    import { ExpenseData, ExpenseResponse, Expenses } from "../../types/expense/type";

export type ExpenseSummary = {
    totalExpenses: number;
    recentExpenses: Expenses[];
}


export async function expensesSummary(filterDate?: string): Promise<ExpenseSummary> {
    const { user } = useUserStore.getState();

    // If no filterDate provided, default to today
    const today = new Date();
    const dateStr = filterDate ?? today.toISOString().split("T")[0]; // YYYY-MM-DD

    // Fetch all expenses for that date
    const { data, error } = await supabase
        .from("expenses")
        .select("amount, created_at")
        .order("created_at", { ascending: false })
        .eq("user_id", user?.id)
        .gte("created_at", `${dateStr}T00:00:00`)
        .lte("created_at", `${dateStr}T23:59:59`);

    if (error) {
        console.error("Error fetching expenses summary", error.message);
        throw error;
    }

    const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);

    // Recent 5 expenses for that date
    const { data: recentExpenses, error: recentExpensesError } = await supabase
        .from("expenses")
        .select('*, categories(name)')
        .order("created_at", { ascending: false })
        .limit(5)
        .eq("user_id", user?.id)
        .gte("created_at", `${dateStr}T00:00:00`)
        .lte("created_at", `${dateStr}T23:59:59`);

    if (recentExpensesError) {
        console.error("Error fetching recent expenses", recentExpensesError.message);
        throw recentExpensesError;
    }

    return {
        totalExpenses: totalAmount,
        recentExpenses,
    };
}


export async function CreateExpense(
    value: z.infer<typeof ExpenseSchema>
  ): Promise<ExpenseResponse> {
    const validData = ExpenseSchema.safeParse(value);
    console.log("The valid data is", validData);
  
    const { user } = useUserStore.getState();
    console.log("The user from zustand state is", user);
  
    if (!validData.success) {
      console.log("Error due to validation issues", validData.error.message);
      return {
        data: null,
        error: "Validation failed",
        success: false,
      };
    }

  if (!user || !user.id) {
    console.log("No user found in store");
    return {
      data: null,
      error: "User not authenticated",
      success: false,
    };
  }

  const payload = {
    ...validData.data,
    user_id: user.id,
  };

  try {
    const { data, error } = await supabase
      .from("expenses")
      .insert([payload])
      .select()
      .single<ExpenseData>();

    if (error) {
      console.log("The error from database is", error.message);
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    return {
      data,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.log("The error is", error.message);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
}


export const getAllExpense = async ():Promise<Expenses[]> => {
    
    const { data, error } = await supabase.from('expenses').select('*').order('created_at', { ascending: false })
    console.log("The list of expenses are ",data)
    if (error) {
        
        throw error
    }
    return data
}