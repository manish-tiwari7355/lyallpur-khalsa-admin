/* eslint-disable no-underscore-dangle */
import EmptyStateContainer from '@/components/EmptyStateContainer';
import { Table, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';

import dayjs from 'dayjs';

function TaxTable(props) {
  const {
    currentPage,
    viewSize,
    tableData,
    // totalD,
    // setCurrentPage,
    // setStartIndex,
    // setViewSize,
  } = props;

  const productColumns = [
    {
      title: 'S.No.',
      key: 'Sr.No.',
      width: 100,
      align: 'left',
      datIndex: '',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },

    {
      title: 'Payment First Date',
      width: 200,

      align: 'left',
      datIndex: '',
      render: (records) => (
        <div className="capitalize">{dayjs(records?.paymentFirstDate).format('MMMM D, YYYY')}</div>
      ),
    },
    {
      title: 'Payment Second Date',
      align: 'left',

      render: (records) => (
        <>
          <div className="capitalize">{dayjs(records?.paymentLastDate).format('MMMM D, YYYY')}</div>
        </>
      ),
    },
    {
      title: 'Total Amount',
      align: 'left',

      render: (records) => (
        <>
          <div className="capitalize">${records?.totalAmount?.toFixed(2)}</div>
        </>
      ),
    },
    {
      title: 'Tax paid',
      align: 'left',

      render: (records) => (
        <>
          <div className="capitalize">${records?.totalTax}</div>
        </>
      ),
    },
    {
      title: 'Status',
      align: 'left',

      render: (records) => (
        <>
          <Button className="capitalize" type="primary">
            Paid
          </Button>
        </>
      ),
    },
  ];

  // const debounceSearch = debounce(action, 500);
  return (
    <div>
      <div className="mb-2 flex">
        {/* <Input
          size="large"
          // value={searchText}
          onChange={(e) => {
            // setSearchText(e.target.value);
            // debounceSearch(e.target.value);
          }}
          placeholder="Enter name to search product "
        />
        <div>
          <Button className="w-full " type="primary" size="large">
            <SearchOutlined />
          </Button>
        </div> */}
      </div>
      <Table
        className="cursor-pointer "
        dataSource={tableData || []}
        columns={productColumns}
        pagination={false}
        scroll={{ x: 900 }}
        // eslint-disable-next-line no-underscore-dangle
        rowKey={(records) => records?._id}
        onRow={() => ({
          onClick: () => {},
        })}
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
        //       // onChange={handleChangePagination}
        //     />
        //   </Row>
        // )}
        locale={{
          emptyText: <EmptyStateContainer type={'Payment'} />,
        }}
      />
    </div>
  );
}

export default connect(null)(TaxTable);
