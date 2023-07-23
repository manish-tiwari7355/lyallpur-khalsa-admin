import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import MultiplePrintInvoices from '@/pages/Orders/MultiplePrintInvoices';
import { Button, message, Select } from 'antd';

import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { connect, useHistory, useParams } from 'umi';
import OrderTable from '../OrderTable';

function Orders({ geUsersOrder, dispatch, deleteloading }) {
  const { userId } = useParams();
  const { Option } = Select;
  const history = useHistory();

  const [getUsersMultipleData, setGetUsersMultipleData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [optionState, setOptionState] = useState('Bulk options');
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const componentRef = useRef();
  const pageStyle = `
  @page {
    size: 80mm 50mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

  const getUserOrder = () => {
    dispatch({
      type: 'order/getUserOrders',
      payload: {
        pathParams: { id: userId },
        query: {
          viewSize,
          startIndex,
          keyword: searchText,
          page: currentPage,
        },
      },
    }).then((res) => {
      console.log(res);
    });
  };
  const deleteOrderData = getUsersMultipleData?.map((item) => {
    return {
      // eslint-disable-next-line no-underscore-dangle
      _id: item?._id,
      paymentDetails: item.paymentDetails,
      productData: item?.productData,
    };
  });
  const deleteOrders = () => {
    if (deleteOrderData?.length > 0) {
      dispatch({
        type: 'order/deleteUserOrders',
        payload: {
          pathParams: { id: userId },
          body: {
            deleteOrderData,
          },
        },
      }).then((res) => {
        getUserOrder();
        message.success(res?.message);
        console.log(res);
        setOptionState('Bulk options');
      });
    } else if (deleteOrderData?.length === 0) {
      message.error('Please select on order');
    }
  };

  const onChange = (val) => {
    setOptionState(val);
    // eslint-disable-next-line default-case
    switch (val) {
      case 'Delete':
        return deleteOrders();

      case 'Add a payment':
        return history.push({
          pathname: '/users/addPayments',
          getUsersMultipleData,
        });
      // case 'Print':
      //   return (
      //     <ReactToPrint
      //       trigger={() => <Button>Print Invoice</Button>}
      //       content={() => componentRef.current}
      //     />
      //   );
      // // case 'Print':
      // //   return <MultiplePrintInvoices ref={componentRef} orderData={getUsersMultipleData} />;
      case 'distributor':
        return '';
    }
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  console.log('getUsersMultipleData', getUsersMultipleData);
  useEffect(() => {
    getUserOrder();
  }, [dispatch, userId, searchText, viewSize, startIndex, currentPage]);

  return (
    <div className="container mx-auto">
      <Page
        title="Orders"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Users',
                path: '/users',
              },
              {
                name: 'Orders',
                // path: `/orders`,
              },
            ]}
          />
        }
        primaryAction={
          <div>
            <Select
              disabled={!!(deleteOrderData?.length === 0 || geUsersOrder?.usersOrder?.length === 0)}
              size="large"
              showSearch
              value={optionState}
              placeholder={<div className="text-black">Bulk Actions</div>}
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              style={{ width: '180px' }}
            >
              <Option value="Send InVoices">
                <Button>Send InVoices</Button>
              </Option>
              <Option value="Add a payment">
                <Button>Add a payment</Button>
              </Option>
              <Option value="Delete">
                <Button loading={deleteloading} onClick={() => {}}>
                  Delete
                </Button>
              </Option>
            </Select>
          </div>
        }
      >
        <div style={{ display: 'none' }}>
          <MultiplePrintInvoices ref={componentRef} orderData={getUsersMultipleData} />;
        </div>
        <div className="bg-white rounded shadow mb-3 p-3">
          <OrderTable
            setGetUsersMultipleData={setGetUsersMultipleData}
            tableData={geUsersOrder}
            currentPage={currentPage}
            startIndex={startIndex}
            viewSize={viewSize}
            setCurrentPage={setCurrentPage}
            setStartIndex={setStartIndex}
            setViewSize={setViewSize}
            setSearchText={setSearchText}
            searchText={searchText}
            getUserOrder={() => getUserOrder()}
          />
        </div>
      </Page>
    </div>
  );
}

const mapStateToProps = ({ user, order, loading }) => ({
  currentUser: user?.currentUser,
  geUsersOrder: order?.geUsersOrder,
  loading: loading.effects['order/getUserOrders'],
  deleteloading: loading.effects['order/deleteUserOrders'],
});
export default connect(mapStateToProps)(Orders);
