/* eslint-disable no-underscore-dangle */
import { Button, message, Modal, Select } from 'antd';
import { connect } from 'umi';
import React, { useState } from 'react';

const UpdateStatusModal = ({ setVisible, visible, recordData, dispatch, loading }) => {
  const { Option } = Select;
  const [statusValue, setStatusValue] = useState('');
  const statusList = [
    {
      name: 'Pending',
      value: 'pending',
    },
    {
      name: 'Processing',
      value: 'processing',
    },
    {
      name: 'Shipped',
      value: 'shipped',
    },
    {
      name: 'Delivered',
      value: 'delivered',
    },
  ];
  return (
    <div>
      <Modal
        title="Update Status"
        visible={visible}
        destroyOnClose={() => setStatusValue('')}
        onCancel={() => {
          setStatusValue('');
          setVisible(false);
        }}
        footer={
          <div>
            <Button
              loading={loading}
              type="primary"
              size="middle"
              onClick={(e) => {
                e.stopPropagation();
                if (recordData?._id) {
                  dispatch({
                    type: 'order/updateOrderStatus',
                    payload: {
                      pathParams: {
                        id: recordData?._id,
                      },
                      body: {
                        status: statusValue,
                      },
                    },
                  }).then((res) => {
                    if (res.status === 200) {
                      message.success('Status updated successfully');
                      dispatch({
                        type: 'order/orderList',
                        payload: {
                          query: {},
                        },
                      });
                      setVisible(false);
                      setStatusValue('');
                    }
                  });
                }
              }}
            >
              Update
            </Button>
          </div>
        }
      >
        <div className="w-full px-4 py-3">
          <Select
            size="large"
            onChange={(e) => setStatusValue(e)}
            className="w-full"
            placeholder="Change Status"
            defaultValue="Select Status"
          >
            {statusList.map((item) => (
              <Option key={item?.value} value={item?.value}>
                {item?.name}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ loading }) => ({
  loading: loading?.effects['order/updateOrderStatus'],
}))(UpdateStatusModal);
