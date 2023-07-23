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

function UsersTable(props) {
  const { Option } = Select;
  const {
    currentPage,
    // dispatch,
    startIndex,
    viewSize,
    acceptLoading,
    rejectLoading,
    tabName,
    tableData,
    setCurrentPage,
    setStartIndex,
    setViewSize,
    setSearchText,
    getProspectUsersList,
    loading,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleReject, setIsModalVisibleReject] = useState(false);
  const [isModalAcceptVisible, setIsModalAcceptVisible] = useState(false);
  const [rejectionComment, setRejectionComment] = useState('');
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');

  const history = useHistory();
  const userRoleList = [
    { value: 'wholesaler', id: 'wholesaler' },
    { value: 'retailer', id: 'retailer' },
    { value: 'distributor', id: 'distributor' },
  ];
  function formatPhoneNumber(phoneNumberString) {
    const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }
  const handeleRejectUser = (val) => {
    dispatch({
      type: 'prospect/rejectProspectUsers',
      payload: {
        pathParams: { token: val },
        body: {
          status: 'REJECTED',
          rejectionCause: rejectionComment,
        },
      },
    }).then((res) => {
      getProspectUsersList();
      setRejectionComment('');
      //  if(res?.data?.)
      message.success(res?.message);
    });
  };
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handeleAcceptUser = (val) => {
    dispatch({
      type: 'prospect/acceptProspectUsers',
      payload: {
        pathParams: { token: val },
        body: {
          status: 'ACCEPTED',
          rejectionCause: '',
          role: userRole,
        },
      },
    }).then((res) => {
      setUserRole('');

      getProspectUsersList();
      message.success(res?.message);
    });
  };

  const [storeAcceptedId, setStoreAcceptedId] = useState('');
  const [storeRejectedId, setStoreRejectedId] = useState('');

  const getColor = (val) => {
    switch (val) {
      case 'wholesaler':
        return 'green';
      case 'retailer':
        return 'red';
      default:
        return 'orange';
    }
  };

  const tableAllColumns = [
    {
      title: 'Sr.No.',
      width: 100,
      align: 'left',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'First name',
      align: 'left',
      width: 120,
      render: (records) => (
        <>
          {' '}
          <div className="capitalize">{records?.firstName}</div>
        </>
      ),
    },
    {
      title: 'Last name',
      align: 'left',
      width: 120,

      render: (records) => (
        <>
          {' '}
          <div className="capitalize">{records?.lastName}</div>
        </>
      ),
    },
    {
      title: 'Email',
      width: 250,

      align: 'left',
      render: (records) => <>{records?.email}</>,
    },
    {
      title: 'Phone',
      width: 150,

      align: 'left',
      render: (records) => <>{formatPhoneNumber(records?.phone)}</>,
    },
    {
      title: 'Role',

      align: 'left',
      render: (records) => (
        <>
          <div>
            <Tag color={getColor(records?.role)}>{records?.role}</Tag>
          </div>
        </>
      ),
    },

    {
      title: '',

      align: 'left',
      render: (records) => (
        <>
          <div
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              setUserId(records?._id);
              showDrawer();
            }}
          >
            <Tag>View Profile</Tag>
          </div>
        </>
      ),
    },
  ];

  const tableRejectedColumns = [
    {
      title: 'Sr.No.',
      width: 100,
      align: 'left',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'First name',
      align: 'left',
      width: 120,
      render: (records) => (
        <>
          {' '}
          <div className="capitalize">{records?.firstName}</div>
        </>
      ),
    },
    {
      title: 'Last name',
      align: 'left',
      width: 120,
      render: (records) => (
        <>
          <div className="capitalize">{records?.lastName}</div>
        </>
      ),
    },
    {
      title: 'Email',

      align: 'left',
      width: 250,
      render: (records) => <>{records?.email}</>,
    },
    {
      title: 'Phone',
      width: 150,
      align: 'left',
      render: (records) => <>{formatPhoneNumber(records?.phone)}</>,
    },
    {
      title: 'Status',

      align: 'left',
      render: (records) => (
        <>
          <div>
            <Tag color={getColor(records?.status)}>{records?.status}</Tag>
          </div>
        </>
      ),
    },
    {
      title: 'Rejection Cause',

      align: 'left',
      render: (records) => <>{records?.rejectionCause}</>,
    },
    {
      title: '',

      align: 'left',
      render: (records) => (
        <>
          <div
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              setUserId(records?._id);
              showDrawer();
            }}
          >
            <Tag>View Profile</Tag>
          </div>
        </>
      ),
    },
  ];
  const tablePendingColumns = [
    {
      title: 'Sr.No.',
      width: 100,
      align: 'left',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'First name',
      align: 'left',

      width: 120,

      render: (records) => (
        <>
          {' '}
          <div className="capitalize">{records?.firstName}</div>
        </>
      ),
    },
    {
      title: 'Last name',
      align: 'left',
      width: 120,

      render: (records) => (
        <>
          {' '}
          <div className="capitalize">{records?.lastName}</div>
        </>
      ),
    },
    {
      title: 'Email',
      width: 250,

      align: 'left',
      render: (records) => <>{records?.email}</>,
    },
    {
      title: 'Phone',
      width: 150,
      align: 'left',
      render: (records) => <>{formatPhoneNumber(records?.phone)}</>,
    },

    {
      title: 'Action',
      align: 'left',
      render: (records) => (
        <>
          <div className="flex justify-center items-center">
            <div className="mr-4">
              <Button
                type="primary"
                disabled={records?.status === 'ACCEPTED'}
                onClick={() => {
                  setIsModalAcceptVisible(true);
                  // eslint-disable-next-line no-underscore-dangle
                  setStoreAcceptedId(records?._id);
                }}
              >
                Accept
              </Button>
            </div>
            <div className="mr-4">
              <Button
                type="danger"
                onClick={() => {
                  // eslint-disable-next-line no-underscore-dangle
                  setStoreRejectedId(records?._id);
                  return setIsModalVisibleReject(true);
                }}
                loading={rejectLoading}
              >
                Reject
              </Button>
            </div>
          </div>
        </>
      ),
    },
    {
      title: '',

      align: 'left',
      render: (records) => (
        <>
          <div
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              setUserId(records?._id);
              showDrawer();
            }}
          >
            <Tag>View Profile</Tag>
          </div>
        </>
      ),
    },
  ];

  const tableAcceptedColumns = [
    {
      title: 'Sr.No.',
      width: 100,
      align: 'left',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'First name',
      align: 'left',
      width: 120,

      render: (records) => (
        <>
          {' '}
          <div className="capitalize">{records?.firstName}</div>
        </>
      ),
    },
    {
      title: 'Last name',
      align: 'left',
      width: 120,

      render: (records) => (
        <>
          {' '}
          <div className="capitalize">{records?.lastName}</div>
        </>
      ),
    },
    {
      title: 'Email',
      width: 250,

      align: 'left',
      render: (records) => <div>{records?.email}</div>,
    },
    {
      title: 'Phone',

      align: 'left',
      render: (records) => <div>{formatPhoneNumber(records?.phone)}</div>,
    },
    {
      title: 'Role',

      align: 'left',
      render: (records) => (
        <>
          <div>
            {/* <Tag color={getColor(records?.role)}>{records?.role}</Tag> */}
            <div className="capitalize" style={{ color: getColor(records?.role) }}>
              {records?.role}
            </div>
          </div>
        </>
      ),
    },

    {
      title: '',

      align: 'left',
      render: (records) => (
        <>
          <div
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              setUserId(records?._id);
              showDrawer();
            }}
          >
            <Tag>View Profile</Tag>
          </div>
        </>
      ),
    },
  ];

  const getColumns = (val) => {
    switch (val) {
      case 'ALL':
        return tableAllColumns;
      case 'ACCEPTED':
        return tableAcceptedColumns;
      case 'REJECTED':
        return tableRejectedColumns;
      default:
        return tablePendingColumns;
    }
  };

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);
  const data = tableData?.prospectUserData
    ?.filter((item) => item._id === userId)
    // eslint-disable-next-line array-callback-return
    ?.map((item) => {
      return item;
    });

  return (
    <div>
      <Drawer
        title={<div className="font-bold">View profile Details</div>}
        width={'25%'}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        {data?.map((item) => {
          return (
            <div key={item?._id} className="">
              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px]">ZipCode :</div>
                <div className="font-medium  ml-3">
                  {item?.address?.postal_code ? item?.address?.postal_code : '--'}
                </div>
              </div>
              <Divider className="" />
              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px]">Name :</div>
                <div className="font-medium capitalize ml-3">
                  {item?.firstName ? item?.firstName : ''} {item.lastName ? item.lastName : '--'}
                </div>
              </div>
              <Divider />

              <div className="flex flex-row   w-full">
                <div className="font-bold w-[60px] ">Email :</div>
                <div className="font-medium lowercase ml-3 ">
                  {item?.email ? item?.email : '--'}
                </div>
              </div>
              <Divider className="" />
              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px]">Company Name :</div>
                <div className="font-medium lowercase ml-3">
                  {item?.companyName ? item?.companyName : '--'}
                </div>
              </div>
              <Divider className="" />

              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px] mr-3">Role :</div>
                {!!item.role === false ? (
                  <div className="font-medium capitalize ml-3">{'--'}</div>
                ) : (
                  <Tag color={getColor(item?.role)} className="font-medium capitalizes">
                    {item?.role}
                  </Tag>
                )}
              </div>
              <Divider className="" />

              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px] ">Phone :</div>
                <div className="font-medium  ml-3">
                  {item?.phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3')}
                </div>
              </div>
              <Divider className="" />

              {
                // eslint-disable-next-line no-undef
                item.rejectionCause !== '' ? (
                  <div className="flex flex-row  w-full">
                    <div className="font-bold w-[60px]">Rejection Cause :</div>
                    <div className="font-medium capitalize ml-3">
                      {item?.rejectionCause ? item?.rejectionCause : '--'}
                    </div>
                  </div>
                ) : (
                  <></>
                )
              }
              <Divider className="" />

              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px]"> Country :</div>
                <div className="font-medium capitalize ml-3">
                  {item?.address?.country_code
                    ? item?.address?.country_code
                    : 'United States of America'}
                </div>
              </div>
              <Divider className="" />

              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px]">State :</div>
                <div className="font-medium  ml-3 capitalize">
                  {item?.address?.state_code ? item?.address?.state_code : '--'}
                </div>
              </div>
              <Divider className="" />

              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px]">City :</div>
                <div className="font-medium  ml-3 capitalize">
                  {item?.address?.city ? item?.address?.city : '--'}
                </div>
              </div>
              <Divider className="" />
              <div className="flex flex-row  w-full">
                <div className="font-bold w-[60px]"> Address :</div>
                <div className="font-medium capitalize ml-3">
                  {item?.address?.address_line_1 ? item?.address?.address_line_1 : '--'}
                </div>
              </div>
              <Divider className="" />
              <div className="flex flex-row  w-full">
                <div className="font-bold  w-[60px] text-medium">UserName :</div>
                <div className="font-medium capitalize ml-3">
                  {item?.userName ? item?.userName : '--'}
                </div>
              </div>

              {item.resaleCertificate || item.einCertificate ? (
                <div className="flex flex-row  w-full">
                  <div className="font-bold w-[60px]">Certificates :</div>
                </div>
              ) : (
                <></>
              )}

              {item.resaleCertificate ? (
                <div className="flex flex-row  w-full items-center justify-between ">
                  <div>Resale Certificate</div>
                  <Image width={80} height={80} src={item.resaleCertificate} />
                </div>
              ) : (
                <></>
              )}
              {item.einCertificate ? (
                <div className="flex flex-row  w-full items-center justify-between ">
                  <div>Ein Certificate</div>
                  <Image width={80} height={80} src={item.einCertificate} />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </Drawer>
      <Modal
        title="Rejection Cause"
        visible={isModalVisibleReject}
        onCancel={() => setIsModalVisibleReject(false)}
        onOk={() => {
          // eslint-disable-next-line no-underscore-dangle
          if (rejectionComment === '') {
            message.error('Please enter the rejection cause');
          } else {
            setRejectionComment('');
            handeleRejectUser(storeRejectedId);
            setIsModalVisibleReject(false);
          }
        }}
      >
        <div className="p-5">
          <Input
            value={rejectionComment}
            onChange={(e) => {
              setRejectionComment(e?.target.value);
            }}
            size="middle"
          />
        </div>
      </Modal>
      <Modal
        title="Assign user role"
        destroyOnCloses
        visible={isModalAcceptVisible}
        onCancel={() => setIsModalAcceptVisible(false)}
        onOk={() => {
          // eslint-disable-next-line no-underscore-dangle
          if (userRole === '') {
            message.error('Please select the Role');
          } else {
            setIsModalAcceptVisible(false);
            setUserRole('');
            // eslint-disable-next-line no-underscore-dangle
            handeleAcceptUser(storeAcceptedId);
          }
        }}
      >
        <div className="p-5 w-full ">
          <Select
            className="w-full"
            getPopupContainer={(node) => node.parentNode}
            showSearch
            placeholder="Select role"
            size={'large'}
            onChange={(v) => {
              setUserRole(v);
            }}
          >
            {userRoleList?.map((c) => (
              <Option key={c?.id} value={c?.value} title={c?.value} className="capitalize">
                {c?.value}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
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
        dataSource={tableData?.prospectUserData || ''}
        columns={getColumns(tabName)}
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
          emptyText: <EmptyStateContainer type={'prospect users'} />,
        }}
      />
    </div>
  );
}

const mapStateToProps = ({ loading }) => ({
  rejectLoading: loading.effects['prospect/rejectProspectUsers'],
  acceptLoading: loading.effects['prospect/acceptProspectUsers'],
});
export default connect(mapStateToProps)(UsersTable);
