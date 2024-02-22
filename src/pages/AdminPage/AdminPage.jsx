import React, { useState } from 'react'
import { Menu } from 'antd';
import { getItem } from '../../ultils';
import {SkinOutlined, UserOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import HeaderComponents from '../../components/HeaderComponents/HeaderComponents';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../OrderAdmin/OrderAdmin';
const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />, ),
    getItem('Sản phẩm', 'product', <SkinOutlined />,),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
    
  ];
  const [keySelected,setKeySelected] = useState('')

  const renderPage = (key) => {
    switch(key) {
      case 'user' :
        return (
          <AdminUser/>
        )
        case 'product' :
          return (
            <AdminProduct/>
          )
        case 'orders':
          return (
            <OrderAdmin />
          )
        default:
          return <></>
    }
 
  }

  const handleOnClick = ({  key }) => {
    setKeySelected(key)
  }

  return (
    <>
      <HeaderComponents isHiddenSearch isHiddenCart/>
      <div style={{display:'flex',overflow:'hidden'}}>
        <Menu
          mode="inline"

          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{flex:'1',padding:'15px'}}>
           {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage