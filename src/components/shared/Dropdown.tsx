import { Dropdown as CarbonDropdown } from '@carbon/react';
import React from 'react';

interface DropdownItem {
  text: string;
  disabled?: boolean;
}

interface DropdownProps {
  items?: DropdownItem[];
  width?: string;
  onChange?: (selectedItem: DropdownItem) => void;
}

export const Dropdown = ({
  items = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3 - a disabled item', disabled: true },
    { text: 'Option 4' },
    { text: 'Option 5' },
  ],
  width = '400px',
  onChange,
  ...props
}: DropdownProps) => {
  return (
    
      <CarbonDropdown
        id="default-dropdown"
        titleText="Dropdown label"
        helperText="This is some helper text"
        label="Choose an option"
        items={items}
        itemToString={item => item ? item.text : ''}
        onChange={({ selectedItem }) => {
          if (selectedItem) {
            onChange?.(selectedItem);
          }
        }}
        {...props}
      />
    
  );
};