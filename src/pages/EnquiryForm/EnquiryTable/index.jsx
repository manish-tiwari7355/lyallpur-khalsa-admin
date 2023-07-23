import React from 'react';

import { Table, Input, Button } from 'antd';
import { connect } from 'umi';

import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { debounce } from 'lodash';

const EnuiryTable = (props) => {
  const { tableData, setSearchText, searchText, startIndex, setStartIndex } = props;
  console.log('tableData', tableData);

  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 100);
  console.log(debounceSearch, 'debounceSearch');

  const noticeBoardColumns = [
    {
      title: 'S.No.',
      key: 'Sr.No.',
      width: 50,
      align: 'left',
      datIndex: '',
      render: (_, __, index) => <div> {index + 1}</div>,
    },

    {
      title: 'Name',
      key: 'name',
      width: 150,
      align: 'left',
      datIndex: '',
      render: (records) => (
        <div className="capitalize">{`${records?.firstName} ${records?.lastName}`}</div>
      ),
    },
    {
      title: 'Phone',
      key: 'phone',
      width: 150,
      align: 'left',
      datIndex: '',
      render: (records) => <div className="capitalize">{records?.phone}</div>,
    },
    {
      title: 'Email',
      key: 'email',
      width: 50,
      align: 'left',
      datIndex: '',
      render: (records) => <div className="capitalize">{records?.email}</div>,
    },

    {
      title: 'Message',
      key: 'message',
      align: 'left',
      width: 200,
      render: (records) => (
        <>
          <div className="capitalize" dangerouslySetInnerHTML={{ __html: records?.message }} />
        </>
      ),
    },
    {
      title: 'Date',
      key: 'date',
      width: 100,
      align: 'left',
      datIndex: '',
      render: (records) => (
        <div className="capitalize">
          {records?.createdAt ? moment(records?.createdAt).format('YYYY-MM-DD') : '--'}
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="mb-2 flex">
        <Input
          size="large"
          value={searchText}
          onChange={(e) => {
            // setSearchText(e.target.value);
            debounceSearch(e.target.value);
          }}
          placeholder="Enter Email to search Enquiry "
          allowClear
        />
        <div>
          <Button className="w-full " type="primary" size="large">
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <Table
        className="cursor-pointer "
        dataSource={tableData || []}
        columns={noticeBoardColumns}
        pagination={false}
        scroll={{ x: 900 }}
        // loading={loading}
        // eslint-disable-next-line no-underscore-dangle
        rowKey={(records) => records?._id}
        // onRow={() => ({
        //   onClick: () => {},
        // })}
        // footer={() => (
        //   <Row className="mt-2" type="flex" justify="end">
        //     <Pagination
        //       key={`page-${currentPage}`}
        //       showSizeChanger
        //       pageSizeOptions={['10', '25', '50', '100']}
        //       onShowSizeChange={(e, p) => {
        //         setViewSize(p);
        //         setCurrentPage(1);
        //         setStartIndex(0);
        //       }}
        //       defaultCurrent={1}
        //       current={currentPage}
        //       pageSize={viewSize}
        //       total={totalD || 0}
        //       showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        //       onChange={handleChangePagination}
        //     />
        //   </Row>
        // )}
        // locale={{
        //   emptyText: <EmptyStateContainer type={'Notice Board'} />,
        // }}
      />
    </div>
  );
};

export default connect(null)(EnuiryTable);
