import React, { useEffect, useMemo, useState } from 'react'
import {Row , Col, Image,Rate} from 'antd'
import imageProduct from '../../assets/images/1.png'
import imageSmall from '../../assets/images/1.png'
import { WrapperAddressProduct,  WrapperCollStyleImage, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuanlityProduct, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import {
    StarFilled,
    PlusOutlined,
    MinusOutlined,
    
     
} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponents/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import * as message from '../Message/Message'
import {useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponents/Loading'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate,useLocation} from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice, initFacebookSDK } from '../../ultils'
import LikeButtonComponent from '../LikeButtonCompponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'
const ProductDetailsComponent = ({idProduct}) => {
  const [numProduct,setNumProduct] = useState(1)
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [errorLimitOrder,setErrorLimitOrder] = useState(false)
  const onChange = (value) => {
    setNumProduct(Number(value))
  }

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if(id){
      const res = await ProductService.getDetailsProduct(id)
      return res.data
    }
  }

  const handleChangeCount = (type,limited) => {
  if(type === 'increase') {
            if(!limited) {
                setNumProduct(numProduct + 1)
            }
        }else {
            if(!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }

  const { data: productsDetail, isLoading } = useQuery({
    queryKey: ['product-details',idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct
    // keepPreviousData: true, 
  });
  useEffect(() => {
    initFacebookSDK()
  },[])
  useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productsDetail?._id) 
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productsDetail?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if(productsDetail?.countInStock === 0){
            setErrorLimitOrder(true)
        }
    },[numProduct])
  useEffect(() => {
    if(order.isSucessOrder){
      message.success('Đã thêm vào giỏ hàng')
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);
  const handleAddOrderPage = () => {
    if(!user?.id){
      navigate('/sign-in',{state: location?.pathname})
    }else{
      //  {
      //       name:{type:String,required:true},
      //       amount: {type:Number,required:true},
      //       price:{type:String,required:true},
      //       product: {
      //           type:mongoose.Schema.Types.ObjectId,
      //           ref:'Product',
      //           required:true,
      //       },
      //   },
      const orderRedux = order?.orderItems?.find((item) => item.product === productsDetail?._id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && productsDetail?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productsDetail?.name,
                        amount: numProduct,
                        image: productsDetail?.image,
                        price: productsDetail?.price,
                        product: productsDetail?._id,
                        discount: productsDetail?.discount,
                        countInstock: productsDetail?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
      }
      
  return (
    
    // <Loading isLoading={isLoading}>
      <Row style={{padding:'16px',background:'#fff',borderRadius:'4px'}} >
          <Col span={10} style={{borderRight:'1px solid #e5e5e5',paddingRight:'8px'}}>
              <WrapperStyleImageSmall 
                src={productsDetail?.image} alt ="image products"  preview ={false}/>
              <Row style={{paddingTop:'10px',justifyContent:'space-between'}}>
                <WrapperCollStyleImage  span={4}>
                  <Image src={productsDetail?.image} alt ="image small"  preview ={false}/>
                </WrapperCollStyleImage>
                <WrapperCollStyleImage  span={4}>
                  <Image src={productsDetail?.image} alt ="image small"  preview ={false}/>
                </WrapperCollStyleImage>
                <WrapperCollStyleImage  span={4}>
                  <Image src={productsDetail?.image} alt ="image small"  preview ={false}/>
                </WrapperCollStyleImage>
                <WrapperCollStyleImage  span={4}>
                  <Image src={productsDetail?.image} alt ="image small"  preview ={false}/>
                </WrapperCollStyleImage>
                <WrapperCollStyleImage  span={4}>
                  <Image src={productsDetail?.image} alt ="image small"  preview ={false}/>
                </WrapperCollStyleImage>
                
              </Row>
          </Col>
          <Col span={14} style={{  paddingLeft: '14px' }} >
              <WrapperStyleNameProduct>
                  {productsDetail?.name}
                  <div>
                    <Rate allowHalf defaultValue={productsDetail?.rating} value={productsDetail?.rating} />
                    <WrapperStyleTextSell>| Đã bán hơn 1000</WrapperStyleTextSell>
                  </div>
                  <WrapperPriceProduct>
                    < WrapperPriceTextProduct>
                      {convertPrice(productsDetail?.price) }
                    </WrapperPriceTextProduct>
                  </WrapperPriceProduct>
              </WrapperStyleNameProduct>
              <WrapperAddressProduct>
                    <span>Giao đến</span>
                    <span className='address'>
                      {user?.address}
                    </span>
                    <span className='change-address'>Đổi địa chỉ</span>
              </WrapperAddressProduct>
              <LikeButtonComponent
                dataHref ={process.env.REACT_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/" : window.location.href} />
            <div style={{margin : ' 10px 0 20px',borderBottom:'1px solid #e5e5e5',borderTop:'1px solid #e5e5e5',padding:'10px 0'}}>
                <div style={{marginBottom:'10px'}}>Số lượng</div>
                <WrapperQuanlityProduct>
                    <button style={{border:'none',background: 'transparent',cursor:'pointer'}}  onClick={() => handleChangeCount('decrease')} >
                    <MinusOutlined style={{ color: '#000',fontSize:'20px' }} size="10px"/>
                    </button>
                    <WrapperInputNumber style={{width:'80px',height:'25px'}} min={1} max={productsDetail?.countInStock} defaultValue={1}  onChange={onChange} value={numProduct} size="small"/>
                    <button style={{border:'none',background:'transparent',cursor:'pointer'}}  onClick={() => handleChangeCount('increase')}>
                    <PlusOutlined style={{ color: '#000',fontSize:'20px' }} size="10px"/>
                    </button>
                </WrapperQuanlityProduct>
              </div>
              <div style={{display : 'flex',alignItems:'center',gap:'12px'}}>
                <div>
                    <ButtonComponent
                      size={40} 
                        styleButton={{ background: 'rgb(255,57,69)',width : '220px',height :'48px' , 
                        border:'none', borderRadius :'4px' }}
                        onClick = {handleAddOrderPage}
                        textButton={'Chọn mua'}
                        styleTextButton = {{color: '#fff',fontSize:'15px',fontWeight:'700'}}>
                    
                    </ ButtonComponent>
                    {errorLimitOrder && <div style={{color: 'red'}}>San pham het hang</div>}
                </div>
                <ButtonComponent
                
                  size={40} 
                    styleButton={{ background: '#fff',width : '220px',height :'48px' , border:'1px solid rgb(13,92,182)', borderRadius :'4px' }}
                    textButton={'Mua trả sau'}
                    styleTextButton = {{color: 'rgb(19,92,182)',fontSize:'15px'}}>
                
                </ ButtonComponent>
              </div>
              
          </Col>
          <CommentComponent
            dataHref={process.env.REACT_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/comments#configurator": window.location.href} width= "1220" />
      </Row>
      
    // </Loading>
  )
}


export default ProductDetailsComponent