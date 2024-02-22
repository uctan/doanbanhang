import React, { useEffect, useRef, useState } from 'react'
import slider1  from '../../assets/images/1.png'
import slider2  from '../../assets/images/2.png'
import slider3  from '../../assets/images/3.png'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent.jsx/CardComponent'
import {useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import {useSelector} from 'react-redux'
import Loading from '../../components/LoadingComponents/Loading'
import { useDebounce } from '../../hooks/useDebounce'


const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct,500)
  const [limit,setLimit] = useState(6)
  const [loading,setLoading] = useState(false)
  const [typeProduct,setTypeProduct] = useState([])
  const fetchProductAll = async (context) => {
    
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search,limit)
    // console.log('respr',res)
    // if(search.length > 0 || refSearch.current ) {
    //   setStateProducts(res.data)
    //   return []
    // }else{
      return res
    
  }

  // useEffect(() => {
  //   if(refSearch.current){
  //     setLoading(true)
  //     fetchProductAll(searchDebounce)
  //   }
  //   refSearch.current = true
  //         setLoading(false)

  // },[searchDebounce])

  const { data: products, isLoading, isPreviousData } = useQuery( {
  queryKey: ['product', limit, searchDebounce],
  queryFn: fetchProductAll,
  retry: 3,
  retryDelay: 1000,
  keepPreviousData: true, 
});
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK'){
        setTypeProduct(res?.data)
    }
  }
  // useEffect(() => {
  //   if(products?.data?.length > 0) {
  //     setStateProducts(products?.data)
  //   }
  // },[products])
  useEffect(() => {
    fetchAllTypeProduct()
  },[])
  
  return (
  <Loading isLoading={isLoading }>
    <div style={{width:'1270px',margin:'0 auto'}}> 
      <WrapperTypeProduct>
        {typeProduct.map((item) => {
          return (
            <TypeProduct name={item} key={item}/>
          )
        })}
      </WrapperTypeProduct>
    </div>
    <div className='body' style={{width:'100%',backgroundColor:'#efefef'}}>
    <div id="container" style={{height:'1000px',margin:'0 auto', width:'1270px'}}>
        <SliderComponent arrImages = {[slider1,slider2,slider3]} />
        <WrapperProducts>
          {products?.data?.map((product) => {
            return (
              <CardComponent
              key ={product._id} 
              countInStock={product.countInStock}
              description={product.description} 
              image ={product.image} 
              name={product.name}
              price = {product.price} 
              rating={product.rating} 
              type ={product.type}
              selled = {product.selled} 
              discount={product.discount}
              id ={product._id}
              />
            )
          })}
        </WrapperProducts>
          <div style={{width: '100%',display:'flex',justifyContent:'center',marginTop:'10px'}}>
              <WrapperButtonMore
              
              textButton="Xem Thêm"
              styleButton={{
                border: '1px solid rgb(11,116,229)',
                color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
                width :'240px', height :'38px',
                borderRadius: '4px'
                }}
                disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                styleTextButton={{fontWeight: 500,color: products?.total === products?.data?.length  && '#fff' }}
                onClick ={() => setLimit(prev => prev + 6)}
                />
          </div>
    </div>
    </div>
    
  </Loading>
  )
}

export default HomePage