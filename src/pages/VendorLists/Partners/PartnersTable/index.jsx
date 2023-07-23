/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { getIntials } from '@/utils/utils';
import { Table,  Avatar, notification, Checkbox } from 'antd';
import { useDispatch, connect } from 'umi';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import BuySubscriptionLicence from '@/components/BuySubscriptionLicence';

const PartnersTable = ({ loading, data }) => {
  const [increaseLicence, setIncreaseLicence] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ price: 150 });
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Sr. No.',
      align: 'center',
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    {
      title: 'Name',
      align: 'left',
      dataIndex: 'name',
      render: (data1, record) => (
        <div className="flex items-center">
          <div className="w-28">
            <Avatar
              className="bg-blue-800 w-8 uppercase"
              style={{
                backgroundColor: '#32727A',
              }}
            >
              {record && getIntials(`${data1} ${data1}`)}
            </Avatar>
          </div>

          <div className="ml-2 w-28">
            <div className="font-medium capitalize">{`${data1}`}</div>
          </div>
        </div>
      ),
    },

    {
      title: 'Email',
      align: 'left',
      dataIndex: 'email',
      render: (data1) => (data1 ? <div>{data1}</div> : '-'),
    },
    {
      title: 'Action',
      render: (_, record) => (<Checkbox defaultChecked={!!record.isLeadScanner} onChange={(val) => {
        if (val.target.checked) {
          dispatch({
            type: 'event/addLeadScanner',
            payload: {
              body: {id: record._id,}
            },
          }).catch((res) => {
            // setTimeout(() => {
              if(res.status === 403) {
              setIncreaseLicence(true);
              dispatch({
                type: 'common/showBuySubscription',
                payload: {
                  value: true,
                },
              });
            }
            // }, 1000);
            notification.error({
              message: res.data.message,
            });
          });
        } else {
          dispatch({
            type: 'event/removeLeadScanner',
            payload: {
              body: {id: record._id,}
            },
          }).catch(() => {
            notification.error({
              message: 'Not able to remove lead scanner',
            });
          });
        }
      }}>Lead Scanner Enabled</Checkbox>)
    }
  ];
  return (
    <div>
      <div className="">
        <Table
          scroll={{ x: 400 }}
          loading={loading}
          pagination={false}
          className="no-shadow zcp-fixed-w-table"
          rowClassName="cursor-pointer"
          // eslint-disable-next-line no-underscore-dangle
          rowKey={(record) => record._id}
          dataSource={data?.users}
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
      </div>

      <BuySubscriptionLicence
        increaseLicence={increaseLicence}
        setIncreaseLicence={setIncreaseLicence}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
    </div>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(PartnersTable);
