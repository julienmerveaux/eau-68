import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type PickerItem = {
  label: string;
  value: string;
};

type CustomPickerProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: PickerItem[];
  placeholder: string;
};

export function CustomPicker({ selectedValue, onValueChange, items, placeholder }: CustomPickerProps) {
  const pickerHeight = Platform.OS === 'web' ? 50 : 200;

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={[styles.picker, { height: pickerHeight }]}
      dropdownIconColor="white"
    >
      <Picker.Item label={placeholder} value="" />
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    color: 'black',
  },
});
