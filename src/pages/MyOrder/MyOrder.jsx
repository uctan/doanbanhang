import {Checkbox, Form } from 'antd'
import React, { useEffect ,useMemo, useState } from 'react'
import {useSelector} from 'react-redux'

import {useQuery} from '@tanstack/react-query'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponents/Loading'
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from './style'
import { convertPrice } from '../../ultils'
import ButtonComponent from '../../components/ButtonComponents/ButtonComponent'
import {useParams,useLocation,useNavigate} from 'react-router-dom'
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message'

const MyOrder = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {state} = location
  const fetchMyOrder = async () => {
    
      const res = await OrderService.getOrderbyUserId(state?.id, state?.token);
      return res.data;
    
  };
  const user = useSelector((state) => state.user)
  

  const queryOrder = useQuery({
  queryKey: ['orders'],
  queryFn: fetchMyOrder,
  enabled: Boolean(state?.id && state?.token)
});

  const mutation = useMutationHooks(
    (data) => {
      const { id, token , orderItems, userId } = data
      const res = OrderService.cancelOrder(id, token,orderItems, userId)
      return res
    }
  )
  const handleCanceOrder = (order) => {
    mutation.mutate({id : order._id, token:state?.token, orderItems: order?.orderItems, userId: user.id }, {
      onSuccess: () => {
        queryOrder.refetch()
      },
    })
  }
  const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation
  useEffect(() => {
    if (isSuccessCancel ) {
      message.success()
    } else if(isSuccessCancel ) {
      message.error(dataCancel?.message)
    }else if (isErrorCancle) {
      message.error()
    }
  }, [isErrorCancle, isSuccessCancel])
  const { isLoading, data } = queryOrder
  

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}> 
              <img src={order?.image} 
                style={{
                  width: '70px', 
                  height: '70px', 
                  objectFit: 'cover',
                  border: '1px solid rgb(238, 238, 238)',
                  padding: '2px'
                }}
              />
              <div style={{
                width: 260,
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
                marginLeft: '10px'
              }}>{order?.name}</div>
              <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
          })
  }
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`,{
      state : {
        token: state?.token
      }
    })
  }

  return (
    // <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
      <div style={{  width: '100%', height: '100%', marginTop: '20px' }}>
        <h4>Đơn hàng của tôi</h4>
        <WrapperListOrder>
          {data?.map((order) => {
            return (
              <WrapperItemOrder key={order?._id}>
                <WrapperStatus>
                  <span style={{fontSize: '14px',fontWeight: 'bold'}}>Trạng thái</span>
                  <div><span style={{color:'rgb(255,6,78'}}>Giao hàng: </span>{`${order.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</div>
                  <div><span style={{color:'rgb(255,6,78'}}>Giao hàng: </span>{`${order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</div>
                </WrapperStatus>
                {renderProduct(order.orderItems)}
                <WrapperFooterItem>
                  <div>
                    <span style={{color:'rgb(255,66,78)'}}>Tổng tiền: </span>
                    <span style={{color:'rgb(56,56,61)',fontWeight:700}}>
                        {convertPrice(order?.totalPrice)}
                    </span>
                  </div>
                  <div style={{display:'flex',gap:'10px'}}>
                    <ButtonComponent
                        onClick={() => handleCanceOrder(order)}
                        size={40}
                        styleButton={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px'
                        }}
                        textButton={'Hủy đơn hàng'}
                        styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px'
                        }}
                        textButton={'Xem chi tiết'}
                        styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                    
                  </div>
                </WrapperFooterItem>
              </WrapperItemOrder>
            )
          })}
        </WrapperListOrder>
      </div>
      </WrapperContainer>
    // </Loading>
  );
};

export default MyOrder;