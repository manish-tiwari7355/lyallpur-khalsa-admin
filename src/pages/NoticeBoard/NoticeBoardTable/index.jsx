/* eslint-disable no-underscore-dangle */
import EmptyStateContainer from '@/components/EmptyStateContainer';
import { Pagination, Table, Row, Input, Button, Modal, Popconfirm, message, Tooltip } from 'antd';
import React from 'react';
import { connect, history } from 'umi';

import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { debounce } from 'lodash';

function NoticeBoardTable(props) {
  const {
    currentPage,
    viewSize,
    tableData,
    totalD,
    getAllNoticeBoardList,
    dispatch,
    setCurrentPage,
    setStartIndex,
    setViewSize,
    setSearchText,
    searchText,
    loading,
    previewImage,
    previewVisible,
    previewTitle,
    setPreviewVisible,
  } = props;

  console.log('tableData', tableData);

  const handleDelete = (val) => {
    dispatch({
      type: 'noticeBoard/deleteNoticeBoard',
      payload: {
        pathParams: { id: val },
      },
    })
      .then((res) => {
        if (res) {
          message.success('Notice Board Deleted successfully');
          getAllNoticeBoardList();
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 10);
  console.log(debounceSearch, 'debounceSearch');

  const noticeBoardColumns = [
    {
      title: 'S.No.',
      key: 'Sr.No.',
      width: 100,
      align: 'left',
      datIndex: '',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },

    {
      title: 'Title',
      key: 'title',
      width: 200,
      align: 'left',
      datIndex: '',
      render: (records) => <div className="capitalize">{records?.title}</div>,
    },
    {
      title: 'Description',
      key: 'description',
      align: 'left',

      render: (records) => (
        <>
          <div className="capitalize" dangerouslySetInnerHTML={{ __html: records?.description }} />
        </>
      ),
    },
    {
      title: 'Date',
      key: 'date',
      width: 200,
      align: 'left',
      datIndex: '',
      render: (records) => (
        <div className="capitalize">
          {records?.date ? moment(records?.date).format('YYYY-MM-DD') : '--'}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'left',

      render: (records) => (
        <div className="flex gap-4">
          <div>
            <Button
              type="link"
              size="small"
              style={{ padding: '0px 1px' }}
              onClick={() => history.push(`/noticeboard/edit/${records?._id}`)}
            >
              <EditOutlined />
            </Button>
          </div>
          <div>
            <Tooltip title="Delete">
              <Popconfirm
                title={
                  records?.isActive === true
                    ? 'Are you sure you want to deactivate?'
                    : 'Are you sure to delete this product?'
                }
                onConfirm={() => {
                  handleDelete(records?._id);
                }}
                okText="Confirm"
                cancelText="No"
                okType="danger"
              >
                <Button type="link" danger size="small" style={{ padding: '0px 1px' }}>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Tooltip>
          </div>

          <Modal
            width="1200px"
            title={previewTitle}
            // bodyStyle={{ height: 800 }}
            visible={previewVisible}
            footer={null}
            onCancel={() => setPreviewVisible(false)}
          >
            <iframe title="iframe" src={previewImage} style={{ width: '100%', height: 700 }} />
          </Modal>
        </div>
      ),
    },
  ];

  function handleChangePagination(cur) {
    setStartIndex(viewSize * (cur - 1));
    setCurrentPage(cur);
  }

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
          placeholder="Enter title to search noticeBoard "
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
        loading={loading}
        // eslint-disable-next-line no-underscore-dangle
        rowKey={(records) => records?._id}
        onRow={() => ({
          onClick: () => {},
        })}
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
              total={totalD || 0}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              onChange={handleChangePagination}
            />
          </Row>
        )}
        locale={{
          emptyText: <EmptyStateContainer type={'Notice Board'} />,
        }}
      />
    </div>
  );
}

export default connect(null)(NoticeBoardTable);
