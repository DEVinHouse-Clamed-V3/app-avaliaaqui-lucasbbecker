import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomCheckboxProps {
    label: string;
    isChecked: boolean;
    onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, isChecked, onChange }) => {
    return (
        <TouchableOpacity onPress={() => onChange(!isChecked)} style={styles.checkboxContainer}>
            <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
                {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkedCheckbox: {
        backgroundColor: '#fff',
    },
    checkmark: {
        color: '#000',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
    },
});

export default CustomCheckbox;