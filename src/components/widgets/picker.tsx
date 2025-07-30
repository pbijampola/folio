import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Category } from '../../../types/categories/type';
import { fetchCategories } from '../../../lib/actions/categories';

interface CategoryPickerProps {
   label?: string
   placeholder?: string
   isRequiered?: boolean
   value?: string
   onChange?: (value: string) => void 
}
const CategoryPicker: React.FC<CategoryPickerProps> = ({placeholder,isRequiered,value,onChange}) => {
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [value, setValue] = useState<string | null>(null);
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

    const renderLabel = () => {
       if(value || isFocused){
         return <Text>Dropdown label</Text>
       }
       return null;
      };
   

  return (
    <View>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label={placeholder} value="" />
        {category.map((item) => (
          <Picker.Item key={item.id} label={item.name} value={item.id} />
        ))}
      </Picker>
    </View>
  )
}

export default CategoryPicker