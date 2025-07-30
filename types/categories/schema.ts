import { object, string } from "zod";

export const CategorySchema = object({
    name: string({required_error:"Category name is required"}),
    color: string({required_error:"Category color is required"}),
    icon: string({required_error:"Category icon is required"})
})