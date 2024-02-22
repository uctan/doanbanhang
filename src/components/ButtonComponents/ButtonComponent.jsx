import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rest }) => {
  return (
    <Button 
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton?.background, // Kiểm tra nếu styleButton không tồn tại
      }}
      size={size}
      disabled={disabled} 
      
      {...rest}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
