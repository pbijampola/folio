import { View, Text, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  value, 
  onChange, 
  placeholder = "Select Date" 
}) => {
  // Parse the value prop or use current date
  const [date, setDate] = useState<Date>(() => {
    if (value) {
      const parsedDate = new Date(value);
      return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    }
    return new Date();
  });
  
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    
    // Hide picker on Android after selection
    setShowPicker(false);
    setDate(currentDate);
    
    // Call the onChange prop with formatted date string
    if (onChange && selectedDate) {
      // Format date as YYYY-MM-DD for consistency
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onChange(formattedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const formatDisplayDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={showDatePicker}
        style={styles.dateButton}
      >
        <Text style={styles.dateText}>
          {value ? formatDisplayDate(date) : placeholder}
        </Text>
      </TouchableOpacity>
      
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  dateButton: {
    borderWidth: 2,
    borderColor: '#9CA3AF', 
    borderRadius: 6,
    padding: 16,
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 16,
    color: '#374151', 
  },
});

export default DatePicker;