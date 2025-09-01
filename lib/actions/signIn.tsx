import { z } from "zod";
import { SignInSchema } from "../../types/Auth/schema";
import { supabase } from "../supabase";
import { useUserStore } from "../../state/store";

export const signInWithEmail = async (
  credentials : z.infer<typeof SignInSchema>
): Promise<any> => {
    
   const validated = SignInSchema.safeParse(credentials)

   if (!validated.success) {
     return {
       error: validated.error
     }
   } 
   const { setUser, setLoading, clearUser } = useUserStore.getState();

   try {
   
    setLoading(true);
     const { data, error } = await supabase.auth.signInWithPassword({
       email: validated.data.email,
       password: validated.data.password
     })
    
     if (!error && data.user) {
      
      const user = data.user
     
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (userDataError) {
        setLoading(false);
        return {
          error: userDataError
        }
      }
      setUser(userData);

      return {
        data: userData,
        error: null
      }
    }
    else {
      setLoading(false);
      return {
        error: error || 'Sign in failed'
      };
    }
     
   } catch (error) {
    console.log(error)
    setLoading(false);
    clearUser();
     return {
       error: error
     }
   }
  }