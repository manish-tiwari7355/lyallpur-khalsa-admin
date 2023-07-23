/* eslint-disable no-unused-vars */
import EmptyStateContainer from '@/components/EmptyStateContainer';
import {
  Pagination,
  Table,
  Row,
  Input,
  Button,
  Tag,
  Modal,
  message,
  Select,
  Drawer,
  Divider,
  Image,
} from 'antd';
import React, { useState } from 'react';
import { connect, useDispatch, useHistory } from 'umi';

import { debounce } from 'lodash';

import { SearchOutlined } from '@ant-design/icons';

function OrderTable(props) {
  const { Option } = Select;
  const {
    currentPage,
    startIndex,
    viewSize,
    acceptLoading,
    rejectLoading,
    tabName,
    setGetUsersMultipleData,
    tableData,
    setCurrentPage,
    setStartIndex,
    setViewSize,
    setSearchText,
    getProspectUsersList,
    loading,
    getUserOrder,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleReject, setIsModalVisibleReject] = useState(false);
  const [isModalAcceptVisible, setIsModalAcceptVisible] = useState(false);
  const [rejectionComment, setRejectionComment] = useState('');
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');

  const history = useHistory();
  const getColor = (type) => {
    switch (type) {
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
  const getColorTwo = (type) => {
    switch (type) {
      case 'pending':
        return 'orange';

      case 'paid':
        return 'green';
      case 'overdue':
        return 'red';

      default:
        break;
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setGetUsersMultipleData(selectedRows);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === '',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const tableAllColumns = [
    {
      title: 'Sr.No.',
      width: 80,
      align: 'left',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'Order ID',
      width: 100,
      align: 'left',
      render: (data, records) => <div> {records?.orderId}</div>,
    },
    {
      title: 'Full Name',
      width: 100,
      align: 'left',
      render: (data, records) => (
        <div className="uppercase">
          {' '}
          {records?.user?.firstName} {records?.user?.lastName}
        </div>
      ),
    },
    {
      title: 'Delivery Status',
      width: 100,
      align: 'left',
      render: (data, records) => (
        <Tag color={getColor(records?.status)}>
          <div className="uppercase">{records?.status}</div>
        </Tag>
      ),
    },
    {
      title: 'Payment Status',
      width: 100,
      align: 'left',
      render: (data, records) => (
        <Tag color={getColorTwo(records?.paymentDetails?.status)}>
          <div className="uppercase">{records?.paymentDetails?.status || '--'}</div>
        </Tag>
      ),
    },
    {
      title: 'Type',
      width: 100,
      align: 'left',
      render: (data, records) => <div className="uppercase"> {records?.type}</div>,
    },
    {
      title: 'Total Amount',
      width: 100,
      align: 'left',
      render: (data, records) => <div className="uppercase"> ${records?.total.toFixed(2)}</div>,
    },
    {
      title: 'Pending Amount',
      width: 100,
      align: 'left',
      render: (data, records) => (
        <div className="uppercase">
          {' '}
          {!!records?.paymentDetails === false
            ? '--'
            : `$${records?.paymentDetails?.payableAmount?.toFixed(2)}`}
        </div>
      ),
    },
    {
      title: 'Details',
      width: 100,
      align: 'left',
      render: (data, records) => (
        <div>
          {' '}
          <Button
            type="primary"
            size="small"
            onClick={() => history.push(`/orders/${records?._id}/detail`)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);
  return (
    <div>
      <div className="mb-2 flex">
        <Input
          size="large"
          onChange={(e) => debounceSearch(e?.target?.value)}
          placeholder="Enter name , eamail to search prospect user "
          allowClear
        />
        <div>
          <Button className="w-full " type="primary" size="large">
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        dataSource={tableData?.usersOrder
          // ?.filter((item) => !!item?.paymentDetails === false)
          ?.map((item) => {
            // eslint-disable-next-line no-underscore-dangle
            return { ...item, key: item?._id };
          })}
        columns={tableAllColumns}
        pagination={false}
        scroll={{ x: 900 }}
        loading={loading}
        sticky
        rowClassName="cursor-pointer"
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
              total={tableData?.totalCount || 0}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              onChange={handleChangePagination}
            />
          </Row>
        )}
        locale={{
          emptyText: <EmptyStateContainer type={' Orders '} />,
        }}
      />
    </div>
  );
}

const mapStateToProps = ({ loading }) => ({});
export default connect(mapStateToProps)(OrderTable);
