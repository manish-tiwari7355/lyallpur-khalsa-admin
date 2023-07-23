import { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Select, Button, notification } from 'antd';
import logo from '@/assets/logo/logo.png';
import ReCaptchaV2 from 'react-google-recaptcha';
import styles from './styles.less';
import Address from '@/components/Address';
import { useSelector, useDispatch, history, useParams } from 'umi';
import {
  CaretDownOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import dummyLogo from '@/assets/file-types/yourlogo.jpg';

const REACT_APP_SITE_KEY = '6LdptEMeAAAAAIIS1skRwdImKl3wbOk5tDAzy3Az';

const Register = ({ location }) => {
  let isExhibitorPresentInUrl = location?.pathname?.includes('exhibitor');

  const [form] = Form.useForm();
  const [type, setType] = useState('');
  const [eventLogo, setEventLogo] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [sponserLogo, setSponserLogo] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

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
  ]);
  // const designationsArr = ['President', 'CEO', 'CFO', 'COO', 'Owner', 'Director', 'Manager', 'Office Assistant', 'Driver'];
  const { Option } = Select;

  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, currentUser } = useSelector((state) => ({
    registrationDetail: state?.event?.registrationDetail?.event,
    loading: state.loading.effects['event/register'],
    currentUser: state.user.currentUser,
  }));

  const checkUniqueVisitor = (emailString) =>
    dispatch({
      type: 'event/checkUniqueVisitor',
      payload: { pathParams: { email: emailString } },
    });

  // get Details about the event.
  const getEventDetail = () => {
    dispatch({
      type: 'event/getEventDetail',
    })
      .then((res) => {
        if (res?.message === 'success') {
          setEventLogo(res?.event?.event_logo || '');
          setSponserLogo(res?.event?.sponser_logo || '');
        }
      })
      .catch((err) => {
        setEventLogo(logo);
        notification.error({
          message: 'Oops! Something went wrong.',
          description: err?.data?.message,
        });
      });
  };

  useEffect(() => {
    getEventDetail();
  }, []);

  const setTypeExhibitor = () => {
    if (location?.pathname?.includes('exhibitor')) {
      isExhibitorPresentInUrl = true;
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
   * redirectUser() is used to redirect the user on list page for logged in user person only.
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

  const submitRegistration = (vals) => {
    // const exhibitor = {
    //   ...values,
    // }
    // validate form values
    form.validateFields().then((values) => {

    const payload = {
      ...values,
      email: values.email.toLowerCase(),
      // format phone number to just number value
      phone: values.phone.replace(/[^0-9]/g, ''),
    };
    if (!values?.guests?.length) {
      delete payload.guests;
    }
    if (isExhibitorPresentInUrl && values?.guests?.length) {
      const updatedGuests = payload?.guests?.map((guest) => {
        return {
          ...guest,
          email: guest.email.toLowerCase(),
          phone: guest.phone.replace(/[^0-9]/g, ''),
        };
      }
      );
      payload.guests = updatedGuests;
    }

    dispatch({
      type: `event/${isExhibitorPresentInUrl ? 'registerExhibitor' : 'register'}`,
      payload: {
        body: {
          ...payload,
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
    });
  };

  const titleCase = (str) => str.slice(0, -1) + str.slice(-1).toUpperCase();

  // reCaptcha onChange event
  const handleCaptchaToken = (value) => {
    if (value) {
      setCaptchaToken(value);
    }
  };

  const handleExpire = () => {
    setCaptchaToken('');
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`h-full w-full overflow-y-scroll`}>
        <div className={`${styles.form_container} h-full `}>
          <div className="p-4">
            <div className={` rounded-lg ${styles.form_container_wrapper} py-4  max-w-2xl`}>
              {/* eslint-disable-next-line no-underscore-dangle */}
              {currentUser?._id && (
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    cursor: 'pointer',
                    padding: '0.5rem 1rem',
                    border: '1px solid #fff',
                    borderRadius: '4px',
                    color: 'rgb(23 58 103)',
                  }}
                  onClick={() => history.goBack()}
                >
                  Go back
                </div>
              )}
              <div className="flex flex-col justify-center items-center px-6 pt-4">
                <div className="rounded-full h-32 w-32 border border-blue-400">
                  <img
                    src={eventLogo || dummyLogo}
                    alt="logo"
                    className="rounded-full h-32 w-32 "
                  />
                </div>
                <h2 style={{ color: '#000428' }}>Fill this form to register</h2>
              </div>
              <div className={`${styles.form_parent} my-8`}>
                <Form
                  colon="false"
                  layout="vertical"
                  form={form}
                  scrollToFirstError
                  autoComplete="off"
                  requiredMark={false}
                  onFinish={(values) => {
                    submitRegistration(values);
                  }}
                >
                  <div className={`${styles.inputStyle} px-8`}>
                    <Row gutter={[12, 0]}>
                      <Col lg={12} xl={12} md={24} sm={24} xs={24}>
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
                          <Input
                            size="large"
                            placeholder={`Enter name `}
                            onChange={(e) => {
                              // capitalize every letter
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
                          label={<span className="formLabel">Job Title</span>}
                          rules={[
                            {
                              required: true,
                              message: `Type can't be blank!`,
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
                          <Input
                            onChange={() => {
                              form
                                .validateFields(['email'])
                                .then(({ email }) => {
                                  checkUniqueVisitor(email.toLowerCase()).then(({ isUnique }) => {
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
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          name="company_name"
                          label={<span className="formLabel ">Company Name</span>}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: `Company name can't blank!`,
                            },
                          ]}
                        >
                          <Input size="large" placeholder={`Enter product brand `} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Address form={form} />
                    <Row gutter={[12, 0]}>
                      {/* {!isExhibitorPresentInUrl && (
                        <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                          <Form.Item
                            name="refer_code"
                            label={<span className="formLabel ">Referral Code</span>}
                            rules={[
                              {
                                required: false,
                              },
                            ]}
                          >
                            <Input size="large" placeholder={`Enter code `} />
                          </Form.Item>
                        </Col>
                      )} */}
                      {type === 'Fleet Owner' && (
                        <>
                          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                            <Form.Item
                              name="trucks"
                              label={<span className="font-bold ">How many trucks</span>}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: `no.of trucks can't blank!`,
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                type="number"
                                placeholder={`Enter no of trucks `}
                              />
                            </Form.Item>
                          </Col>
                          <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                            <Form.Item
                              name="trailers"
                              label={<span className="font-bold ">How many trailers</span>}
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
                            label={<span className="font-bold ">What position</span>}
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
                      {isExhibitorPresentInUrl && (
                        <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                          <Form.Item
                            name="booth"
                            label={<span className="font-bold ">Booth number</span>}
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
                    {/* Display guest or employee form conditionally for visitor or exhibitor */}
                    {!isExhibitorPresentInUrl ? (
                      <>
                        <div className="text-xl py-4 " style={{ color: '#000428' }}>
                          Add Guest:
                          <span className="text-xs text-gray-700 ">
                            {' '}
                            (Details of the Persons who will be coming with you to join event.)
                          </span>
                        </div>
                        <Form.List name="guests">
                          {(fields, { add, remove }) => (
                            <>
                              {fields?.map(({ key, name, ...restField }, idx) => (
                                <div key={key}>
                                  <div
                                    className=" flex justify-between text-sm py-4 "
                                    style={{ color: '#000428' }}
                                  >
                                    Guest {idx + 1}:
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                  </div>
                                  <Row gutter={[12, 0]}>
                                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, 'fname']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                      >
                                        <Input placeholder="First Name" size="large" />
                                      </Form.Item>
                                    </Col>
                                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, 'lname']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                      >
                                        <Input placeholder="Last Name" size="large" />
                                      </Form.Item>
                                    </Col>
                                    <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, 'email']}
                                        rules={[
                                          { required: true, message: 'Missing guest email' },
                                          { type: 'email', message: 'Enter a valid email' },
                                        ]}
                                      >
                                        <Input placeholder="Enter Email" size="large" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </div>
                              ))}

                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => add()}
                                  block
                                  icon={<PlusCircleOutlined />}
                                >
                                  Add more
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </>
                    ) :
                      (
                        <>
                          <div className="text-xl py-4 " style={{ color: '#000428' }}>
                            Add Co-Workers:
                            <span className="text-xs text-gray-700 ">
                              {' '}
                              (Details of the co-workers who will be assisting you on the event.)
                            </span>
                          </div>
                          <Form.List name="guests">
                            {(fields, { add, remove }) => (
                              <>
                                {fields?.map(({ key, name, ...restField }, idx) => (
                                  <div key={key}>
                                    <div
                                      className=" flex justify-between text-sm py-4 "
                                      style={{ color: '#000428' }}
                                    >
                                      Co-Worker {idx + 1}:
                                      <MinusCircleOutlined onClick={() => remove(name)} />
                                    </div>
                                    <Row gutter={[12, 0]}>
                                      <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                                        <Form.Item
                                          {...restField}
                                          name={[name, 'name']}
                                          rules={[{ required: true, message: "Name can't be blank" }]}
                                        >
                                          <Input placeholder="Enter Name" size="large" />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                                        <Form.Item
                                          {...restField}
                                          name={[name, 'phone']}
                                          rules={[{ required: true, message: 'Phone is required' }]}
                                        >
                                          <Input
                                            maxLength={10}
                                            size="large"
                                            type="tel"
                                            placeholder={`Enter phone number`}
                                            onChange={(e) => {
                                              // remove all non-numeric characters and format phone number
                                              const formValues = form.getFieldsValue();
                                              form.setFieldsValue({
                                                guests: formValues.guests.map((guest, index) => {
                                                  if (index === name) {
                                                    return {
                                                      ...guest,
                                                      phone: e.target.value
                                                        .replace(/\D/g, '')
                                                        .replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3')
                                                    }
                                                  }
                                                  return guest;
                                                }),
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                                        <Form.Item
                                          name={[name, 'type']}
                                          label={<span className="formLabel">Job Title</span>}
                                          rules={[
                                            {
                                              required: true,
                                              message: `Type can't be blank!`,
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
                                          {...restField}
                                          name={[ name, 'email']}
                                          label={<span className="formLabel">Email</span>}
                                          rules={[
                                            { required: true, message: 'Missing email' },
                                            { type: 'email', message: 'Enter a valid email' },
                                          ]}
                                        >
                                          <Input placeholder="Enter Email" size="large" />
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </div>
                                ))}

                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusCircleOutlined />}
                                  >
                                    Add more
                                  </Button>
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                        </>
                      )}
                  </div>
                </Form>
              </div>
              <div className="px-8">
                {/* <Button
                loading={updatingLoading}
                type="primary"
                block
                // disabled={id && !hasUnsavedChanges}
                onClick={() => form?.submit()}
                size="large"
              >
                {id ? 'Update' : 'Register'}
              </Button> */}
                <div className="flex justify-center pb-6">
                  <ReCaptchaV2
                    sitekey={REACT_APP_SITE_KEY}
                    onChange={handleCaptchaToken}
                    onExpired={handleExpire}
                  />
                </div>
                <button
                  className={`${styles.btn} cursor-pointer ${!captchaToken || loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  onClick={() => form?.submit()}
                  disabled={!captchaToken || loading}
                >
                  {loading ? <LoadingOutlined /> : <span>{id ? 'Update' : 'Register'}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
