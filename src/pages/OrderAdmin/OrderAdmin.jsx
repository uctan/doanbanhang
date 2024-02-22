import React, { useEffect, useRef, useState} from 'react' 
import { WrapperHeader, WrapperUploadFile } from './style'
import {Button} from 'antd'
import {UserAddOutlined,DeleteOutlined,UploadOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons'


import {Modal, Form,Space} from 'antd'
import {useSelector} from 'react-redux'
import * as message from '../../components/Message/Message'
import { useMutationHooks } from '../../hooks/useMutationHook'  
import {useQuery } from '@tanstack/react-query'
import * as OrderService from '../../services/OrderService'
import * as UserService from '../../services/UserService'
import { convertPrice, getBase64 } from '../../ultils'
import TableComponent from '../../components/TableComponent/TableComponent'
import InputComponent from '../../components/InputComponents/InputComponent'
import { orderContant } from '../../contant'
import PieChartComponent from './PieChart'
const OrderAdmin = () => {

  const searchInput = useRef(null);

  const user = useSelector((state) => state?.user)


  
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }




  const queryOrder = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrder,
  });
  const { isLoading: isLoadingOrder, data: orders } = queryOrder
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
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
        // setTimeout(() => searchInput.current?.select(), 100);
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
      title: 'UserName',
      dataIndex: 'userName',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.email.length - b.email.length,
      ...getColumnSearchProps('phone')
    },
     {
      title: 'Address',
      dataIndex: 'address',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.address.length - b.address.length,
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.address.length - b.address.length,
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.address.length - b.address.length,
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (text) => <a>{text}</a>,
      sorter:(a,b) => a.address.length - b.address.length,
      ...getColumnSearchProps('totalPrice')
    },

  ];
    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    return {...order,key : order._id, userName: order?.shippingAddress?.fullName, phone : order?.shippingAddress?.phone,address: order?.shippingAddress?.address,
      paymentMethod:orderContant.payment[order?.paymentMethod],isPaid: order?.isPaid ? 'TRUE' : 'FALSE',isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',
      totalPrice: convertPrice(order?.totalPrice)
  }
  })

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{height: 200, width:200}}><PieChartComponent data={orders?.data}/></div>
      
      <div style={{ marginTop: '20px' }}>
        <TableComponent  columns={columns}  data={dataTable} isLoading={isLoadingOrder}  />
      </div>

    </div>
  )
}

export default OrderAdmin