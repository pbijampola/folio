import React, { useState, useTransition } from 'react'
import { TextInput, View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { Controller } from 'react-hook-form'
import { SignInSchema } from '../../../types/Auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod';
import { signInWithEmail } from '../../../lib/actions/signIn'
import { useNavigation } from '@react-navigation/native'
import { Loader } from 'lucide-react-native'

export default function SignInForm() {
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const navigation = useNavigation();

  type signInFormType = z.infer<typeof SignInSchema>;
  const { control, handleSubmit, formState: { errors } } = useForm<signInFormType>({
      resolver: zodResolver(SignInSchema),
      defaultValues: {
          email: '',
          password: ''
      }
  })
  const onSubmit: SubmitHandler<signInFormType> = (data: signInFormType) => {
    setError(null)
    startTransition(async () => {
      setLoading(true)
      
      const res = await signInWithEmail(data)
      console.log("The response after signing is ",res)
      if (res.error) {
        // Handle login error
        setError(
          res.error.message || 'Sign in failed. Please check your credentials and try again.'
        );
      } else if (res.data && res.error === null) {
        // Success case - navigate to home screen
        navigation.navigate('Home'); 
      }
      setLoading(false)
    })
  }

  return (
    <SafeAreaView className='flex flex-col justify-center bg-primary h-full w-full '>
      <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className='px-4 my-4'
        >
      <View className='p-[12px] mt-[40px]'>
        <View className='flex flex-col gap-0 mt-4'>
          <Text className='text-2xl font-bold '>Hi, Welcome Back</Text>
          <Text className='text-sm font-semibold '>Hello again, you've been missed 😘</Text>
        </View>

         {/* Display error message if any */}
      {error && (
        <Text style={{ color: 'red', marginVertical: 10 }}>
          {error}
        </Text>
      )}

        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View className='my-4'>
              <Text className='text-sm font-semibold '>Email</Text>
              <TextInput
                placeholder="eg: bijampolapatrick@example.com"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                className='my-2 rounded-md border-2 border-gray-400 p-4 w-full'
              />
              {error && (
                <Text style={{ color: "#ff8566" }}>{error.message}</Text>
              )}
            </View>
          )}
          name="email"
        />
       
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View>
              <Text className='text-sm font-semibold '>Password</Text>
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                className='my-2 rounded-md border-2 border-gray-400 p-4 w-full'
              />
              {error && (
                <Text style={{ color: "#ff8566" }}>{error.message}</Text>
              )}
            </View>
          )}
          name="password"
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className='flex flex-row justify-center items-center gap-2 bg-[#50A65C] p-4 rounded-lg my-4'
        >
          <Text className='text-lg text-white font-semibold'>
            {loading ? <Loader color="white" className='animate-spin '/> : 'Sign In To Folio'}
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

