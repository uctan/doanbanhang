import React from 'react'

import {
    SearchOutlined,
  } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponents/ButtonComponent';
import InputComponent from '../InputComponents/InputComponent';

const ButtonInputSearch = (props) => {
    
    const {size,placeholder,textButton, bordered, 
        backgroundColorInput = '#fff', 
        backgroundColorButton= 'rgb(13,92,182)',
       
        colorButton ='#fff'
    } = props
  return (
    <div style={{display : 'flex' }}>
        <InputComponent 
          size={size} 
          placeholder={placeholder} 
          bordered = {bordered}
          style={{ borderRadius: '0', backgroundColor:  backgroundColorInput}}
          {...props}
        />
      <ButtonComponent 
            size={size} 
            styleButton={{ borderRadius: '0', background: backgroundColorButton, border: bordered && 'none'  }}
            textButton={textButton}
            styleTextButton = {{color: colorButton}}
            icon={<SearchOutlined style={{ color: colorButton }} />}
        />
        
    </div>
  )
}

export default ButtonInputSearch