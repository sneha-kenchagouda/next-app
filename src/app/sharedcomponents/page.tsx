'use client';

import { useState } from 'react';
import { InputWithButton } from '@/components/shared/InputWithButton';
import { Dropdown } from '@/components/shared/Dropdown';
import { DataTable } from '@/components/shared/DataTable';

export default function DemoPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    if (inputValue.trim()) {
      setShowDropdown(true);
      setShowTable(false); // Reset table visibility
    } else {
      alert('Please enter a search term first');
    }
  };

  const handleDropdownSelect = (item: { text: string; disabled?: boolean }) => {
    setSelectedOption(item.text);
    if (!item.disabled) {
      setShowTable(true);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'IBM Plex Sans, sans-serif'
    }}>
      <h1 style={{ marginBottom: '2rem' }}>Shared Components</h1>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Browse</h2>
        <InputWithButton 
          width="500px"
          inputProps={{
            id: 'search-input', // Added unique id
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
            placeholder: 'Enter your name',
            labelText: 'Enter your name'
          }}
          buttonProps={{
            onClick: handleButtonClick,
            children: 'Browse'
          }}
        />
      </div>
      
      {/* Conditionally render dropdown only after search */}
      {showDropdown && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Select an Option</h2>
          <Dropdown onChange={handleDropdownSelect} />
          {selectedOption && (
            <p style={{ marginTop: '1rem' }}>
              Selected: <strong>{selectedOption}</strong>
            </p>
          )}
        </div>
      )}
      
      {/* Conditionally render table only after dropdown selection */}
      {showTable && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Results</h2>
          <DataTable />
        </div>
      )}
    </div>
  );
}