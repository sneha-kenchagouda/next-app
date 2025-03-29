import { TextInput, Button } from '@carbon/react';
import React from 'react';

interface InputWithButtonProps {
  inputProps?: React.ComponentProps<typeof TextInput>;
  buttonProps?: React.ComponentProps<typeof Button>;
  width?: string;
}

export const InputWithButton = ({
  inputProps = { id: 'default-id', labelText: 'Default Label' },
  buttonProps = {},
  width = '400px'
}: InputWithButtonProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      width: width,
      alignItems: 'stretch' 
    }}>
      <TextInput 
        type="text" 
        style={{
          flex: 1,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          marginRight: 0 
        }}
        {...inputProps} 
      />
      <Button 
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginLeft: 0 
        }}
        {...buttonProps}
      >
        {buttonProps.children || 'Button'}
      </Button>
    </div>
  );
};