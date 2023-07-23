import { useState, useEffect } from 'react';
import { getIntials } from '@/utils/utils';
import { Table, Row, Pagination, Input, Button, Avatar, notification } from 'antd';
import { useDispatch, connect, history } from 'umi';
import { debounce } from 'lodash';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';

const VendorTable = ({ getVendorsLoading, vendors }) => {
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { Search } = Input;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'event/getLeadScanners',
      payload: {
        query: {
          _limit: limit,
          _start: current - 1,
          // here "_start" is page number
          keyword: searchKeyword,
          // role: 'vendor',
        },
      },
    }).catch(() => {
      notification.error({
        message: 'Not able to fetch vendors',
      });
    });
  }, [current, dispatch, limit, searchKeyword]);
  const changePageSize = (page) => {
    setCurrent(page);
  };
  const action = (value) => {
    setSearchKeyword(value);
  };

  const getSubscription = (id) => {
    var plan = '-';
    switch (id) {
      case "STARTER_PLAN":
        plan = "Starter Plan"
        break;
      case "PREMIUM_PLAN":
        plan = "Premium Plan"
        break;
      case "PRO_PLAN":
        plan = "Pro Plan"
        break;
      default:
        plan = '-'
    }
    return plan;
  };

  const debounceSearch = debounce(action, 400);

  const columns = [
    {
      title: 'Sr. No.',
      align: 'center',
      render: (_, __, index) => <div>{((current-1) * limit) + index + 1}</div>,
    },
    {
      title: 'Name',
      align: 'left',
      dataIndex: 'name',
      render: (data, record) => (
        <div className="flex items-center">
          <div className="w-28">
            <Avatar
              className="bg-blue-800 w-8 uppercase"
              style={{
                backgroundColor: '#126E32',
              }}
            >
              {record && getIntials(`${data} ${data}`)}
            </Avatar>
          </div>

          <div className="ml-2 w-28">
            <div className="font-medium capitalize">{`${data}`}</div>
            {/* <div className="text-gray-600" style={{ fontSize: '12px' }}>
                  Since {moment(record?.created_at).format('LL')}
                </div> */}
          </div>
        </div>
      ),
    },

    {
      title: 'Email',
      align: 'left',
      dataIndex: 'email',
      render: (data) => (data ? <div>{data}</div> : '-'),
    },
    {
      title: 'Phone No.',
      align: 'left',
      dataIndex: 'phone',
      render: (data) => (data ? <div>{data}</div> : '-'),
    },
    {
      title: 'Company Name',
      align: 'left',
      dataIndex: 'company_name',
      render: (data) => (data ? <div>{data}</div> : '-'),
    },
    {
      title: 'Booth',
      align: 'left',
      dataIndex: 'booth',
      render: (data) => (data ? <div>{data}</div> : '-'),
    },
    {
      title: 'Subscription',
      align: 'left',
      dataIndex: 'subscriptionPlan',
      render: (data, record) => (
        <div className="flex items-center">
          <div className="ml-2 w-28">
            <div className="font-medium capitalize">{getSubscription(data) || '-'}</div>
          </div>
        </div>
      ),
    },

    {
      title: 'Action',
      align: 'center',
      dataIndex: '_id',
      render: (id, record) => (
        <Button
          type="primary mr-2"
          onClick={() => {
            history.push(`/vendors/partners/${id}`);
          }}
        >
          Partners
        </Button>
      ),
    },
  ];
  return (
    <div>
      <div className="">
        <Search
          size="large"
          placeholder="Enter keyword here to search..."
          onInput={(value) => debounceSearch(value.target.value)}
          enterButton
        />

        <Table
          scroll={{ x: 400 }}
          loading={getVendorsLoading}
          pagination={false}
          className="no-shadow zcp-fixed-w-table"
          rowClassName="cursor-pointer"
          rowKey={(record) => record._id}
          dataSource={vendors?.users}
          columns={columns}
          locale={{
            emptyText: (
              <div className="text-center pt-6 pb-2">
                <img src={SearchNotFound} alt="No vendors found!" style={{ height: '80px' }} />
                <p className="text-base  text-gray-600">No data found!</p>
              </div>
            ),
          }}
        />
        <div className="p-6 bg-gray-100">
          <Row className="mt-2" type="flex" justify="end">
            <Pagination
              current={current}
              onChange={changePageSize}
              showSizeChanger
              defaultPageSize={limit}
              pageSizeOptions={['10', '25', '50', '100']}
              onShowSizeChange={(e, p) => {
                setLimit(p);
              }}
              total={vendors?.total}
              showTotal={(total, range) => { return `${range[0]}-${range[1]} of ${total} items` }}
            />
          </Row>
        </div>
      </div>
    </div>
  );
};

export default connect(({ loading, event }) => ({
  getVendorsLoading: loading.effects['event/getVendors'],
  vendors: event.leadScanners,

}))(VendorTable);
