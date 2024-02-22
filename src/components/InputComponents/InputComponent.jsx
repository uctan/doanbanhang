import React from 'react'
import {Input} from 'antd'
const InputComponent = ({size,placeholder,style,bordered,...rests}) => {
  return (
    <Input
        
        size={size} 
        placeholder={placeholder} 
        bordered = {bordered}
        style={style}
        {...rests}
    />
  )
}

export default InputComponent