/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { getIntials } from '@/utils/utils';
import { Table, Row, Pagination, Input, Avatar } from 'antd';
import { connect } from 'umi';
import { debounce } from 'lodash';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';

const LeadsTable = ({ dispatch, loading, leadsData }) => {
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { Search } = Input;

  const getLeads = () => {
    dispatch({
      type: 'event/getLeads',
      payload: {
        query: {
          _limit: limit,
          _start: (current - 1) * limit,
          keyword: searchKeyword,
        },
      },
    });
  };
  useEffect(() => {
    getLeads();
  }, [current, limit, searchKeyword]);
  const changePageSize = (page) => {
    setCurrent(page);
  };
  const action = (value) => {
    setSearchKeyword(value);
  };

  const debounceSearch = debounce(action, 400);

  const columns = [
    {
      title: 'Sr. No.',
      align: 'center',
      render: (_, __, index) => <div>{(current - 1) * limit + (index + 1)}</div>,
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
                backgroundColor: '#32727A',
              }}
            >
              {record && getIntials(`${record.visitor.name}`)}
            </Avatar>
          </div>
          <div className="ml-2 w-28">
            <div className="font-medium capitalize">{`${record.visitor.name}`}</div>
          </div>
        </div>
      ),
    },

    {
      title: 'Email',
      align: 'left',
      dataIndex: 'email',
      render: (data, record) => <div>{record.visitor.email || 'N/A'}</div>,
    },
    {
      title: 'Phone No.',
      align: 'left',
      dataIndex: 'mobile',
      render: (data, record) => <div>{record.visitor.mobile || 'N/A'}</div>,
    },
    {
      title: 'Company Name',
      align: 'left',
      dataIndex: 'company_name',
      render: (data, record) => <div>{record.visitor.company_name || 'N/A'}</div>,
    },
    {
      title: 'Booth',
      align: 'left',
      dataIndex: 'booth',
      render: (data, record) => <div>{record.visitor.booth || 'N/A'}</div>,
    },
  ];

  return (
    <div className="">
      <Search
        size="large"
        placeholder="Enter keyword here to search..."
        onInput={(value) => debounceSearch(value.target.value)}
        enterButton
      />

      <Table
        scroll={{ x: 400 }}
        loading={loading}
        pagination={false}
        className="no-shadow zcp-fixed-w-table"
        rowClassName="cursor-pointer"
        rowKey={(record) => record._id}
        dataSource={leadsData?.leads}
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
            total={leadsData?.total || 0}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          />
        </Row>
      </div>
    </div>
  );
};

export default connect(({ loading, event }) => ({
  loading: loading.effects['event/getLeads'],
  leadsData: event.leads,
}))(LeadsTable);
