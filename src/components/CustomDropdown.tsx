import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  items: DropdownItem[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomDropdown({
  items,
  selectedValue,
  onValueChange,
  placeholder = '-- Chọn --',
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    items.find((item) => item.value === selectedValue)?.label || placeholder;

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <Text
          className={`font-inter text-base ${
            selectedValue ? 'text-gray-900' : 'text-gray-500'
          }`}
          numberOfLines={1}
        >
          {selectedLabel}
        </Text>
        <Text className="text-gray-400">▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View className="flex-1 justify-end">
            <View className="max-h-96 rounded-t-2xl bg-white">
              {/* Header */}
              <View className="border-b border-gray-200 p-5">
                <Text className="font-inter text-lg font-bold text-gray-900">
                  Chọn mẫu xe
                </Text>
              </View>

              {/* Items */}
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`border-b border-gray-100 p-5 ${
                      selectedValue === item.value ? 'bg-blue-50' : ''
                    }`}
                    onPress={() => {
                      onValueChange(item.value);
                      setIsOpen(false);
                    }}
                  >
                    <Text
                      className={`font-inter text-base ${
                        selectedValue === item.value
                          ? 'font-semibold text-blue-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                scrollEnabled
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
