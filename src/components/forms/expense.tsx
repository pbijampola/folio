import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { startTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod';
import { ExpenseSchema } from '../../../types/expense/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CategoryPicker from '../widgets/picker';
import DatePicker from '../widgets/datepicker';
import { CreateExpense } from '../../../lib/actions/expense';
import { useNavigation } from '@react-navigation/native';

const ExpenseForm = () => {

    type expenseFormType = z.infer<typeof ExpenseSchema>;
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ExpenseSchema),
        defaultValues :{
            title: '',
            notes: '',
            amount: '',
            date: '',
            category_id: '',
        }
    })
    const onSubmit = async (data: expenseFormType) => {
        console.log("The expense data to be submitted are:", data);
      
        try {
          const expense = await CreateExpense(data);
      
          if (expense.success) {
            console.log("The expense is created successfully", expense.data);
            navigation.navigate("Home");
          } else {
            console.log("The expense is not created successfully", expense);
            Alert.alert("Error", expense.error as string);
          }
        } catch (error) {
          console.error("Unexpected error while creating expense", error);
          Alert.alert("Error", "Something went wrong, please try again.");
        }
      };
      
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className='px-4 my-4'
        >
            <ScrollView className=''>
               <View className='flex flex-col gap-2'>
                <Text>Expense Title</Text>
                <Controller
                    control={control}
                    name='title'
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <TextInput
                            placeholder="e.g transport, food"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            className='my-2 rounded-md border-2 border-gray-400 p-4 w-'
                        />

                    )}

                />
                {errors.title && (
                    <Text style={{ color: "#ff8566" }}>{errors.title.message}</Text>
                )}
               </View>
               <View className='flex flex-col gap-2'>
                <Text>Expense Amount</Text>
                <Controller
                    control={control}
                    name="amount"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    })=>(
                        <TextInput
                            placeholder="Expense Amount"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            // activeOutlineColor={error ? "red" : "black"}
                            className='my-2 rounded-md border-2 border-gray-400 p-4 w-'
                        />
                    )}

                />
                {errors.amount && (
                    <Text style={{ color: "#ff8566" }}>{errors.amount.message}</Text>
                )}
                </View>
                <View className='flex flex-col gap-2'>
                <Text>Expense Date</Text>
                <Controller
                control={control}
                name="date"
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <DatePicker
                    value={value}
                    onChange={onChange}
                    placeholder="Select Date"
                    />
                )}
                />
                {errors.date && (
                <Text style={{ color: "#ff8566" }}>{errors.date.message}</Text>
                )}
                </View>
                <View className='flex flex-col gap-2'>
                <Text>Expense Category</Text>
                <Controller
                    control={control}
                    name="category_id"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    })=>(

                        <CategoryPicker
                            placeholder="Expense Category"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                    
                />
                {errors.category_id && (
                    <Text style={{ color: "#ff8566" }}>{errors.category_id.message}</Text>
                )}
                </View>
                <View className='flex flex-col gap-2'>
                <Text>Description</Text>
                <Controller
                    control={control}
                    name="notes"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    })=>(
                        <TextInput
                            placeholder="Describe your expense"
                            multiline={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            textAlignVertical='top'
                            className='rounded-md border-2 border-gray-400 py-2 px-2  h-40'
                        />
                    )}
                    
                />
                {errors.notes && (
                    <Text style={{ color: "#ff8566" }}>{errors.notes.message}</Text>
                )}
                </View>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className='flex flex-row justify-center items-center gap-2 bg-[#50A65C] p-4 rounded-lg my-4'
                >
                    <Text className='text-lg text-white font-semibold'>Submit</Text>
                </TouchableOpacity>
                
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ExpenseForm

// function createExpense(data: { title: string; amount: number; date: string; category: string; note: string; }) {
//     throw new Error('Function not implemented.');
// }

