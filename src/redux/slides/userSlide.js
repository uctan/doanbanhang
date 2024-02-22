import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email:'',
  phone:'',
  address: '',
  avatar :'',
  access_token: '',
  id:'',
  isLoading:false,
  // isAdmin:false
  isAdmin:false,
  city:'',
  refreshToken: ''
}


export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {

    updateUser:(state,action) => {
      const {name = '',email = '',access_token = '',address = '',phone = '',avatar = '', _id = '',isAdmin,city ='',refreshToken =''} = action.payload
      
      state.name = name ;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      state.city = city;
      state.refreshToken = refreshToken
      // state.isAdmin = isAdmin;
    },
    resetUser:(state) => {
      state.name ='';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = false;
      state.city = '';
      state.refreshToken = ''
    },

    
  },
})


export const { updateUser, resetUser, initialUser } = userSlide.actions;


export default userSlide.reducer