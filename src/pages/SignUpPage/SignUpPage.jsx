import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponents/ButtonComponent'
import imageLogo from '../../assets/images/loginlogo.png'
import {useNavigate} from 'react-router-dom'
import {Image} from 'antd'
import {
  EyeFilled,
  EyeInvisibleFilled,
} from '@ant-design/icons';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import Loading from '../../components/LoadingComponents/Loading'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [isShowPassword,setIsShowPassword] = useState(false);
  const [isShowConfirmPassword,setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading] = useState(false)
  const handleOnchangeEmail = (value) => {
        setEmail(value)
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const{data,isSuccess,isError} = mutation
  useEffect (() => {
    if(isSuccess){
      message.success()
      handleNavigateSignIn()
    }else if (isError){
      message.error()
    }
  },[isSuccess,isError])

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
}
  
  const handleNavigateSignIn = () => {
   navigate('/sign-in')
  }

  const handleSignUp = () => {
    mutation.mutate({
      email,password,confirmPassword
    })
    
  }
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',background :'rgba(0,0,0,0.53)',height:'100vh'}}> 
    <div style={{width:'800px',height:'445px',borderRadius:'6px',background :'#fff',display:'flex'}}>
      < WrapperContainerLeft>
         <h1>Xin Chào</h1>
         <p>Đăng nhập và tạo tài khoản</p>
         <InputForm style={{marginBottom:'10px'}} placeholder ="abc@gmail.com" value={email}  
         onChange={handleOnchangeEmail}/>
         <div style={{position:'relative',marginBottom:'10px'}}>
          <span
           onClick={() => setIsShowPassword(!isShowPassword)}
          style={{
            zIndex: 10,
            position:'absolute',
            top:'12px',
            right:'8px',
            
          }}
          >{
            isShowPassword ? (
              <EyeFilled />
            ) : (
              <EyeInvisibleFilled />
            )
          }

          </span>
          <InputForm placeholder="Password" type={isShowPassword ? 'text' : 'password'} 
          value={password}  onChange={handleOnchangePassword} />
        </div>
        <div style={{position:'relative',marginBottom:'10px'}}>
          <span
          onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          style={{
            zIndex: 10,
            position:'absolute',
            top:'12px',
            right:'8px',
            
          }}
          >{
            isShowConfirmPassword ? (
              <EyeFilled />
            ) : (
              <EyeInvisibleFilled />
            )
          }

          </span>
          <InputForm placeholder="Confrim Password" type={isShowConfirmPassword ? 'text' : 'password'} 
          value={confirmPassword}  onChange={handleOnchangeConfirmPassword} />
        </div>
        {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
        <Loading isLoading={loading}>
        <ButtonComponent
        disabled={!email.length || !password.length || !confirmPassword.length}
                  onClick={handleSignUp}
               
                    size={40} 
                  styleButton={{ background: 'rgb(255,57,69)',
                  width : '100%',
                  height :'48px' ,
                   border:'none', 
                  borderRadius :'4px',
                  margin:'26px 0 10px'
                  }}
                  textButton={'Đăng Ký'}
                  styleTextButton = {{color: '#fff',fontSize:'15px',fontWeight:'700'}}>
                  
        </ ButtonComponent>
        </Loading>
       
        <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
        <p>Bạn đã có tài khoản ?<WrapperTextLight onClick={handleNavigateSignIn} >Đăng nhập</WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src ={imageLogo} preview={false} height="203px" width="203px"/>
        <h4>Mua sắm tại LTTD</h4>
      </WrapperContainerRight>

    </div>
    </div>
  )
}

export default SignUpPage