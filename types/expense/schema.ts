import { number, object, preprocess, string } from "zod";

export const ExpenseSchema = object({
    title:string({required_error:"Expense title is required"}),
    amount: preprocess(
        (val) => {
          if (typeof val === "string" && val.trim() !== "") {
            return parseInt(val);
          }
      
          return val;
        },
        number({ message: "Please expense amount should be valid number" })
          .nonnegative({ message: "Please expense amount should be positive number" })
    ),
    date: string(),
    category: string(),
    description: string()
})