import { Modal, Button, Row, Col, Form, Input, message } from 'antd';
import { connect } from 'umi';
import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.less';

const UpdatePassword = ({ visible, setVisible, dispatch, updatePasswordLoading, currentUser }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const data = values;
    delete data?.confirmNewPassword;

    dispatch({
      type: 'user/updatePassword',
      payload: {
        pathParams: {
          // eslint-disable-next-line no-underscore-dangle
          id: currentUser?._id,
        },
        body: {
          currentPassword: data?.currentPassword,
          password: data?.newPassword,
        },
      },
    })
      .then((res) => {
        if (res?.message?.includes('success')) {
          message.success('Password Updated successfully');
          setVisible(false);
          form?.resetFields();
        } else if (res?.status === 400) {
          message.error(res?.data?.message);
        }
      })
      .catch((err) => {});
  };

  return (
    <Modal
      className={classNames(styles.modalCloseStyles)}
      centered
      title="Update Password"
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={
        <div className="flex justify-end">
          <div className="mx-8">
            <Button
              type="link"
              onClick={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                form.submit();
              }}
              type="primary"
              loading={updatePasswordLoading}
            >
              Update Password
            </Button>
          </div>
        </div>
      }
    >
      <div className="mx-6 mt-4">
        <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="currentPassword"
                label={<span className="formLabel">Current Password</span>}
                rules={[
                  {
                    required: true,
                    message: 'Please input your current password!',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter current password"
                  size="large"
                  iconRender={(open) => (open ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="newPassword"
                label={<span className="formLabel">New Password</span>}
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter new passowrd"
                  size="large"
                  iconRender={(open) => (open ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="confirmNewPassword"
                label={<span className="formLabel">Confirm New Password</span>}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password!',
                  },
                  () => ({
                    validator(_, value) {
                      if (value?.length === 0 || form?.getFieldValue('newPassword') === value)
                        return Promise.resolve();
                      // eslint-disable-next-line prefer-promise-reject-errors
                      return Promise.reject('Confirm password does not matches the new passowrd!');
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm new password"
                  size="large"
                  iconRender={(open) => (open ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default connect(({ user, loading }) => ({
  updatePasswordLoading: loading.effects['user/updatePassword'],
  currentUser: user.currentUser,
}))(UpdatePassword);
