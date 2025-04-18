import { View, Text } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import ExpenseForm from './forms/expense';
const ModalComponent = ({isVisible,onClose}:any) => {
   
    const snapPoints = ["25%", "50%", "75%", "90%"];
    const bottomSheetModalRef = useRef<BottomSheet>(null);

    // Use effect to handle opening and closing of the bottom sheet
    useEffect(() => {
      if (isVisible && bottomSheetModalRef.current) {
        bottomSheetModalRef.current.expand();
      } else if (!isVisible && bottomSheetModalRef.current) {
        bottomSheetModalRef.current.close();
      }
    }, [isVisible]);

    // Handle closing the modal when the bottom sheet is closed
  const handleSheetChange = (index) => {
    if (index === -1 && onClose) {
      onClose();
    }
  };
    
  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChange}
      index={-1} // Start closed
    >
      <BottomSheetView className='p-4'>
        <ExpenseForm />
      </BottomSheetView>
    </BottomSheet>
  )
}

export default ModalComponent