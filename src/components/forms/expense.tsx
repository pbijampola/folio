import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod';
import { ExpenseSchema } from '../../../types/expense/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CategoryPicker from '../widgets/picker';

const ExpenseForm = () => {
    type expenseFormType = z.infer<typeof ExpenseSchema>;
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ExpenseSchema)
    })
    const onSubmit = (data: expenseFormType) => {
        console.log(data)
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className='px-4 my-4'
        >
            <ScrollView className=''>
                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <TextInput
                            placeholder="Expense Title"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            // activeOutlineColor={error ? "red" : "black"}
                            className='my-2 rounded-md border-2 border-gray-400 p-4 w-'
                        />

                    )}
                    name="title"
                />
                {errors.title && (
                    <Text style={{ color: "#ff8566" }}>{errors.title.message}</Text>
                )}
                <Controller
                    control={control}
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
                    name="amount"
                />
                {errors.amount && (
                    <Text style={{ color: "#ff8566" }}>{errors.amount.message}</Text>
                )}

                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    })=>(
                        <TextInput
                            placeholder="Expense Date"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            
                            className='my-2 rounded-md border-2 border-gray-400 p-4'
                        />
                    )}
                    name="date"
                />
                {errors.date && (
                    <Text style={{ color: "#ff8566" }}>{errors.date.message}</Text>
                )}

                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    })=>(
                        // <TextInput
                        //     placeholder="Expense Category"
                        //     onBlur={onBlur}
                        //     onChangeText={onChange}
                        //     value={value}
                        //     // activeOutlineColor={error ? "red" : "black"}
                        //     className='my-2 rounded-md border-2 border-gray-400 p-4'
                        // />
                        <CategoryPicker
                            placeholder="Expense Category"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                    name="category"
                />
                {errors.category && (
                    <Text style={{ color: "#ff8566" }}>{errors.category.message}</Text>
                )}

                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    })=>(
                        <TextInput
                            placeholder="Expense Description"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            // activeOutlineColor={error ? "red" : "black"}
                            className='rounded-md border-2 border-gray-400 py-1 px-2 h-40'
                        />
                    )}
                    name="description"
                />
                {errors.description && (
                    <Text style={{ color: "#ff8566" }}>{errors.description.message}</Text>
                )}
                    
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

