import { z } from "zod";
import { SignInSchema } from "../../types/Auth/schema";
import { supabase } from "../supabase";

export const signInWithEmail = async (
  credentials : z.infer<typeof SignInSchema>
): Promise<any> => {
    
   const validated = SignInSchema.safeParse(credentials)

   if (!validated.success) {
     return {
       error: validated.error
     }
   } 
   try {
   
     const { data, error } = await supabase.auth.signInWithPassword({
       email: validated.data.email,
       password: validated.data.password
     })
    //  console.log("The user signed in is ",data)
    if(!error) {
      const res = await supabase.auth.getUser()
      console.log("The user signed in is ",res)
    }
     return {
       data: data,
       error: error
     }
   } catch (error) {
    console.log(error)
     return {
       error: error
     }
   }
  }