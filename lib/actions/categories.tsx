import { createClient } from "@supabase/supabase-js"
import { Category } from "../../types/categories/type"
import { supabase } from "../supabase"

export const fetchCategories = async ():Promise<Category[]> => {
    const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: false })
    console.log("The list of categories is ",data)
    if (error) {
        throw error
    }
    return data
}