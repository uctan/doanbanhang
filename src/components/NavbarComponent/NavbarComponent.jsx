import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTeValuext, WrapperTextPrice } from './style'
import {Checkbox,Rate} from 'antd'

const NavbarComponent = () => {
    const onChange = () => { }
    const renderContent = (type,options) => {
        switch(type) {
            case 'text':
                return options.map((options) =>{
                  
                       return (
                        <WrapperTeValuext>{options}</ WrapperTeValuext>
                       )
                   
                })
                case  'checkbox':
                    return (
                        <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '12px' }} onChange={onChange}>
                        {options.map((option) =>{
                            return (
                                <Checkbox style={{marginLeft : '0'}} value={option.value}>{option.label}</Checkbox>
                            )
                        })}                        
                  </Checkbox.Group> 
                    )
                    case 'star':
                        return options.map((option) => {
                      
                          return (
                            <div style={{display: 'flex', gap: '10px'}}>
                              <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                              <span>{`Từ ${option} sao`}</span>
                            </div>
                          );
                        }); 
                        case 'price':
                            return options.map((option, index) => (
                              <WrapperTextPrice
                               key={index} >
                                {option}
                              </WrapperTextPrice>
                            )); 
            default:
                return{}
        }
    }
  return (
    <div>
      <WrapperLableText><h4>Labble</h4> </WrapperLableText>
      <WrapperContent>
           {renderContent('text',['Tu lanh','TV','May Giat'])}
          
      </WrapperContent>
    
    </div>
  )
}

export default NavbarComponent