import styled from 'styled-components'
import {Row} from 'antd'

export const WrapperHeader = styled(Row)`
padding : 10px 110px;
background-color : rgb(26,148,255);
align-items:center;
gap:16px;
flex-wrap:nowrap;
width:1270px;
padding:10px 0
`

export const WrapperImageHeader = styled.img`
width: 170px; 
height: 50px; 
cursor: pointer;
`
export const WrapperHeaderAccount = styled.div`
display: flex;
align-items: center;
color : #fff;
gap:15px;

`
export const WrappperTextHeaderSmall = styled.span`
font-size:12px;
color:#fff;
white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
cursor:pointer;
&:hover {
    color: rgb(26,148,255);
}
`


