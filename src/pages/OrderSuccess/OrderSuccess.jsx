import {Checkbox, Form,Radio } from 'antd'
import React, { useEffect ,useMemo, useState } from 'react'
import { DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
import imag from '../../assets/images/1.png'
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style'
import InputComponent from '../../components/InputComponents/InputComponent'
import ModalComponent from '../../components/ModalComponents/ModalComponent'
import Loading from '../../components/LoadingComponents/Loading'
import ButtonComponent from '../../components/ButtonComponents/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as message from '../../components/Message/Message'
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide'
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { updateUser } from '../../redux/slides/userSlide'
import StepComponent from '../../components/StepComponent/StepComponent'
import { convertPrice } from '../../ultils'
import { Lable, WrapperContainer, WrapperCountOrder, WrapperInfo , WrapperItemOrder, WrapperItemOrderInfo, WrapperRadio, WrapperRight, WrapperTotal, WrapperValue } from './style'
import { orderContant } from '../../contant'



const OrderSuccess = () => {
    const order = useSelector((state) => state.order)
    const location = useLocation()
    const {state} = location
return (
    <div style={{background: '#f5f5fa', with: '100%', height: '100vh',marginTop:'-15px'}}>
        {/* <Loading isLoading={isLoadingAddOrder}> */}
     <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
        <h3>Đơn hàng đặt thành công</h3>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <WrapperContainer>
                    <WrapperInfo>
                        <WrapperValue>
                            <Lable>Phương thức giao hàng</Lable>
                                <div>
                                        <span style={{color: '#ea8500',fontWeight:'bold'}}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                                </div>
                        </WrapperValue>
                    </WrapperInfo>
                    <WrapperInfo>
                        <div>
                            <Lable>Phương thức thanh toán</Lable>
                            <WrapperValue>
                                    {orderContant.payment[state?.payment]}
                            </WrapperValue>
                        </div>
                    </WrapperInfo>
                    <WrapperItemOrderInfo>
                        {state.orders?.map((order) => {
                            return (
                                <WrapperItemOrder key={order?.product}>
                                    <div style={{width: '500px', display: 'flex', alignItems: 'center', gap: 4}}> 
                                    <img src={order.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                                    <div style={{
                                        width: 260,
                                        overflow: 'hidden',
                                        textOverflow:'ellipsis',
                                        whiteSpace:'nowrap'
                                    }}>{order?.name}</div>
                                    </div>
                                    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',gap:'10px'}}>
                                    <span>
                                        <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                                    </span>
                                    <span>
                                        <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                                    </span>
                                    </div>
                                </WrapperItemOrder>
                            )
                        })}
                    </WrapperItemOrderInfo>
                    <div>
                        <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
                    </div>
            </WrapperContainer>
        </div>
        </div>
    {/* </Loading> */}
    </div>
)
}

export default OrderSuccess