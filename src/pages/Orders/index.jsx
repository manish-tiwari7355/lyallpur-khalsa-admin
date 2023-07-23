import { connect } from 'umi';
import Breadcrumbs from '@/components/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { history } from 'umi';
import OrderTable from './OrderTable';
import { Button, Tabs } from 'antd';
import BarCodeModal from './InvoiceModal';

function Orders({ dispatch, loading, currentUser, OrderList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const { TabPane } = Tabs;
  const [tab, setTab] = useState('ALL');
  const [barCodeModal, setBarCodeModal] = useState(false);
  const [orderType, setOrderType] = useState('');
  const [status, setStatus] = useState('');
  const getOrderList = () => {
    dispatch({
      type: 'order/orderList',
      payload: {
        query: {
          viewSize,
          startIndex,
          keyword: searchText,
          page: currentPage,
          type: orderType,
          status,
        },
      },
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (currentUser?._id || orderType) getOrderList();
  }, [currentUser, searchText, currentPage, orderType, status, viewSize, tab]);

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
                name: 'Orders',
                path: '/orders',
              },
            ]}
          />
        }
        primaryAction={
          <div className="gap-3">
            <Button
              size="middle"
              type="primary"
              onClick={() => {
                // setBarCodeModal(true);
                history.push('/orders/add');
              }}
            >
              Add Order
            </Button>
          </div>
        }
      >
        <BarCodeModal setBarCodeModal={setBarCodeModal} barCodeModal={barCodeModal} />
        <div className="bg-white rounded shadow mb-3 p-3">
          <Tabs
            activeKey={tab}
            onTabClick={(val) => {
              setTab(val);
              setSearchText('');
              setViewSize(10);
              setStartIndex(0);
              setCurrentPage(1);
            }}
          >
            <TabPane
              tab={
                <div
                  onClick={() => {
                    setOrderType('');
                    setStatus('');
                  }}
                  className="px-4"
                >
                  All
                </div>
              }
              key="ALL"
            >
              <OrderTable
                tableData={OrderList?.orderData}
                totalL={OrderList?.totalCount}
                currentPage={currentPage}
                startIndex={startIndex}
                viewSize={viewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setViewSize={setViewSize}
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
                categoryList={() => getOrderList()}
              />
            </TabPane>
            <TabPane
              tab={
                <div
                  onClick={() => {
                    setOrderType('offline');
                  }}
                  className="px-4"
                >
                  Cash/Carry
                </div>
              }
              key="CASH_CARRY"
            >
              <OrderTable
                tableData={OrderList?.orderData}
                totalL={OrderList?.totalCount}
                currentPage={currentPage}
                startIndex={startIndex}
                viewSize={viewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setViewSize={setViewSize}
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
                categoryList={() => getOrderList()}
              />
            </TabPane>
            <TabPane
              tab={
                <div
                  onClick={() => {
                    setOrderType('online');
                  }}
                  className="px-4"
                >
                  Online
                </div>
              }
              key="ONLINE"
            >
              <OrderTable
                tableData={OrderList?.orderData}
                totalL={OrderList?.totalCount}
                currentPage={currentPage}
                startIndex={startIndex}
                viewSize={viewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setViewSize={setViewSize}
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
                categoryList={() => getOrderList()}
              />
            </TabPane>
            <TabPane
              tab={
                <div
                  onClick={() => {
                    setOrderType('');
                    setStatus('pending');
                  }}
                  className="px-4"
                >
                  Pending
                </div>
              }
              key="PENDING"
            >
              <OrderTable
                tableData={OrderList?.orderData}
                totalL={OrderList?.totalCount}
                currentPage={currentPage}
                startIndex={startIndex}
                viewSize={viewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setViewSize={setViewSize}
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
                categoryList={() => getOrderList()}
              />
            </TabPane>
            <TabPane
              tab={
                <div
                  onClick={() => {
                    setOrderType('');
                    setStatus('processing');
                  }}
                  className="px-4"
                >
                  Processing
                </div>
              }
              key="PROCESSING"
            >
              <OrderTable
                tableData={OrderList?.orderData}
                totalL={OrderList?.totalCount}
                currentPage={currentPage}
                startIndex={startIndex}
                viewSize={viewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setViewSize={setViewSize}
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
                categoryList={() => getOrderList()}
              />
            </TabPane>
            <TabPane
              tab={
                <div
                  onClick={() => {
                    setOrderType('');
                    setStatus('shipped');
                  }}
                  className="px-4"
                >
                  Shipped
                </div>
              }
              key="SHIPPED"
            >
              <OrderTable
                tableData={OrderList?.orderData}
                totalL={OrderList?.totalCount}
                currentPage={currentPage}
                startIndex={startIndex}
                viewSize={viewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setViewSize={setViewSize}
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
              />
            </TabPane>
            <TabPane
              tab={
                <div
                  onClick={() => {
                    setOrderType('');
                    setStatus('delivered');
                  }}
                  className="px-4"
                >
                  Delivered
                </div>
              }
              key="DELIVERED"
            >
              <OrderTable
                tableData={OrderList?.orderData}
                totalL={OrderList?.totalCount}
                currentPage={currentPage}
                startIndex={startIndex}
                viewSize={viewSize}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setViewSize={setViewSize}
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
              />
            </TabPane>
          </Tabs>
        </div>
      </Page>
    </div>
  );
}
const mapStateToProps = ({ user, order, loading }) => ({
  currentUser: user?.currentUser,
  OrderList: order?.orderList,
  loading: loading.effects['order/orderList'],
});
export default connect(mapStateToProps)(Orders);
