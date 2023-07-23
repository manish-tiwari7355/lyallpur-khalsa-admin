/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
// import { getIntials } from '@/utils/utils';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Table,
  Row,
  Pagination,
  Input,
  Button,
  Avatar,
  DatePicker,
  Popconfirm,
  Tag,
  Select,
  message,
} from 'antd';
import { CSVLink } from 'react-csv';
import { Link, useSelector, useDispatch, connect } from 'umi';
import { cloneDeep, debounce } from 'lodash';
import { QuestionCircleOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { getInitials } from '@/utils/common';
import { resendUserEmail } from '@/services/event';

const RegisterTable = ({ loading, setSelectedRows, updatedRows }) => {
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [eventYear, setEventYear] = useState(moment().year());
  const [dataSource, setDataSource] = useState([]);
  const [isPrinted, setIsPrinted] = useState('all');
  const [csvRecords, setCsvRecords] = useState([{}]);
  const { Search } = Input;
  const { registeredLists, deleteVisitor } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const deleteRegistration = (id) => {
    dispatch({
      type: 'event/deleteRegistration',
      payload: {
        pathParams: {
          id,
        },
      },
    });
  };

  useEffect(() => {
    if (updatedRows.length > 0) {
      const updatedIds = updatedRows.map((item) => item._id);
      const items = dataSource.map((item) => {
        if (updatedIds.includes(item._id)) {
          return { ...item, isCardPrinted: true };
        }
        return item;
      });
      setDataSource(items);
    }
  }, [updatedRows]);

  const renderActionButton = (record) => {
    return (
      <Popconfirm
        placement="topRight"
        icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
        title="Are you sure you want to delete this entry?"
        onConfirm={(e) => {
          deleteRegistration(record._id);
          e.stopPropagation();
        }}
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        onCancel={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          type="danger"
          ghost
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    );
  };
  const getData = () =>
    dispatch({
      type: 'event/getVisitors',
      payload: {
        query: {
          _limit: limit,
          _start: (current - 1) * limit,
          keyword: searchKeyword,
          year: eventYear,
          startDate: moment()?.set('year', eventYear).startOf('year').toISOString(),
          endDate: moment().set('year', eventYear).endOf('year').toISOString(),
          printed: isPrinted,
        },
      },
    }).then((res) => setDataSource(cloneDeep(res.allList)));
  useEffect(() => {
    getData();
    dispatch({
      type: 'event/getVisitors',
      payload: {
        query: {
          _limit: 10000000000,
          _start: 0,
          keyword: searchKeyword,
          year: eventYear,
          startDate: moment()?.set('year', eventYear).startOf('year').toISOString(),
          endDate: moment().set('year', eventYear).endOf('year').toISOString(),
          printed: isPrinted,
        },
      },
    }).then((res) => {
      const data = cloneDeep(res.allList).map((item) => ({
        name: item.name,
        email: item.email,
        phone: item.phone,
        company: item.company_name,
        cardPrinted: item.isCardPrinted ? 'Yes' : 'No',
        designation: item.type,
      }));
      setCsvRecords(data);
    });
  }, [limit, current, searchKeyword, dispatch, eventYear, deleteVisitor, isPrinted]);

  const changePageSize = (page) => {
    setCurrent(page);
  };
  const action = (value) => {
    setSearchKeyword(value);
  };
  const resendEmail = (id) => {
    resendUserEmail({
      pathParams: {
        id,
      },
    })
      .then((res) => {
        message.success('Email has been sent successfully');
      })
      .catch((err) => {
        message.error('Email sending failed');
      });
  };
  const debounceSearch = debounce(action, 400);

  const columns = [
    {
      title: 'Sr. No.',
      align: 'center',
      render: (_, __, index) => <div>{(current - 1) * limit + index + 1}</div>,
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
              {record && getInitials(data)}
            </Avatar>
          </div>

          <div className="ml-2 w-28">
            <div className="font-medium capitalize">{`${data}`}</div>
            {record.isCardPrinted ? (
              <Tag color="green">
                <CheckOutlined /> Printed
              </Tag>
            ) : null}
          </div>
        </div>
      ),
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      align: 'left',
      render: (data) => <div>{data}</div>,
    },
    {
      title: 'Phone',
      align: 'left',
      dataIndex: 'phone',
      render: (data) => (data ? <div>{data}</div> : 'N/A'),
    },
    {
      title: 'Email',
      align: 'left',
      dataIndex: 'email',
      render: (data) => (data ? <div>{data}</div> : 'N/A'),
    },
    {
      title: 'Job Title',
      align: 'left',
      dataIndex: 'type',
      render: (data) => (data ? <div>{data}</div> : 'N/A'),
    },
    {
      title: 'Action',
      align: 'center',
      dataIndex: '_id',
      render: (id, record) => (
        <div className="flex ">
          <Button type="primary" ghost className="mr-2" onClick={() => resendEmail(record?._id)}>
            Resend
          </Button>
          <Link to={`/visitors/${id}`} className="mr-2">
            <Button type="primary" ghost>
              View
            </Button>
          </Link>
          {renderActionButton(record)}
        </div>
      ),
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };
  return (
    <div>
      <div className="">
        <div style={{ position: 'sticky', top: '135px', zIndex: 10 }}>
          <Search
            size="large"
            placeholder="Enter keyword here to search..."
            onInput={(value) => debounceSearch(value.target.value)}
            enterButton
          />
        </div>
        <div className="my-4 flex justify-end gap-2">
          <div className="flex flex-col self-end">
            <Button>
              <CSVLink
                data={csvRecords}
                headers={[
                  { label: 'Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Phone', key: 'phone' },
                  { label: 'Company Name', key: 'company' },
                  { label: 'Designation', key: 'designation' },
                  { label: 'Is Card Printed', key: 'cardPrinted' },
                ]}
              >
                Export excel
              </CSVLink>
            </Button>
          </div>
          <div className="flex flex-col">
            <span className="text-blue-800 mr-2 font-semibold">Card printed:</span>
            <Select
              onSelect={(val) => setIsPrinted(val)}
              defaultValue="all"
              style={{ minWidth: '10rem' }}
            >
              <Select.Option value="false">Not Printed</Select.Option>
              <Select.Option value="true">Printed</Select.Option>
              <Select.Option value="all">All</Select.Option>
            </Select>
          </div>
          <div className="flex flex-col">
            <span className="text-blue-800 mr-2 font-semibold">Year:</span>
            <DatePicker picker="year" onChange={(value) => setEventYear(moment(value).year())} />
          </div>
        </div>

        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          scroll={{ x: 1000 }}
          loading={loading}
          pagination={false}
          className="no-shadow zcp-fixed-w-table"
          rowClassName="cursor-pointer"
          rowKey={(record) => record._id}
          dataSource={dataSource || []}
          columns={columns}
          locale={{
            emptyText: (
              <div className="text-center pt-6 pb-2">
                <img
                  src={SearchNotFound}
                  alt="No register events found!"
                  style={{ height: '80px' }}
                />
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
              total={registeredLists?.count || 0}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />
          </Row>
        </div>
      </div>
    </div>
  );
};

export default connect(({ loading, event }) => ({
  loading: loading.effects['event/getVisitors'],
  registeredLists: event.registeredLists,
  deleteVisitor: event.deleteVisitor,
}))(RegisterTable);
