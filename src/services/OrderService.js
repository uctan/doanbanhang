import { axiosJWT } from "./UserService"


// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//     return res.data
// }
import axios from "axios";
export const createOrder = async (data,access_token) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/create`,data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getOrderbyUserId = async (id,access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`,{
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getDetailsOrder = async (id,access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const cancelOrder = async (id, access_token, orderItems, userId ) => {
  const data = {orderItems, orderId: id}
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`, {data}, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getAllOrder = async (access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all-orderadmin`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}