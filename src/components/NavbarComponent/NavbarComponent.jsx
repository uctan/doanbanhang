import React, { useEffect, useState } from 'react';
import { WrapperContent, WrapperLableText, WrapperTextPrice } from './style';
import { Checkbox, Rate } from 'antd';
import TypeProduct from '../../components/TypeProduct/TypeProduct'; 
import * as ProductService from '../../services/ProductService';

const NavbarComponent = () => {
  const [typeProduct, setTypeProduct] = useState([]);
  
  const onChange = () => { };

  // Hàm lấy tất cả loại sản phẩm từ API
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProduct(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option, index) => (
          <TypeProduct key={index} name={option} />
        ));
      case 'checkbox':
        return (
          <Checkbox.Group
            style={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '12px' }}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <Checkbox style={{ marginLeft: '0' }} key={index} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      case 'star':
        return options.map((option, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px' }}>
            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
            <span>{`Từ ${option} sao`}</span>
          </div>
        ));
      case 'price':
        return options.map((option, index) => (
          <WrapperTextPrice key={index}>{option}</WrapperTextPrice>
        ));
      default:
        return null;
    }
  };

  return (
    <div>
      <WrapperLableText>
        <h4>Tìm kiếm</h4>
      </WrapperLableText>
      <WrapperContent>
        {/* Hiển thị danh sách sản phẩm từ API */}
        {renderContent('text', typeProduct)}
        {renderContent('star', [1, 2, 3, 4, 5])}
        {renderContent('price', ['Dưới 1 triệu', '1 - 3 triệu', '3 - 5 triệu'])}
      </WrapperContent>
    </div>
  );
};

export default NavbarComponent;
