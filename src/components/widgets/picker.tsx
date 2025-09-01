import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Category } from '../../../types/categories/type';
import { fetchCategories } from '../../../lib/actions/categories';

interface CategoryPickerProps {
   label?: string
   placeholder?: string
   isRequiered?: boolean
   value?: string
   onChange?: (value: string) => void 
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({placeholder, isRequiered, value, onChange}) => {
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const categories = await fetchCategories();
                setCategory(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleCategoryPress = (categoryId: string) => {
        if (onChange) {
            onChange(categoryId);
        }
    };

  
    const isSelected = (categoryId: string) => {
        return value === categoryId;
    };

    return (
        <View className='flex flex-row my-2 gap-3'>
            <FlatList
                data={category}
                numColumns={3}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={{ gap: 12 }} 
                contentContainerStyle={{ gap: 12 }} 
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        className={`flex-1 p-2 rounded-md border ${
                            isSelected(item.id) 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-gray-300'
                        }`}
                        onPress={() => handleCategoryPress(item.id)}
                    >
                        <Text className={`text-center ${
                            isSelected(item.id) 
                                ? 'text-white' 
                                : 'text-black'
                        }`}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default CategoryPicker