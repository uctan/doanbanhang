import React from 'react'
import logo from '../../assets/images/save.png'
import {useNavigate} from 'react-router-dom'
import {
    StarFilled
} from '@ant-design/icons';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';
import { convertPrice } from '../../ultils';
const CardComponent = (props) => {
  const {countInStock,description,image,name,price,rating,type,selled,discount,id} = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    <div>
        <WrapperCardStyle
            hoverable
            headStyle={{width:'200px',height:'200px'}}
            style={{ width: 200 }}
            bodyStyle={{padding: '10px'}}
            cover={<img alt="example" src={image} />}
            onClick={() =>  handleDetailsProduct(id)}
        >
              <WrapperImageStyle 
                src={logo} 
                style={{width: '70px',height:'16px',position: 'absolute',top:'-1',left:'-1',borderTopLeftRadius:'3px'}}
              />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{marginRight: '4px'}}>
                  <span>{rating}</span>
                  <StarFilled style={{fontSize: '12px',color:'yellow'}}/>
                </span>
                <WrapperStyleTextSell>
                    | Đã bán {selled || 1000}+
                </WrapperStyleTextSell>
            </WrapperReportText> 
            <WrapperPriceText>
                <span style={{marginRight:'8px'}}>{convertPrice(price)}</span>
                < WrapperDiscountText>
                - {discount || 5} %
                </WrapperDiscountText>
              </WrapperPriceText>
          </WrapperCardStyle>
    </div>
  )
}

export default CardComponent