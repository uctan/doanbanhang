import React, { useEffect, useState } from 'react'
import { Col,Badge, Popover } from 'antd';

import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrappperTextHeaderSmall } from './style';
import {useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,

} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponents/Loading';
import { searchProduct } from '../../redux/slides/productSlide';

const HeaderComponents = ( {isHiddenSearch = false, isHiddenCart = false}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [loading,setLoading] = useState(false)
  const [userName,setUserName] = useState ('')
  const [userAvatar,setUserAvatar] = useState ('')
  const order = useSelector((state) => state.order)
  const [search,setSearch] = useState('')
  const [isOpenPopup,setIsOpenPopup] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const handleLogout = async() => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  },[user?.name,user?.avatar])


  const content = (
    <div>
     
      <WrapperContentPopup onClick={() => handleClickNavigate('profile') }>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('admin') } >Quản lí hệ thông</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('my-order') }>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user')
    }else if (type === 'admin'){
      navigate('/system/admin')
    }
    else if(type === 'my-order'){
      navigate('/my-order', { state : {
        id: user?.id,
        token: user?.access_token
      }
    })
    }else{
      handleLogout()
    }
    setIsOpenPopup(false)
  }
  const onSearch = (e) => {
    setSearch(e.target.value)
      dispatch(searchProduct(e.target.value))
  }
  return (
    <div style={{width:'100%',justifyContent:'center',background:'rgb(26,148,255)',display:'flex'}} >
          <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset'}}  >
            <Col span={5}>
              <WrapperTextHeader style={{cursor:'pointer'}} onClick={() => {navigate('/')}}>
              Nguyễn Trần Duy Tân
              </WrapperTextHeader>
            </Col>
            {!isHiddenSearch && (
              <Col span={13}>
                <ButtonInputSearch 
                    size = "large"
                    textButton = "Tìm kiếm"
                    placeholder="Nhập tên sản phẩm vào"  
                    onChange = {onSearch}
                  />
              </Col>
            )}
            <Col span={6}  style={{display: 'flex',gap: ' 54px', alignItems: 'center'}}>
              <Loading isLoading={loading}>

              
              <WrapperHeaderAccount>
                {userAvatar ? (
                  <img src={userAvatar} alt='avatar' style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />
                ) : (
                  <UserOutlined style={{fontSize: '30px'}} />
                )} 
                    {user?.access_token?(
                      <>
                          <Popover content={content}  trigger="click" open={isOpenPopup} >
                          <div style={{cursor: 'pointer'}} onClick={() => setIsOpenPopup((prev) => !prev )}>{userName?.length ? userName : user?.email}</div>
                          </Popover>
                      </>
                    ) : (
                      <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
                      <WrappperTextHeaderSmall>Đăng ký/ Đăng nhập</ WrappperTextHeaderSmall>
                      <div>
                        < WrappperTextHeaderSmall>Tài khoản</WrappperTextHeaderSmall>
                        <CaretDownOutlined />
                      </div>
                    </div>
                    )}
                    
                </WrapperHeaderAccount>
                </Loading>
                {!isHiddenCart && (
                  <div style={{whiteSpace:'nowrap',cursor:'pointer'}} onClick={() => navigate('/order')}>
                    <Badge count = {order?.orderItems?.length} size="small">
                      <ShoppingCartOutlined style={{fontSize: '30px',color : '#fff'}} />
                    </Badge>
                      <WrappperTextHeaderSmall> Giỏ hàng</ WrappperTextHeaderSmall>
                    
                </div>
                )}
                
            </Col>
            </WrapperHeader>
    </div>
  )
}

export default HeaderComponents