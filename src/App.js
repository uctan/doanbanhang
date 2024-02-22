import React, { Fragment, useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes'
import DefaultComponents from './components/DefaultComponents/DefaultComponents'
import { isJsonString } from './ultils'
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import axios from 'axios'
// import { useQuery} from '@tanstack/react-query'
import {useDispatch} from 'react-redux' 
import { updateUser,resetUser } from './redux/slides/userSlide'
import {useSelector} from 'react-redux'
import Loading from './components/LoadingComponents/Loading'

function App() {
  const dispatch = useDispatch();
  const [isLoading,setIssLoading] = useState(false)
  const user = useSelector((state) => state.user)
 
  useEffect(() => {
    setIssLoading(true)
  const {storageData,decoded} = handleDecoded()
      if(decoded?.id){
        handleGetDetailsUser(decoded?.id,storageData)
      }
      setIssLoading(false)
  
 
  
  }, [])

  

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken =  jwtDecode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if(decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      }else {
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
         decoded = jwtDecode(storageData)
    }
    return {decoded,storageData}
  }
const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
  }
  


  // UserService.axiosJWT.interceptors.request.use(async(config) => {
  //   const currentTime = new Date()
  //   const { decoded } = handleDecoded()
  //   if(decoded?.exp < currentTime.getTime() / 1000) {
  //     const data = await UserService.refreshToken()
  //     config.headers['token'] = `Bearer ${data?.access_token}`
  //   }
  //   return config;
  // }, function (error) {
  //   return Promise.reject(error);
  // });

 
  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const ischeckAuth = !route.isPrivate || user.isAdmin
              // const ischeckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader  ? DefaultComponents : Fragment

              return (
                <Route
                key={route.path}
                path={ischeckAuth && typeof route.path === 'string' ? route.path : ''}
                element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App