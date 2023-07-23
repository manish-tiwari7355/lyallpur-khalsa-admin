import { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Select, Button, notification, Modal, Radio, Space, message } from 'antd';
import logo from '@/assets/logo/logo.png';
import styles from './styles.less';
import Address from '@/components/Address';
import { useSelector, useDispatch, history, useParams } from 'umi';
import { CaretDownOutlined } from '@ant-design/icons';
import { offlineSubscription } from '@/services/user';

/**
 *
 * @param {*EditRegisteration}
 * there are some extra unnecessary logics in this component.take care.
 * @returns
 */

const EditRegisteration = ({ location }) => {
  let isExhibitorPresentInUrl = location?.pathname?.includes('exhibitor');

  const [form] = Form.useForm();
  const [type, setType] = useState('');
  const [previousType, setPreviousType] = useState('');
  const [typeArr, setTypeArr] = useState([
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
    { label: 'Company Driver', value: 'Company Driver' },
    { label: 'Owner Operator', value: 'Owner Operator' },
    { label: 'Fleet Operator', value: 'Fleet Owner' },
    { label: 'Office Work', value: 'Office Work' },
    { label: 'Visitor', value: 'Visitor' },
    { label: 'Vendor', value: 'Vendor' },
    { label: 'Volunteer', value: 'Volunteer' },
    { label: 'Mechanic', value: 'Mechanic' },
    { label: 'Exhibitor', value: 'Exhibitor' },
    { label: 'Press', value: 'Press' },
  ]);
  // const designationsArr = ['President', 'CEO', 'CFO', 'COO', 'Owner', 'Director', 'Manager', 'Office Assistant', 'Driver'];

  const { Option } = Select;
  const dispatch = useDispatch();
  const { id } = useParams();
  const { updatingLoading, currentUser, registrationDetail } = useSelector((state) => ({
    registrationDetail: state?.event?.registrationDetail?.event,
    updatingLoading: state.loading.effects['event/updateRegistration'],
    currentUser: state.user.currentUser,
  }));

  const [subscriptionState, setSubscriptionState] = useState(false)


  const checkUniqueness = (emailString) =>
    dispatch({
      type: 'user/checkUniqueness',
      payload: { pathParams: { email: emailString } },
    });

  const getSingleRegistration = () => {
    dispatch({
      type: 'event/getSingleRegistration',
      payload: {
        pathParams: {
          id,
        },
      },
    }).then((res) => {
      console.log(res, "res")
      if (res?.message === 'success') {
        setSubscriptionState(res?.isSubscriptionActive)

        setType(res?.event?.type);
        setPreviousType(res?.event?.type);
        // console.log(res,'res')
        form?.setFieldsValue({
          ...res?.event,
        });
      }
    });
  };
  useEffect(() => {
    if (id) {
      getSingleRegistration();
    }
  }, [id]);
  const setTypeExhibitor = () => {
    if (location?.pathname?.includes('exhibitor')) {
      isExhibitorPresentInUrl = true;
      form.setFieldsValue({ type: 'Exhibitor' });
      setType('Exhibitor');
    } else {
      setType('');
      const exhibitorUIndex = typeArr?.findIndex((d) => d.value === 'Exhibitor');
      if (exhibitorUIndex) {
        setTypeArr(typeArr.filter((_, i) => i !== exhibitorUIndex));
      }
    }
  };

  useEffect(() => {
    setTypeExhibitor();
  }, [location]);
  /**
   * redirectUser() is used to redirect the user on list page in logined user person.
   */
  const redirectUser = () => {
    if (Object.keys(currentUser)?.length) {
      if (location?.pathname?.includes('exhibitor')) {
        history.push('/exhibitors');
      } else {
        history.push('/visitors');
      }
    }
  };
  const updateRegistration = (values) => {
    const formData = { ...values };

    /**
     * when user change the type while updating than reset the value of the associated field data.
     */
    if (previousType !== values.type) {
      if (previousType === 'Fleet Owner') {
        formData.trailers = '';
        formData.trucks = '';
      }
      if (previousType === 'Office Work') {
        formData.position = '';
      }
      if (previousType === 'Exhibitor') {
        formData.booth = '';
      }
    }
    dispatch({
      type: 'event/updateRegistration',
      payload: {
        pathParams: {
          id,
        },
        body: formData,
      },
    })
      .then((res) => {
        if (res) {
          form.resetFields();
          notification.success({
            message: 'Great Job!',
            description: (
              <div>
                <strong>{values.name} </strong>
                details have been successfully Updated.
              </div>
            ),
          });
          redirectUser();
        }
      })
      .catch((err) => {
        if (err) {
          notification.error({
            message: 'Oops! Something went wrong.',
            description: err?.data?.message,
          });
        }
      });
  };
  const submitRegistration = (values) => {
    dispatch({
      type: 'event/register',
      payload: {
        body: {
          ...values,
          email: values.email.toLowerCase(),
        },
      },
    })
      .then((res) => {
        if (res) {
          form.resetFields();
          notification.success({
            message: 'Great Job!',
            description: (
              <div>
                <strong>{values.name} </strong>
                have been successfully registered for the event.
              </div>
            ),
          });
          setTypeExhibitor();
          redirectUser();
        }
      })
      .catch((err) => {
        if (err) {
          notification.error({
            message: 'Oops! Something went wrong.',
            description: err?.data?.message,
          });
        }
      });
  };

  const titleCase = (str) => str.slice(0, -1) + str.slice(-1).toUpperCase();
  const [modalVisible, setModalVisible] = useState(false)

  const [planState, setPlanState] = useState('STARTER_PLAN');

  const onChange = e => {
    setPlanState(e.target.value);
  };
  const Subscription = (data) => {
    let amount = 0;

    if (data === 'STARTER_PLAN') {
      amount = 20000;
    } else if (data === 'PREMIUM_PLAN') {
      amount = 27500;
    } else if (data === 'PRO_PLAN') {
      // eslint-disable-next-line no-unused-vars
      amount = 45000;
    }
    return (
      offlineSubscription({

        // eslint-disable-next-line no-underscore-dangle
        email: registrationDetail?.email,
        amount,

      }).then((res) => {

        setSubscriptionState(res?.isSubscriptionActive)
        setModalVisible(false)
        message.success('Subscription Successful', 1)
      }).catch(err => {
        if (err?.message === 'Your organization already has an active subscription') {
          notification.error({
            message: 'Oops!',
            description: 'Your organization already has an active subscription',
          });
        }
      })
    )

  }


  return (
    <div className="container mx-auto">
      <Modal
        title="Add Plans"
        centered
        footer={false}
        visible={modalVisible}

      >
        <div className='px-6'>
          <Radio.Group onChange={onChange} value={planState}>
            <Space direction="vertical" className='py-5'>
              <Radio value={'STARTER_PLAN'} className='text-2xl font-medium'> Starter Plan
              </Radio>

              <Radio value={'PREMIUM_PLAN'} className='text-2xl font-medium'> Premium Plan</Radio>
              <Radio value={'PRO_PLAN'} className='text-2xl font-medium'> Pro Plan</Radio>
            </Space>
          </Radio.Group>


        </div>
        <div className='px-6 flex flex-row items-center py-5'>
          <Button type="primary" loading={subscriptionState} onClick={() => {
            Subscription(planState)
          }}>Submit</Button>
          <Button type="primary" className='mx-5' onClick={() => {
            setModalVisible(false)
          }}>Cancel</Button>
        </div>
      </Modal>
      <div className="bg-white h-full">
        <div className={`bg-white h-full w-full mb-8 ${styles.backgroundCover} `}>
          <div className={`${styles.form_container}`}>
            <div
              className={`bg-white rounded-lg ${styles.form_container_wrapper} h-full mt-10 w-full max-w-3xl`}
            >
              <div className='flex justify-center items-center relative'>

                <div className="flex flex-col justify-center items-center px-6 pt-4">
                  <div className="">
                    <img
                      src={logo}
                      alt="logo"
                      style={{ objectFit: 'contain' }}
                      className="rounded-full h-32 w-32 border border-blue-400 cover"
                    />
                  </div>
                  <h2 className="text-blue-800">
                    {id ? 'Filled Details' : 'Fill this form to register'}
                  </h2>
                </div>
                {
                  registrationDetail?.isExhibitor ? (
                    <>
                      {
                        !subscriptionState ? (
                          <div style={{ position: 'absolute', right: '35px' }}>
                            <Button type="primary" onClick={() => setModalVisible(true)} >
                              Add Plan
                            </Button>
                          </div>
                        ) : (<></>)
                      }
                    </>
                  ) : (
                    <></>
                  )
                }

              </div>
              <Form
                colon="false"
                layout="vertical"
                form={form}
                scrollToFirstError
                autoComplete="off"
                requiredMark={false}
                // onValuesChange={(changedValues, allValues) => {
                //   if (id) {
                //     hasFormChanged(allValues);
                //   }
                // }}
                onFinish={(values) => {
                  if (id) {
                    updateRegistration(values);
                  } else {
                    submitRegistration(values);
                  }
                }}
              >
                <div className="px-8">
                  <Row gutter={[12, 0]}>
                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="name"
                        label={<span className="formLabel ">Name</span>}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: `Name can't be blank!`,
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder={`Enter name `}
                          onChange={(e) => {
                            if (
                              e.target.value.slice(-2, -1) === ' ' ||
                              e.target.value.length === 1
                            ) {
                              form.setFieldsValue({ name: titleCase(e.target.value) });
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="phone"
                        label={<span className={`font-bold`}>Phone Number</span>}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: `Phone number name can't be blank!`,
                          },
                        ]}
                      >
                        <Input
                          maxLength={10}
                          size="large"
                          type="tel"
                          placeholder={`Enter phone number`}
                          onChange={(e) => {
                            // remove all non-numeric characters and format phone number
                            form.setFieldsValue({
                              phone: e.target.value
                                .replace(/\D/g, '')
                                .replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3'),
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="type"
                        label={<span className={`font-bold`}>Job Title</span>}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: `Job title can't be blank!`,
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          size="large"
                          placeholder="Select job title"
                          allowClear
                          onSelect={(val) => {
                            setType(val);
                          }}
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
                          {typeArr?.map((typeOption) => (
                            <Option key={typeOption.value}>{typeOption.label}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="email"
                        label={<span className="formLabel ">Email</span>}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: `Email can't be blank!`,
                          },
                          { type: 'email', message: 'Enter a valid email' },
                        ]}
                      >
                        <Input
                          onChange={() => {
                            form
                              .validateFields(['email'])
                              .then(({ email }) => {
                                checkUniqueness(email.toLowerCase()).then(({ isUnique }) => {
                                  if (!isUnique) {
                                    form.setFields([
                                      {
                                        name: 'email',
                                        errors: ['This email already exist'],
                                      },
                                    ]);
                                  }
                                });
                              })
                              .catch(() => { });
                          }}
                          size="large"
                          placeholder={`Enter email `}
                          disabled // restrict user to update the email
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="company_name"
                        label={<span className="formLabel ">Company Name</span>}
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Input size="large" placeholder={`Enter product brand `} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Address form={form} />
                  <Row gutter={[12, 0]}>
                    {type === 'Fleet Owner' && (
                      <>
                        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                          <Form.Item
                            name="trucks"
                            label={<span className="formLabel ">How many trucks</span>}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: `no.of trucks can't blank!`,
                              },
                            ]}
                          >
                            <Input size="large" type="number" placeholder={`Enter no of trucks `} />
                          </Form.Item>
                        </Col>
                        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                          <Form.Item
                            name="trailers"
                            label={<span className="formLabel ">How many trailers</span>}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: `no.of trailers can't blank!`,
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              type="number"
                              placeholder={`Enter no of trailers `}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    )}
                    {type === 'Office Work' && (
                      <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          name="position"
                          label={<span className="formLabel ">What position</span>}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: `Position can't be blank!`,
                            },
                          ]}
                        >
                          <Input size="large" placeholder={`Enter position `} />
                        </Form.Item>
                      </Col>
                    )}
                    {registrationDetail?.isExhibitor && (
                      <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          name="booth"
                          label={<span className="formLabel ">Booth number.</span>}
                          rules={[
                            {
                              required: true,
                              message: `Booth number can't be blank!`,
                            },
                          ]}
                        >
                          <Input size="large" type="number" placeholder={`Enter booth number `} />
                        </Form.Item>
                      </Col>
                    )}
                  </Row>
                </div>
              </Form>
              <div className="flex justify-end px-8">
                <Button
                  onClick={() => {
                    history.goBack();
                  }}

                  className="mx-2"

                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  loading={updatingLoading}
                  type="primary"
                  // disabled={id && !hasUnsavedChanges}
                  onClick={() => form?.submit()}
                  size="large"
                >
                  {id ? 'Update' : 'Register'}
                </Button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRegisteration;
