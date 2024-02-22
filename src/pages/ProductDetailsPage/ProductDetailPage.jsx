import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import  {useParams,useNavigate} from 'react-router-dom'

const ProductDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  return (
    <div style={{padding: '0 120px',background:'#efefef',marginTop:'-18px',width:'90%'}}>
      <h5><span style={{cursor: 'pointer',fontWeight:'bold'}} onClick={() => {navigate('/')}}>Trang chủ</span>  - Chi tiết sản phẩm</h5>
      
      <ProductDetailsComponent idProduct={id}/>
    </div>
  )
}

export default ProductDetailPage