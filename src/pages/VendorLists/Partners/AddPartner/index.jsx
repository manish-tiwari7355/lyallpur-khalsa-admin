import React from 'react';
import AppModal from '@/components/AppModal';
import { Button, Form, Input, notification, Select } from 'antd';
import { connect, useParams } from 'umi';
// import BuySubscriptionLicence from '@/components/BuySubscriptionLicence';
import { CaretDownOutlined } from '@ant-design/icons';

const designations = [
  { label: 'President', value: 'President' },
  { label: 'CEO', value: 'CEO' },
  { label: 'CFO', value: 'CFO' },
  { label: 'COO', value: 'COO' },
  { label: 'Owner', value: 'Owner' },
  { label: 'Director', value: 'Director' },
  { label: 'Manager', value: 'Manager' },
  { label: 'VP Corporate Sales', value: 'VP Corporate Sales' },
  { label: 'VP Operations', value: 'VP Operations' },
  { label: 'Senior VP', value: 'Senior VP' },
  { label: 'Office Assistant', value: 'Office Assistant' },
  { label: 'Owner Operator', value: 'Owner Operator' },
  { label: 'Company Driver', value: 'Company Driver' },
  { label: 'Fleet Owner', value: 'Fleet Owner' },
  { label: 'Fleet Maintenance', value: 'Fleet Maintenance' },
  { label: 'Fleet Safety/Operation/Dispatcher', value: 'Fleet Safety/Operation/Dispatcher' },
  { label: 'Dealer/Distributor', value: 'Dealer/Distributor' },
  { label: 'Manufacturer/Supplier', value: 'Manufacturer/Supplier' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Marketing/Advertising', value: 'Marketing/Advertising' },
  { label: 'Press', value: 'Press' },
  { label: 'Guest/Family Member', value: 'Guest/Family Member' },
]

const AddPartner = ({
  showAddPartner,
  setShowAddPartner,
  loading,
  dispatch,
  currentUser,
  getPartners,
}) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  // const [increaseLicence, setIncreaseLicence] = useState(false);
  // const [selectedPlan, setSelectedPlan] = useState({ price: 150 });

  // const checkUniqueness = (emailString) =>
  //   dispatch({
  //     type: 'user/checkUniqueness',
  //     payload: { pathParams: { email: emailString } },
  //   });
  // const checkUniqueEmail = (email) =>
  //   form
  //     .validateFields(['email'])
  //     .then(({ email }) =>
  //       checkUniqueness(email.toLowerCase()).then(({ isUnique }) => {
  //         if (!isUnique) {
  //           form.setFields([
  //             {
  //               name: 'email',
  //               errors: ['This email already exist'],
  //             },
  //           ]);
  //         }
  //         return isUnique;
  //       }),
  //     )
  //     .catch(() => {});

  const submitPartner = async (values) => {
    const payload = values;
    payload.role = 'partner';
    // eslint-disable-next-line no-underscore-dangle
    payload.invitedBy = id || currentUser._id;
    if (['admin', 'manager'].includes(currentUser.role)) {
      await dispatch({
        type: 'user/addLicense',
        payload: { body: { user: id } },
      });
    }

    dispatch({
      type: 'user/addPartner',
      payload: { body: payload },
    })
      .then((res) => {
        if (res) {
          notification.success({
            message: 'Great Job!',
            description: (
              <div>
                <strong>{values.name} </strong>
                have been successfully added as partner.
              </div>
            ),
          });
          getPartners();
          form.resetFields();
          setShowAddPartner(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          notification.error({
            message: 'Oops! Something went wrong.',
            description: err?.data?.message,
          });
          if (currentUser?.role === 'vendor') {
            form.resetFields();
            setShowAddPartner(false);
            // Show the increase licence limit modal functionality for the role vendor, when invite partner limit has been reached.
            // setTimeout(() => {
            //   setIncreaseLicence(true);
            //   dispatch({
            //     type: 'common/showBuySubscription',
            //     payload: {
            //       value: true,
            //     },
            //   });
            // }, 1000);
          }
        }
      });
  };
  return (
    <>
      <AppModal
        title="Add partner"
        showModal={showAddPartner}
        onCancel={() => {
          setShowAddPartner(false);
          form.resetFields();
        }}
        footer={
          <div className="p-2">
            <Button
              loading={loading}
              type="primary"
              size="large"
              block
              className="cursor-pointer text-lg font-semibold py-2"
              onClick={() => form?.submit()}
            >
              {loading ? 'Adding...' : 'Add partner'}
            </Button>
          </div>
        }
      >
        <div className="p-6">
          <Form
            colon="false"
            layout="vertical"
            form={form}
            scrollToFirstError
            autoComplete="off"
            requiredMark={false}
            onFinish={(values) => {
              submitPartner(values);
            }}
          >
            <Form.Item
              name="name"
              label={<span className={`font-bold`}>Name</span>}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: `Name can't be blank!`,
                },
              ]}
            >
              <Input size="large" placeholder={`Enter name `} />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span className="font-bold ">Email</span>}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: `Email can't be blank!`,
                },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input size="large" placeholder={`Enter email `} />
            </Form.Item>
            <Form.Item
              label={<span className="formLabel">Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: `Password can't be blank!`,
                },
              ]}
            >
              <Input size="large" placeholder="Enter password" />
            </Form.Item>
            <Form.Item
              label={<span className="formLabel">Phone Number</span>}
              name="phone"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: `Phone number can't be blank!`,
                },
              ]}
            >
              <Input size="large" placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item
              label={<span className="formLabel">Job Title</span>}
              name="designation"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: `Job title is required!`,
                },
              ]}
            >
              <Select
                showSearch
                size="large"
                placeholder="Select job title"
                allowClear
                suffixIcon={
                  <CaretDownOutlined
                    style={{ color: 'rgba(0,0,0,.45)', fontSize: '1rem' }}
                  />
                }
                getPopupContainer={(node) => node.parentNode}
                listHeight={200}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {designations?.map((typeOption) => (
                  <Select.Option key={typeOption.value}>{typeOption.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      </AppModal>
      {/* <BuySubscriptionLicence
        increaseLicence={increaseLicence}
        setIncreaseLicence={setIncreaseLicence}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      /> */}
    </>
  );
};

export default connect(({ loading, user }) => ({
  loading: loading.effects['user/addPartner'],
  currentUser: user.currentUser,
}))(AddPartner);
