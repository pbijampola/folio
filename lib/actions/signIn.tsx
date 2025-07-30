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
      // const res = await supabase.auth.getUser()
      // console.log("The user signed in is ",res)

      const user = data.user
      // console.log("The user signed in is ",user.id)
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
        // console.log("The user signed in is ",userData)
      if (userDataError) {
        return {
          error: userDataError
        }
      }
      return {
        data: userData,
        error: error
      }
    }
     
   } catch (error) {
    console.log(error)
     return {
       error: error
     }
   }
  }