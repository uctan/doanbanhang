import React, { useEffect, useRef, useState} from 'react' 
import { WrapperHeader, WrapperUploadFile } from './style'
import {Button} from 'antd'
import {UserAddOutlined,DeleteOutlined,UploadOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponents/InputComponent'
import {Modal, Form,Space} from 'antd'
import ModalComponent from '../ModalComponents/ModalComponent'
import {useSelector} from 'react-redux'
import * as message from '../../components/Message/Message'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useMutationHooks } from '../../hooks/useMutationHook'  
import {useQuery } from '@tanstack/react-query'

import * as UserService from '../../services/UserService'
import { getBase64 } from '../../ultils'
const AdminUser = () => {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [rowSelected,setRowSelected] = useState('')
  const [isOpenDrawer,setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate,setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete,setIsModalOpenDelete] = useState(false)

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const user = useSelector((state) => state?.user)
  // const [stateUser,setStateUser] = useState({
  //   name: '',
  //   email:'',
  //   phone: '',
  //   isAdmin: false,
  //   avatar:'',
  //   address:''
  // })

  const [stateUserDetails,setstateUserDetails] = useState({
    name: '',
    email:'',
    phone: '',
    isAdmin: false,
    avatar:'',
    address:''
  })
  const [form] = Form.useForm()
  
    const mutationUpdate = useMutationHooks(
      (data) => {
        const { id,
        token,
        ...rests
        } = data
        const res = UserService.updateUser(
          id,
          {...rests}, token,
        );
        return res  
    },
  )

    const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { 
      token,...ids
      } = data
      const res = UserService.deleteManyUser(
        ids,
        token,
      );
      return res  
  },
)

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
      token,
      } = data
      const res = UserService.deleteUser(
        id,
        token,
      );
      return res  
  },
)

  const getAllUsers = async () => {
    const res = await UserService.getAllUser()
    return res
  }

  const fetchGetDetailsUser = async () => {
    const res = await UserService.getDetailsUser(rowSelected)
    if(res?.data){
      setstateUserDetails({
        name: res?.data?.name,
        email:res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        address: res?.data?.address,
        avatar:res?.data?.avatar

      })
    }
    setIsLoadingUpdate(false);
  }
  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);
  useEffect(() => {
    if(rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  
  },[rowSelected,isOpenDrawer])

  const handleDetailsProduct = () => {
    // if(rowSelected) {
    //   setIsLoadingUpdate(true)
    //   // fetchGetDetailsProduct()
     
    // }
    setIsOpenDrawer(true)
  }


    const handleDeleteManyUser = (ids) => {
     mutationDeletedMany.mutate({ids: ids,token: user?.access_token},{
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const{data:dataUpdated,isLoading : isLoadingUpdated,isSuccess:isSuccessUpdated,isError: isErrorUpdated} = mutationUpdate
  const{data:dataDeleted,isLoading : isLoadingDeleted,isSuccess:isSuccessDeleted,isError: isErrorDeleted} = mutationDeleted
   const{data:dataDeletedMany,isLoading : isLoadingDeletedMany,isSuccess:isSuccessDeletedMany,isError: isErrorDeletedMany} = mutationDeletedMany
  const queryUser = useQuery({
    queryKey: ['user'],
    queryFn: getAllUsers,
  });
  const { isLoading: isLoadingUser, data: users } = queryUser

  // const handleCancel = () => {
  //   setIsModalOpen(false)
  //   setStateUser({
  //     name: '',
  //     email:'',
  //     phone: '',
  //     isAdmin: false,
      
  //   })
  //   form.resetFields()
  // };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
    setstateUserDetails({
      name: '',
      email:'',
      phone: '',
      isAdmin: false,
      
    })
    form.resetFields()
  };

  // const onFinish = () => {
  //   mutation.mutate(stateUser, {
  //     onSettled: () => {
  //       queryUser.refetch()
  //     }
  //   })
  //   console.log('finish',stateUser)
  // }
  // const handleOnchange = (e) => {
  //   setStateUser({
  //     ...stateUser,
  //     [e.target.name] : e.target.value
  //   })
  // }

  const handleOnchangeDetails = (e) => {
    setstateUserDetails({
      ...stateUserDetails,
      [e.target.name] : e.target.value
    })
  }



  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setstateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    })
  };
  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.accessToken, ...stateUserDetails }, {
      onSettled: () => {
        queryUser.refetch()
      }
    });
  }

  const renderAction =() => {
    return (
      <div>
        <DeleteOutlined style={{fontSize: '25px',cursor:'pointer'}} onClick={() => setIsModalOpenDelete(true)}  />
        <EditOutlined style={{fontSize: '25px',cursor:'pointer'}} onClick={handleDetailsProduct} />
      </div>
    )
  }
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
     {
      title: 'Address',
      dataIndex: 'address',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Quyền Admin',
      dataIndex: 'isAdmin',

      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        }, 
      ],

    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter:(a,b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
      // filters: [
      //   {
      //     text: '>= 50',
      //     value: '>=',
      //   },
      //   {
      //     text: '<= 50',
      //     value: '<=',
      //   },
      // ],

      // onFilter: (value, record) => {
      //   if(value === '>=')
      //   {
      //     return record.price >= 50
      //   }
      //   return record.price <=50
      //   // else if {
      //   //   return record.price <= 50
      //   // }
      // },
    },
     {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
      
    },
    
  ];

  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return {...user,key : user._id,isAdmin : user.isAdmin? 'TRUE': 'FALSE'
  }
  })

  // useEffect(() => {
  //   if(isSuccess) {
  //     message.success() // gọi message.success 
  //     handleCancel() 
  //   }else if (isError) {
  //     message.error() // gọi message.error
  //   }
  // },[isSuccess])

  useEffect(() => {
    if(isSuccessDeleted) {
      message.success() // gọi message.success 
      handleCancelDelete() 
    }else if (isErrorDeleted) {
      message.error() // gọi message.error
    }
  },[isSuccessDeleted])

    useEffect(() => {
    if(isSuccessDeletedMany) {
      message.success() // gọi message.success 
    }else if (isErrorDeletedMany) {
      message.error() // gọi message.error
    }
  },[isSuccessDeletedMany])

  useEffect(() => {
    if(isSuccessUpdated) {
      message.success() // gọi message.success 
      handleCloseDrawer() 
    }else if (isErrorUpdated) {
      message.error() // gọi message.error
    }
  },[isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  }
  const handleDeleteUser = () => {
    mutationDeleted.mutate({id: rowSelected,token: user?.access_token},{
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteMany={handleDeleteManyUser} columns={columns}  data={dataTable} isLoading={isLoadingUser} onRow ={(record,rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          }
        }} />
      </div>
        
      <DrawerComponent title="Chi tiết người dùng" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
      {/* <Loading isLoading={ isLoadingUpdated}> */}
      <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          onFinish={onUpdateUser}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên "
            name="name"
            rules={[{ required: true, message: 'Please input your type!' }]}
          >
            <InputComponent value={stateUserDetails.name} onChange = {handleOnchangeDetails} name="name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <InputComponent value={stateUserDetails.type} onChange = {handleOnchangeDetails} name="email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <InputComponent value={stateUserDetails.phone} onChange = {handleOnchangeDetails} name="phone" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <InputComponent value={stateUserDetails.address} onChange = {handleOnchangeDetails} name="address" />
          </Form.Item>

          

          <Form.Item
            label="Quyền Admin"
            name="isAdmin"
            rules={[{ required: true, message: 'Please input your isAdmin!' }]}
          >
            <InputComponent value={stateUserDetails.isAdmin} onChange = {handleOnchangeDetails} name="isAdmin"  />
          </Form.Item>
          
            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button icon={<UploadOutlined />}>Lựa chọn ảnh </Button>
                {stateUserDetails?.avatar && (
                <img
                  src={stateUserDetails?.avatar}
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft:'10px'
                  }}
                  alt="avatar"
                />
              )}
              </WrapperUploadFile>
            </Form.Item>

          <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
        {/* </Loading> */}
      </DrawerComponent>
     
      <ModalComponent foreRender title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
        {/* <Loading isLoading={isLoading}> */}
          <div>Bạn có chắc chắn là xóa người dùng không?</div>
        {/* </Loading> */}
      </ModalComponent>
    </div>
  )
}

export default AdminUser