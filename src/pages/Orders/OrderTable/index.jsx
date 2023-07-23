/* eslint-disable no-underscore-dangle */
import EmptyStateContainer from '@/components/EmptyStateContainer';
import { Pagination, Table, Row, Input, Button, Tag } from 'antd';
import React, { useState } from 'react';
import { connect, history } from 'umi';
import { debounce } from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import UpdateStatusModal from './UpdateStatusModal';

const OrderTable = (props) => {
  const {
    currentPage,
    viewSize,
    tableData,
    setCurrentPage,
    setStartIndex,
    setViewSize,
    setSearchText,
    totalL,
    categoryList,
    loading,
  } = props;
  const [recordData, setRecordData] = useState('');
  const [statusVisible, setStatusVisible] = useState(false);

  // data === 'pending'
  // ? '#FAC3C3'
  // : data === 'processing'
  // ? '#fed8b1 '
  // : data === 'shipped'
  // ? '#D5BBFD '
  // : '#BBFDC8',
  // eslint-disable-next-line consistent-return
  const getColor = (role) => {
    switch (role) {
      case 'pending':
        return 'orange';

      case 'processing':
        return 'purple';
      case 'shipped':
        return 'blue';

      case 'delivered':
        return 'green';

      default:
        break;
    }
  };

  const categoryColumns = [
    {
      title: 'Sr.No.',
      key: 'Sr.No.',

      align: 'left',
      datIndex: '',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'Name',
      align: 'left',
      dataIndex: 'name',
      render: (data, record) => (
        <div className="capitalize " style={{ textAlign: 'left' }}>
          {record?.user?.firstName}
          {'   '}
          {record?.user?.lastName}
        </div>
      ),
    },
    {
      title: 'Order Id',
      align: 'left',
      dataIndex: 'orderId',
      render: (data) => <div className="uppercase"> {data}</div>,
    },

    {
      title: 'Status',
      align: 'left',
      dataIndex: 'status',
      render: (data) => <Tag color={getColor(data)}>{data}</Tag>,
    },

    {
      title: 'Total Amount',
      align: 'left',
      dataIndex: 'total',
      render: (data) => <div className="uppercase"> ${data.toFixed(2)}</div>,
    },
    {
      title: 'Pending Amount',
      align: 'left',
      dataIndex: 'total',
      render: (data, records) => (
        <div className="uppercase">
          {!!records?.paymentDetails === true
            ? `$${records?.paymentDetails?.payableAmount?.toFixed(2) || 0}`
            : '--'}{' '}
        </div>
      ),
    },

    {
      title: 'Payment Status',
      align: 'left',
      dataIndex: 'status',
      render: (data, records) => (
        <div className="uppercase "> {records?.paymentDetails?.status || '--'}</div>
      ),
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      datIndex: '',
      render: (_, records) => (
        <div className="flex gap-2 justify-center">
          <div className="cursor-pointer">
            <Button
              type="primary"
              size="small"
              onClick={() => history.push(`/orders/${records?._id}/detail`)}
            >
              View
            </Button>
          </div>
          <div className="cursor-pointer">
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setRecordData(records);
                setStatusVisible(true);
              }}
            >
              Update Status
            </Button>
          </div>
        </div>
      ),
    },
  ];

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
    // categoryList();
  }

  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);
  return (
    <div>
      <div>
        <div className="mb-2 flex">
          <Input
            size="large"
            onChange={(e) => debounceSearch(e.target.value)}
            placeholder="Enter order id "
            allowClear
          />
          <div>
            <Button className="w-full " type="primary" size="large">
              <SearchOutlined />
            </Button>
          </div>
        </div>
        <Table
          loading={loading}
          pagination={false}
          columns={categoryColumns}
          rowKey={(record) => record?._id}
          dataSource={tableData}
          // expandable={{
          //   expandedRowRender: (record) => <RenderInformation record={record} />,
          //   rowExpandable: (record) => record.subCategory.length > 0,
          // }}
          footer={() => (
            <Row className="mt-2" type="flex" justify="end">
              <Pagination
                key={`page-${currentPage}`}
                showSizeChanger
                pageSizeOptions={['10', '25', '50', '100']}
                onShowSizeChange={(e, p) => {
                  setViewSize(p);
                  setCurrentPage(1);
                  setStartIndex(0);
                }}
                defaultCurrent={1}
                current={currentPage}
                pageSize={viewSize}
                total={totalL || 0}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                onChange={handleChangePagination}
              />
            </Row>
          )}
          locale={{
            emptyText: <EmptyStateContainer type={'Orders'} />,
          }}
        />
      </div>
      <UpdateStatusModal
        visible={statusVisible}
        setVisible={setStatusVisible}
        recordData={recordData}
      />
    </div>
  );
};

export default connect(null)(OrderTable);
