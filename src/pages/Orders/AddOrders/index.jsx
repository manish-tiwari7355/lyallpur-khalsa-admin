/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import {
  Button,
  Col,
  Input,
  Row,
  Form,
  Select,
  AutoComplete,
  message,
  Modal,
  Radio,
  DatePicker,
  Space,
  notification,
  Switch,
  Checkbox,
} from 'antd';
import { debounce } from 'lodash';
import { connect, useHistory } from 'umi';
import './index.less';
import React, { useState, useEffect, useRef } from 'react';
import EmptyStateContainer from '@/components/EmptyStateContainer';
import Address from '@/components/Address';
import PhoneNumber from '@/components/PhoneNumber';
import InvoiceModal from '../InvoiceModal';
import TextArea from 'antd/lib/input/TextArea';
import { DeleteOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { currencyFormatter } from '@/utils/common';
import { currencyParser, decodeDollarsToDigits } from '@/utils/utils';

const AddOrders = ({
  dispatch,
  skuProducts,
  existingCustomer,
  loading,
  getSkuOrders,
  getBarCodeProducts,
  createUserLoading,
}) => {
  const [form] = Form.useForm();
  const [userForm] = Form.useForm();
  const { Option } = Select;
  const { Search } = Input;
  const inputRef = useRef();
  console.log(inputRef, 'inputRef');
  const [paymentType, setPaymentType] = useState('Fully Paid');
  const [paymentMethodState, setPaymentMethodState] = useState('Cash');
  const [productCode, setProductCode] = useState('');
  const [barCodeState, setBarCodeState] = useState(false);
  const [skuProductCode, setSkuProductCode] = useState('');
  const [quantity, setQuantity] = useState([]);
  const [orderId, setOrderId] = useState();
  const [productData, setProductData] = useState([]);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [newUserVisible, setNewUserVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [keyword, setKeyword] = useState('');
  const [offlineUserData, setOfflineUserData] = useState('');
  const [addPaymentBoxState, setAddPaymentBoxState] = useState(false);
  const [updateTotalAmount, setUpdateTotalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [volumeTax, setVolumeTax] = useState(0);
  const history = useHistory();
  const [getSkuStateData, setGetSkuStateData] = useState(false);
  // const [viewSize, setViewSize] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [startIndex, setStartIndex] = useState();

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 || event.keyCode === 17 || event.keyCode === 74)
      event.preventDefault();
  });
  useEffect(() => {
    dispatch({
      type: 'order/getExistingCustomer',
      payload: {
        query: {
          keyword,
        },
      },
    });
  }, [dispatch, keyword]);

  const getProductsList = () => {
    setProductCode('');
    dispatch({
      type: 'products/getSkuProducts',
      payload: {
        query: {
          sku: productCode,
        },
      },
    }).then((res) => {
      setProductCode('');
      setSkuProductCode('');
    });
  };

  const getBarcodeProducts = () => {
    setProductCode('');
    dispatch({
      type: 'products/getBarCodeProductData',
      payload: {
        query: {
          barcode: productCode,
        },
      },
    }).then((res) => {
      if (barCodeState) {
        inputRef.current.state.value = '';
      }
      if (res?.data?.error?.status === 400) {
        message.error(res?.data?.error?.message);
        setSkuProductCode('');

        setProductCode('');
      } else if (res?.status === 200) {
        setProductCode('');
        setSkuProductCode('');
      }
    });
  };

  const getSkuProductsList = () => {
    setSkuProductCode('');
    dispatch({
      type: 'products/getSkuOrdersData',
      payload: {
        query: {
          sku: skuProductCode,
        },
      },
    }).then((res) => {
      setSkuProductCode('');
    });
  };
  // eslint-disable-next-line consistent-return
  const getPrice = (role, price) => {
    // eslint-disable-next-line default-case
    switch (role) {
      case 'admin':
        return price.myPrice;

      case 'wholesaler':
        return price?.wholesaler_price;
      case 'retailer':
        return price.retailer_price;
      case 'distributor':
        return price.distributor_price;
    }
  };

  const selectedUserDetails = existingCustomer?.user?.find((val) => val._id === selectedId);
  useEffect(() => {
    if (getSkuOrders?.products[0]?.product?.isActive === true) {
      const data =
        productData && productData?.find((val) => val?.sku === getSkuOrders?.products[0]?.sku);

      if (data) {
        setProductData([...productData]);
        setQuantity(
          quantity.map((j) =>
            j?.sku === data?.sku ? { ...j, quantity: parseInt(j.quantity) + 1 } : j,
          ),
        );
      } else if (getSkuStateData) {
        setProductData([...productData, getSkuOrders?.products[0]]);
        setQuantity([
          ...quantity,
          {
            sku: getSkuOrders?.products[0]?.sku,
            productId: getSkuOrders?.products[0]?.product?._id,
            volume:
              !!getSkuOrders?.products[0]?.volume === false ? 0 : getSkuOrders?.products[0]?.volume,
            quantity: 1,
            category: getSkuOrders?.products[0]?.product?.category,
            price: getPrice(
              selectedUserDetails?.role ? selectedUserDetails?.role : offlineUserData.role,
              getSkuOrders?.products[0]?.price,
            ),
          },
        ]);
        setProductCode('');
      }
    }
  }, [getSkuOrders]);

  useEffect(() => {
    if (getBarCodeProducts?.products?.product?.isActive === true) {
      const data =
        productData && productData?.find((val) => val?.sku === getBarCodeProducts?.products?.sku);
      if (data) {
        setProductData([...productData]);
        setQuantity(
          quantity.map((j) =>
            j?.sku === data?.sku ? { ...j, quantity: parseInt(j.quantity) + 1 } : j,
          ),
        );
      } else if (barCodeState) {
        setProductData([...productData, getBarCodeProducts?.products]);
        setQuantity([
          ...quantity,
          {
            sku: getBarCodeProducts?.products?.sku,
            productId: getBarCodeProducts?.products?.product?._id,
            quantity: 1,
            category: getBarCodeProducts?.products?.product?.category,
            volume:
              !!getBarCodeProducts?.products?.volume === false
                ? 0
                : getBarCodeProducts?.products?.volume,
            price: getPrice(
              selectedUserDetails?.role ? selectedUserDetails?.role : offlineUserData.role,
              getBarCodeProducts?.products?.price,
            ),
          },
        ]);
        setProductCode('');
      }
    }
  }, [getBarCodeProducts]);

  useEffect(() => {
    if (quantity.length > 0 && addPaymentBoxState === true) {
      const totalAmount =
        quantity?.reduce((prev, item) => prev + item.price * item.quantity, 0) +
        volumeTax +
        totalTax;

      form.setFieldsValue({
        totalAmount: `$${totalAmount}`,
      });
    }

    // if (addPaymentBoxState === false) {
    //   form.resetFields();
    // }
  }, [addPaymentBoxState, quantity]);
  useEffect(() => {
    if (productCode !== '') {
      getProductsList();
      getBarcodeProducts();
      if (barCodeState) {
        inputRef.current.state.value = '';
      }
    }
  }, [productCode]);

  useEffect(() => {
    if (skuProductCode !== '') {
      getSkuProductsList();
    }
  }, [skuProductCode]);

  const action = (values) => {
    if (newUserVisible === true) {
      if (!!offlineUserData?._id === false) {
        // setProductData('');
        message.error('Create a user first');
      } else if (!!offlineUserData?._id === true) {
        setProductCode(values);
      }
    } else if (newUserVisible === false) {
      if (!!selectedUserDetails === false) {
        message.error('Please select a customer');
      } else if (!!selectedUserDetails === true) {
        setProductCode(values);
      }
    }
  };
  const selectedSkuAction = (values) => {
    if (newUserVisible === true) {
      if (!!offlineUserData?._id === false) {
        // setProductData('');
        message.error('Create a user first');
      } else if (!!offlineUserData?._id === true) {
        setSkuProductCode(values);
      }
    } else if (newUserVisible === false) {
      if (!!selectedUserDetails === false) {
        message.error('Please select a customer');
      } else if (!!selectedUserDetails === true) {
        setSkuProductCode(values);
      }
    }
  };
  const debouncedSearch = debounce(action, 300);

  const existingCustomerAction = (values) => {
    setKeyword(values);
  };
  const existingDebounceSearch = debounce(existingCustomerAction, 300);
  const [paymentState, setPaymentState] = useState('');
  const handleChange = (value) => {
    setPaymentState(value);
  };

  const removeProduct = (val) => {
    const data = form.getFieldsValue('');
    const data2 = quantity?.find((item) => item?.sku === val?.sku);

    const totalDeductedAmount = data2?.price * data2?.quantity;
    const taxAmount = data2?.volume * data2?.quantity;

    const totalVolumetax = quantity?.reduce((prev, item) => {
      if (
        selectedUserDetails?.address?.state_code === 'Connecticut' ||
        selectedUserDetails?.address?.state_code === 'CT' ||
        selectedUserDetails?.address?.state_code === 'Connecticut CT' ||
        selectedUserDetails?.address?.state_code === 'connecticut' ||
        offlineUserData?.address?.state_code === 'Connecticut' ||
        offlineUserData?.address?.state_code === 'Connecticut CT' ||
        offlineUserData?.address?.state_code === 'connecticut' ||
        offlineUserData?.address?.state_code === 'CT'
      ) {
        return prev + item?.volume * 0.4 * item.quantity;
      }
      return 0;
    }, 0);

    const remainingVolumetax = totalVolumetax - taxAmount;
    setVolumeTax(remainingVolumetax);

    const deleteQuantity = quantity?.filter((item) => item?.sku !== data2?.sku);
    setQuantity([...deleteQuantity]);

    const data3 = productData?.filter((item) => item?._id !== val?._id);

    setProductData([...data3]);

    form.setFieldsValue({
      totalAmount: `$${
        parseFloat(decodeDollarsToDigits(data.totalAmount)) - totalDeductedAmount - taxAmount
      }`,
    });
  };

  const plainOptions = ['Fully Paid', 'Pay Later'];
  const handleChange2 = (value) => {
    setPaymentMethodState(value);
  };
  const onChange1 = ({ target: { value } }) => {
    setPaymentType(value);
  };
  useEffect(() => {
    if (quantity.length > 0) {
      const total = quantity?.reduce((prev, item) => prev + item.price * item.quantity, 0);
      setUpdateTotalAmount(total);
      const totaltax = quantity?.reduce((prev, item) => {
        if (
          selectedUserDetails?.address?.state_code === 'Connecticut' ||
          selectedUserDetails?.address?.state_code === 'CT' ||
          selectedUserDetails?.address?.state_code === 'Connecticut CT' ||
          selectedUserDetails?.address?.state_code === 'connecticut' ||
          offlineUserData?.address?.state_code === 'Connecticut' ||
          offlineUserData?.address?.state_code === 'Connecticut CT' ||
          offlineUserData?.address?.state_code === 'connecticut' ||
          offlineUserData?.address?.state_code === 'CT'
        ) {
          return prev + (item.category.tax / 100) * item.price * item.quantity;
        }
        return 0;
      }, 0);
      setTotalTax(totaltax);
    }
  }, [updateTotalAmount, quantity]);
  useEffect(() => {
    if (quantity.length > 0) {
      const totalVolumetax = quantity?.reduce((prev, item) => {
        if (
          selectedUserDetails?.address?.state_code === 'Connecticut' ||
          selectedUserDetails?.address?.state_code === 'CT' ||
          selectedUserDetails?.address?.state_code === 'Connecticut CT' ||
          selectedUserDetails?.address?.state_code === 'connecticut' ||
          offlineUserData?.address?.state_code === 'Connecticut' ||
          offlineUserData?.address?.state_code === 'Connecticut CT' ||
          offlineUserData?.address?.state_code === 'connecticut' ||
          offlineUserData?.address?.state_code === 'CT'
        ) {
          return prev + item?.volume * 0.4 * item.quantity;
        }
        return 0;
      }, 0);
      setVolumeTax(totalVolumetax);
    }
  }, [quantity]);
  const [checkDateState, setCheckDateState] = useState('');

  console.log(getBarCodeProducts, 'quanity');
  const onChange3 = (date, dateString) => {
    setCheckDateState(dateString);
  };
  const updateTotal = totalTax + updateTotalAmount + volumeTax;

  return (
    <div className="container mx-auto">
      {/* <AutoComplete
    style={{
      width: 200,
    }}
    options={options}
    placeholder="try to type `b`"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  /> */}
      <Page
        title="Add Orders"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Orders',
                path: '/orders',
              },
              {
                name: 'Add Orders',
              },
            ]}
          />
        }
      >
        <Modal
          onCancel={() => setIsModalVisible(false)}
          visible={isModalVisible}
          width={600}
          footer={
            <div className="flex justify-end gap-2">
              <div>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </div>
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsModalVisible(false);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          }
        >
          <div className="p-5">
            <Form
              onFinish={(val) => {
                // onFinish(val);
              }}
              form={form}
              hideRequiredMark
            >
              <div className=" py-5 font-medium text-lg">Please select the payment method</div>

              <Row gutter={[24, 24]}>
                <Col className="pl-8">
                  <Select
                    defaultValue="Select mode of payment"
                    style={{ width: 200, fontSize: 17 }}
                    onChange={handleChange}
                  >
                    <Option value="Credit Card " className="text-lg">
                      Credit Card
                    </Option>
                    <Option value="Bank Wire">Bank wire</Option>

                    <Option value="Cash">Cash</Option>
                  </Select>
                </Col>
              </Row>
              <Col className="mt-5">
                <div>
                  <TextArea
                    showCount
                    maxLength={100}
                    // onChange={onChange}
                    placeholder="Enter notes"
                  />
                </div>
              </Col>
            </Form>
          </div>
        </Modal>
        <Row>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <div className="px-5 mt-2">
              <div className="text-lg font-semibold "> Basic Detail </div>
              {newUserVisible ? (
                <div className="text-sm ">Please enter customer name, email or phone number</div>
              ) : (
                <div className="text-sm ">Search customer by name or phone number</div>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="p-3 bg-white rounded-md w-full">
              <Form
                form={userForm}
                layout="vertical"
                hideRequiredMark
                onFinish={(values) => {
                  if (newUserVisible) {
                    dispatch({
                      type: 'order/createUser',
                      payload: {
                        body: {
                          firstName: values?.firstName,
                          lastName: values?.lastName,
                          phone: values?.phone?.phone,
                          email: values?.email,
                          role: values?.role,
                          companyName: values?.companyName,
                          address: values?.address,
                          userName: values?.userName,
                          status: 'ACCEPTED',
                        },
                      },
                    }).then((res) => {
                      message.success('User created successfully');
                      setOfflineUserData(res?.user);
                      // if (res?.user?._id) {
                      //   dispatch({
                      //     type: 'order/addOrders',
                      //     payload: {
                      //       pathParams: {
                      //         id: res?.user?._id,
                      //       },
                      //       body: {
                      //         productData: quantity?.map((val) => ({
                      //           ...val,
                      //         })),
                      //         address: res?.user?.address,
                      //         type: 'offline',
                      //       },
                      //     },
                      //   }).then((result) => {
                      //     if (result?.data?.error?.status === 400) {
                      //       notification.error({
                      //         message: 'Error',
                      //         description: result?.data?.error?.message,
                      //       });
                      //     }
                      //     if (result?.success) {
                      //       message.success('Order added successfully');
                      //       form.resetFields();
                      //       setOrderId(result?.order?._id);
                      //       history.push(`/orders/all`);
                      //       setProductData([]);
                      //       setQuantity([]);
                      //     } else {
                      //       notification.error({
                      //         message: 'Error',
                      //         description: result?.data?.error?.message,
                      //       });
                      //     }
                      //   });
                      // } else {
                      //   notification.error({
                      //     message: 'Error',
                      //     description: res?.data?.error?.message,
                      //   });
                      // }
                    });
                  } else {
                    dispatch({
                      type: 'order/addOrders',
                      payload: {
                        pathParams: {
                          id: selectedId,
                        },
                        body: {
                          productData: quantity?.map((val) => ({
                            ...val,
                          })),
                          address: selectedUserDetails?.address,
                          type: 'offline',
                          subTotalValue: updateTotalAmount,
                          taxValue: +volumeTax,
                        },
                      },
                    }).then((result) => {
                      if (result?.data?.error?.status === 400) {
                        notification.error({
                          message: 'Error',
                          description: result?.data?.error?.message,
                        });
                      }
                      if (result?.success) {
                        setOrderId(result?.order?._id);
                        message.success('Order added successfully');
                        history.push(`/orders/all`);
                        setProductData([]);
                        setQuantity([]);
                      } else if (
                        result?.data?.error?.message ===
                        'Cast to ObjectId failed for value "undefined" (type string) at path "_id" for model "User"'
                      ) {
                        notification.error({
                          message: 'Error',
                          description: 'Please enter valid customer name or phone number',
                        });
                      }
                    });
                  }
                }}
              >
                {newUserVisible ? (
                  <>
                    <div className="text-green-600 text-right  ">
                      <span
                        className="cursor-pointer font-semibold"
                        onClick={() => {
                          setQuantity([]);

                          setSelectedId('');
                          setProductData('');
                          setProductCode('');

                          form.resetFields();
                          setNewUserVisible(false);
                          setAddPaymentBoxState(false);
                        }}
                      >
                        Select Existing Customer
                      </span>
                    </div>
                    <Row gutter={16}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="firstName"
                          label={<span className="font-semibold">First Name</span>}
                          rules={[
                            {
                              required: true,

                              message: `Please enter first name!`,
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter first name"
                            onChange={() => {
                              setProductData([]);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="lastName"
                          label={<span className="font-semibold">Last Name</span>}
                          rules={[
                            {
                              required: true,

                              message: `Please enter last Name!`,
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter lastName"
                            onChange={() => {
                              setProductData([]);
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="companyName"
                          label={<span className="font-semibold">Company Name</span>}
                          rules={[
                            {
                              required: true,

                              message: `Please enter company name!`,
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter company name"
                            onChange={() => {
                              setProductData([]);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="userName"
                          label={<span className="font-semibold">User Name</span>}
                          rules={[
                            {
                              required: true,

                              message: `Please enter UserName!`,
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter user name"
                            onChange={() => {
                              setProductData([]);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="role"
                          label={<span className="font-semibold">Role</span>}
                          rules={[
                            {
                              required: true,

                              message: `Please select role!`,
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            onChange={() => {
                              setProductData([]);
                            }}
                            placeholder="Select customer role "
                            style={{ width: '100%' }}
                          >
                            <Option value="wholesaler">Wholesaler</Option>
                            <Option value="retailer">Retailer</Option>
                            <Option value="distributor">Distributor</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          required
                          label={<span className="font-semibold">Phone Number</span>}
                        >
                          <PhoneNumber
                            onChange={() => {
                              setProductData([]);
                            }}
                            countryCode={['phone', 'country_code']}
                            rules={[
                              {
                                message: 'Please enter your mobile number',
                              },
                              () => ({
                                validator(_, value) {
                                  if (value?.length === 0) return Promise.resolve();
                                  return Promise.resolve();
                                },
                              }),
                              {
                                max: 10,
                                message: 'Please enter only 10 digits for phone number',
                              },
                              {
                                min: 10,
                                message: 'Please enter atleast 10 digits for phone number',
                              },
                            ]}
                            form={userForm}
                            name={['phone', 'phone']}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          name="email"
                          label={<span className="font-semibold">Email</span>}
                          rules={[
                            {
                              required: true,

                              message: `Please enter email!`,
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter customer email"
                            onChange={() => {
                              setProductData([]);
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Address form={userForm} />
                    <div className="flex justify-end mt-4 w-full">
                      <Button
                        loading={createUserLoading}
                        className=""
                        type="primary"
                        onClick={() => {
                          userForm.submit();
                        }}
                      >
                        Create User
                      </Button>
                    </div>
                  </>
                ) : (
                  <div>
                    <Row gutter={16} className="">
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <div className="text-black py-2 ">Choose from existing customers</div>
                        <AutoComplete
                          dropdownMatchSelectWidth={252}
                          className="SearchWidth"
                          style={{ width: 450 }}
                          options={existingCustomer?.user?.map((val) => ({
                            key: val._id,
                            label: (
                              <div className="border-b py-2">
                                <div className="font-medium">
                                  {val?.firstName} {val?.lastName} {val?.phone} , {val?.companyName}
                                </div>

                                <div className="font-medium">
                                  {val?.address?.address_line_1},{val?.address?.city}
                                  {val?.address?.state_code && `,${val?.address?.state_code}`}
                                  {val?.address?.country_code && `,${val?.address?.country_code}`},
                                  {val?.address?.postal_code},
                                </div>
                              </div>
                            ),
                            value: `${val?.firstName} ${val?.lastName}, ${val.companyName}`,
                          }))}
                          onSelect={(p, options) => {
                            setSelectedId('');
                            setProductCode('');
                            setQuantity([]);
                            setAddPaymentBoxState(false);
                            setUpdateTotalAmount(0);
                            setSkuProductCode('');
                            setProductData('');
                            if (barCodeState) {
                              inputRef.current.state.value = '';
                            }
                            setSelectedId(options.key);
                          }}
                          onSearch={(value) => {
                            existingDebounceSearch(value);
                          }}
                        >
                          <Input size="large" placeholder="Select customer..." />
                        </AutoComplete>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <div className="text-green-600 text-right  ">
                          <span
                            className="cursor-pointer font-semibold"
                            onClick={() => {
                              setQuantity([]);
                              setSelectedId('');
                              setProductCode('');
                              setProductData('');
                              setSkuProductCode('');

                              form.resetFields();
                              setAddPaymentBoxState(false);
                              setNewUserVisible(true);
                            }}
                          >
                            Add New Customer
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </Form>
            </div>
          </Col>

          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <div className="px-5 mt-2">
              <div className="text-lg  font-semibold "> Add Products </div>
              <div className="text-sm ">
                Please enter Stock Keeping Unit(SKU) value or scan the barcode of product
              </div>
              <div className="mt-4">
                <Radio.Group
                  onChange={() => {
                    setBarCodeState(!barCodeState); //
                  }}
                  value={barCodeState}
                >
                  <Radio value={false}>
                    <div className="text-lg mr-4 font-semibold ">Search Product</div>
                  </Radio>
                  <Radio value={true}>
                    <div className="text-lg mr-4 font-semibold ">Scan Barcode</div>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <Form
              form={form}
              layout="vertical"
              hideRequiredMark
              onFinish={(values) => {
                if (newUserVisible) {
                  dispatch({
                    type: 'order/addOrders',
                    payload: {
                      pathParams: {
                        id: offlineUserData?._id,
                      },
                      body: {
                        productData: quantity?.map((val) => ({
                          ...val,
                        })),
                        address: offlineUserData?.address,
                        type: 'offline',
                        subTotalValue: updateTotalAmount,
                        taxValue: +volumeTax,
                      },
                    },
                  }).then((result) => {
                    if (result?.data?.error?.status === 400) {
                      notification.error({
                        message: 'Error',
                        description: result?.data?.error?.message,
                      });
                    }
                    if (result?.success) {
                      message.success('Order added successfully');
                      form.resetFields();
                      setOrderId(result?.order?._id);
                      history.push(`/orders/all`);
                      setProductData([]);
                      setQuantity([]);
                    } else {
                      notification.error({
                        message: 'Error',
                        description: result?.data?.error?.message,
                      });
                    }
                  });
                } else {
                  dispatch({
                    type: 'order/addOrders',
                    payload: {
                      pathParams: {
                        id: selectedId,
                      },
                      body: {
                        productData: quantity?.map((val) => ({
                          ...val,
                        })),
                        address: selectedUserDetails?.address,
                        type: 'offline',
                        subTotalValue: updateTotalAmount,
                        taxValue: +volumeTax,
                      },
                    },
                  }).then((result) => {
                    if (result?.data?.error?.status === 400) {
                      notification.error({
                        message: 'Error',
                        description: result?.data?.error?.message,
                      });
                    }
                    if (result?.success) {
                      setOrderId(result?.order?._id);
                      message.success('Order added successfully');
                      history.push(`/orders/all`);
                      setProductData([]);
                      setQuantity([]);
                    } else if (
                      result?.data?.error?.message ===
                      'Cast to ObjectId failed for value "undefined" (type string) at path "_id" for model "User"'
                    ) {
                      notification.error({
                        message: 'Error',
                        description: 'Please enter valid customer name or phone number',
                      });
                    }
                  });
                }
              }}
            >
              <div className="bg-white rounded-lg mt-3 pb-2">
                <div className="flex flex-wrap  pt-3 px-3">
                  <div className="flex space-x-4 mb-4 w-full justify-between">
                    {barCodeState ? (
                      <Search
                        ref={inputRef}
                        enterButton
                        style={{ width: '450px' }}
                        size="large"
                        // value={inputRef?.current?.state?.value}
                        placeholder="Scan barcodeId..."
                        onChange={(e) => {
                          if (e.target.value !== '') {
                            debouncedSearch(e.target.value);
                          }
                        }}
                      />
                    ) : (
                      <AutoComplete
                        allowClear
                        dropdownMatchSelectWidth={450}
                        style={{ width: 450 }}
                        options={skuProducts?.products
                          ?.filter((item) => item?.product?.isActive !== false)
                          ?.map((val) => ({
                            key: val._id,
                            label: (
                              <div className="border-b py-2">
                                <div className="flex w-full">
                                  <div className="text-sm w-1/4 capitalize">Name:</div>
                                  <div className="text-sm  w-3/4 capitalize">
                                    {val?.attributesVal}
                                  </div>
                                </div>
                                <div className="flex w-full">
                                  <div className="text-sm w-1/4 capitalize">SKU:</div>
                                  <div className="text-sm w-3/4  capitalize">{val?.sku}</div>
                                </div>
                              </div>
                            ),
                            value: `${val?.sku}` || `${val?.attributesVal}`,
                          }))}
                        onSelect={(p, options) => {
                          setGetSkuStateData(true);
                          selectedSkuAction(options.value);
                        }}
                        onSearch={(value) => {
                          debouncedSearch(value);
                        }}
                      >
                        <Input size="large" placeholder="Please enter a product " />
                      </AutoComplete>
                    )}
                  </div>
                </div>
                {productData.length > 0 ? (
                  productData?.map((val) => {
                    return (
                      <div key={val?._id}>
                        <div className="mx-3 my-2 rounded-lg shadow border mt-2">
                          <div className="flex items-center justify-between p-2  w-full">
                            <div className="text-gray-800 flex w-full">
                              <div>
                                <img
                                  src={val?.product?.media?.[0]?.url}
                                  width="100px"
                                  height="100px"
                                  alt="product"
                                />
                              </div>
                              <div className="flex flex-col  gap-2 w-full">
                                <div className="flex gap-2 justify-center  w-full">
                                  <div
                                    className="font-medium "
                                    style={{ fontSize: 14, width: '20%' }}
                                  >
                                    Name :
                                  </div>
                                  <div className="w-3/4 " style={{ fontSize: 12 }}>
                                    {val?.attributesVal}
                                  </div>
                                </div>
                                <div className="flex gap-2 flex justify-center">
                                  <div
                                    className="font-medium  "
                                    style={{ fontSize: 14, width: '20%' }}
                                  >
                                    SKU:
                                  </div>
                                  <div className="w-3/4 " style={{ fontSize: 12 }}>
                                    {val?.sku}
                                  </div>
                                </div>
                                <div className="flex gap-2  justify-center">
                                  <div
                                    className="font-medium  "
                                    style={{ fontSize: 15, width: '20%' }}
                                  >
                                    Price:
                                  </div>
                                  <div className="w-3/4 " style={{ fontSize: 15 }}>
                                    $
                                    {getPrice(
                                      selectedUserDetails?.role
                                        ? selectedUserDetails?.role
                                        : offlineUserData.role,
                                      val?.price,
                                    )}
                                  </div>
                                </div>

                                <div className="flex  justify-center gap-2">
                                  <div
                                    className="font-medium  "
                                    style={{ fontSize: 15, width: '20%' }}
                                  >
                                    Quantity:
                                  </div>
                                  <div className="w-3/4">
                                    <Input
                                      size="medium"
                                      value={
                                        quantity?.filter((i) => i?.sku === val?.sku)[0]?.quantity
                                      }
                                      type="number"
                                      style={{ width: '120px' }}
                                      min={1}
                                      onChange={(e) => {
                                        console.log(e);
                                        if (e.target.value) {
                                          setQuantity(
                                            quantity.map((k) =>
                                              k?.sku === val?.sku
                                                ? {
                                                    ...k,
                                                    // eslint-disable-next-line radix
                                                    quantity: parseInt(e.target.value),
                                                  }
                                                : k,
                                            ),
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="">
                              <DeleteOutlined
                                style={{ color: 'red', fontSize: 18 }}
                                onClick={() => {
                                  removeProduct(val);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <EmptyStateContainer type={'Products'} />
                )}
                {productData?.length > 0 && quantity?.length > 0 ? (
                  <>
                    <div className="flex items-center w-full justify-end pr-4 pt-4">
                      <div className="font-semibold text-lg text-right" style={{ width: '80px' }}>
                        {' '}
                        SubTotal:{' '}
                      </div>
                      <div className="font-medium text-base text-right" style={{ width: '80px' }}>
                        ${updateTotalAmount.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center w-full justify-end pr-4 ">
                      <div className="font-semibold text-lg text-right" style={{ width: '80px' }}>
                        {' '}
                        Tax:{' '}
                      </div>
                      <div className="font-medium text-base text-right" style={{ width: '80px' }}>
                        ${totalTax.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center w-full justify-end pr-4 ">
                      <div className="font-semibold text-lg text-right" style={{ width: '140px' }}>
                        {' '}
                        Volume Tax:{' '}
                      </div>
                      <div className="font-medium text-base text-right" style={{ width: '80px' }}>
                        ${volumeTax.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center w-full justify-end pr-4 ">
                      <div className="font-semibold text-lg text-right" style={{ width: '80px' }}>
                        {' '}
                        Total:{' '}
                      </div>
                      <div className="font-medium text-base text-right" style={{ width: '80px' }}>
                        ${updateTotal.toFixed(2)}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {addPaymentBoxState === false ? (
                <div className="flex justify-end mt-4 w-full">
                  <Button
                    disabled={productData.length === 0}
                    type="primary"
                    className="mr-4"
                    size="middle"
                    onClick={() => {
                      setAddPaymentBoxState(true);
                    }}
                  >
                    Add payment
                  </Button>
                  <Button
                    loading={loading}
                    disabled={productData.length === 0}
                    type="primary"
                    size="middle"
                    onClick={() => {
                      // if (paymentState === '') {
                      //   message.error('Please select payment method');
                      // } else {
                      form.submit();
                      // }
                    }}
                  >
                    Create Order
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </Form>
          </Col>
          {addPaymentBoxState === true ? (
            <>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <div className="px-5 mt-2">
                  <div className="text-lg  font-semibold "> Add Payment</div>
                  <div className="text-sm ">Enter the payment Details</div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <Form
                  onFinish={(values) => {
                    if (newUserVisible === true) {
                      if (paymentType === 'Pay Later') {
                        if (
                          !!form.getFieldsValue('')?.dueDate === false ||
                          !!form.getFieldsValue('')?.partiallyPaymentAmount === false
                        ) {
                          message.error('Enter the fields');
                        } else {
                          dispatch({
                            type: 'order/createUser',
                            payload: {
                              body: {
                                firstName: values?.firstName,
                                lastName: values?.lastName,
                                phone: values?.phone?.phone,
                                email: values?.email,
                                role: values?.role,
                                companyName: values?.companyName,
                                address: values?.address,
                              },
                            },
                          }).then((res) => {
                            if (
                              (paymentType === 'Pay Later' &&
                                !!form.getFieldsValue('')?.dueDate === false) ||
                              !!form.getFieldsValue('')?.partiallyPaymentAmount === false
                            ) {
                              message.error('Enter the fields');
                            }
                            if (res?.user?._id) {
                              dispatch({
                                type: 'order/addOrders',
                                payload: {
                                  pathParams: {
                                    id: res?.user?._id,
                                  },
                                  body: {
                                    productData: quantity?.map((val) => ({
                                      ...val,
                                    })),
                                    address: res?.user?.address,
                                    type: 'offline',
                                    subTotalValue: updateTotalAmount,
                                    taxValue: +volumeTax,
                                  },
                                },
                              }).then((result) => {
                                if (result?.data?.error?.status === 400) {
                                  notification.error({
                                    message: 'Error',
                                    description: result?.data?.error?.message,
                                  });
                                }
                                if (result?.success) {
                                  setOrderId(result?.order?._id);
                                  dispatch({
                                    type: 'payment/createPayment',
                                    payload: {
                                      pathParams: {
                                        id: result?.order?._id,
                                      },
                                      body: {
                                        totalAmount: result?.order?.total,
                                        modeOfPayment: paymentMethodState,
                                        paymentType:
                                          paymentType === 'Fully Paid' ? 'fullyPaid' : 'payLater',
                                        partiallyPaidAmount:
                                          parseFloat(
                                            decodeDollarsToDigits(values?.partiallyPaymentAmount),
                                          ) || 0,
                                        dueDate: Number(values?.dueDate) || 0,
                                        chequeDate: checkDateState,
                                        notes: values?.notes,
                                      },
                                    },
                                  }).then(() => {
                                    history.push(`/orders/all`);
                                    message.success('Order added successfully');
                                    setProductData([]);
                                    setSkuProductCode('');
                                    setQuantity([]);
                                  });
                                } else {
                                  notification.error({
                                    message: 'Error',
                                    description: result?.data?.error?.message,
                                  });
                                }
                              });
                            } else {
                              notification.error({
                                message: 'Error',
                                description: res?.data?.error?.message,
                              });
                            }
                          });
                        }
                      } else if (paymentType === 'Fully Paid') {
                        dispatch({
                          type: 'order/createUser',
                          payload: {
                            body: {
                              firstName: values?.firstName,
                              lastName: values?.lastName,
                              phone: values?.phone?.phone,
                              email: values?.email,
                              role: values?.role,
                              companyName: values?.companyName,
                              address: values?.address,
                            },
                          },
                        }).then((res) => {
                          if (res?.user?._id) {
                            dispatch({
                              type: 'order/addOrders',
                              payload: {
                                pathParams: {
                                  id: res?.user?._id,
                                },
                                body: {
                                  productData: quantity?.map((val) => ({
                                    ...val,
                                  })),
                                  address: res?.user?.address,
                                  type: 'offline',
                                  subTotalValue: updateTotalAmount,
                                  taxValue: +volumeTax,
                                },
                              },
                            }).then((result) => {
                              if (result?.data?.error?.status === 400) {
                                notification.error({
                                  message: 'Error',
                                  description: result?.data?.error?.message,
                                });
                              }
                              if (result?.success) {
                                setOrderId(result?.order?._id);
                                dispatch({
                                  type: 'payment/createPayment',
                                  payload: {
                                    pathParams: {
                                      id: result?.order?._id,
                                    },
                                    body: {
                                      totalAmount: result?.order?.total,
                                      modeOfPayment: paymentMethodState,
                                      paymentType:
                                        paymentType === 'Fully Paid' ? 'fullyPaid' : 'payLater',
                                      partiallyPaidAmount:
                                        parseFloat(
                                          decodeDollarsToDigits(values?.partiallyPaymentAmount),
                                        ) || 0,
                                      dueDate: Number(values?.dueDate) || 0,
                                      chequeDate: checkDateState,
                                      notes: values?.notes,
                                    },
                                  },
                                }).then(() => {
                                  history.push(`/orders/all`);
                                  message.success('Order added successfully');
                                  setProductData([]);
                                  setQuantity([]);
                                  setSkuProductCode('');
                                });
                              } else {
                                notification.error({
                                  message: 'Error',
                                  description: result?.data?.error?.message,
                                });
                              }
                            });
                          } else {
                            notification.error({
                              message: 'Error',
                              description: res?.data?.error?.message,
                            });
                          }
                        });
                      }
                    }
                    if (newUserVisible === false) {
                      if (paymentType === 'Pay Later') {
                        if (
                          !!form.getFieldsValue('')?.dueDate === false ||
                          !!form.getFieldsValue('')?.partiallyPaymentAmount === false
                        ) {
                          message.error('Enter the fields');
                        } else {
                          dispatch({
                            type: 'order/addOrders',
                            payload: {
                              pathParams: {
                                id: selectedId,
                              },
                              body: {
                                productData: quantity?.map((val) => ({
                                  ...val,
                                })),
                                address: selectedUserDetails?.address,
                                type: 'offline',
                                subTotalValue: updateTotalAmount,
                                taxValue: +volumeTax,
                              },
                            },
                          }).then((result) => {
                            if (result?.data?.error?.status === 400) {
                              notification.error({
                                message: 'Error',
                                description: result?.data?.error?.message,
                              });
                            }
                            if (result?.success) {
                              setOrderId(result?.order?._id);
                              dispatch({
                                type: 'payment/createPayment',
                                payload: {
                                  pathParams: {
                                    id: result?.order?._id,
                                  },
                                  body: {
                                    totalAmount: result?.order?.total,
                                    modeOfPayment: paymentMethodState,
                                    paymentType:
                                      paymentType === 'Fully Paid' ? 'fullyPaid' : 'payLater',
                                    partiallyPaidAmount:
                                      parseFloat(
                                        decodeDollarsToDigits(values?.partiallyPaymentAmount),
                                      ) || 0,
                                    dueDate: Number(values?.dueDate) || 0,
                                    chequeDate: checkDateState,
                                    notes: values?.notes,
                                  },
                                },
                              }).then(() => {
                                history.push(`/orders/all`);
                                message.success('Order added successfully');
                                setProductData([]);
                                setQuantity([]);
                                setSkuProductCode('');
                              });
                            } else if (
                              result?.data?.error?.message ===
                              'Cast to ObjectId failed for value "undefined" (type string) at path "_id" for model "User"'
                            ) {
                              notification.error({
                                message: 'Error',
                                description: 'Please enter valid customer name or phone number',
                              });
                            }
                          });
                        }
                      }
                      if (paymentType === 'Fully Paid') {
                        dispatch({
                          type: 'order/addOrders',
                          payload: {
                            pathParams: {
                              id: selectedId,
                            },
                            body: {
                              productData: quantity?.map((val) => ({
                                ...val,
                              })),
                              address: selectedUserDetails?.address,
                              type: 'offline',
                              subTotalValue: updateTotalAmount,
                              taxValue: +volumeTax,
                            },
                          },
                        }).then((result) => {
                          if (result?.data?.error?.status === 400) {
                            notification.error({
                              message: 'Error',
                              description: result?.data?.error?.message,
                            });
                          }
                          if (result?.success) {
                            setOrderId(result?.order?._id);
                            dispatch({
                              type: 'payment/createPayment',
                              payload: {
                                pathParams: {
                                  id: result?.order?._id,
                                },
                                body: {
                                  totalAmount: result?.order?.total,
                                  modeOfPayment: paymentMethodState,
                                  paymentType:
                                    paymentType === 'Fully Paid' ? 'fullyPaid' : 'payLater',
                                  partiallyPaidAmount:
                                    parseFloat(
                                      decodeDollarsToDigits(values?.partiallyPaymentAmount),
                                    ) || 0,
                                  dueDate: Number(values?.dueDate) || 0,
                                  chequeDate: checkDateState,
                                  notes: values?.notes,
                                },
                              },
                            }).then(() => {
                              history.push(`/orders/all`);
                              message.success('Order added successfully');
                              setProductData([]);
                              setQuantity([]);
                              setSkuProductCode('');
                            });
                          } else if (
                            result?.data?.error?.message ===
                            'Cast to ObjectId failed for value "undefined" (type string) at path "_id" for model "User"'
                          ) {
                            notification.error({
                              message: 'Error',
                              description: 'Please enter valid customer name or phone number',
                            });
                          }
                        });
                      }
                    }
                  }}
                  form={form}
                  hideRequiredMark
                >
                  <div className="bg-white rounded-lg mt-3 pb-2">
                    <div className="p-6">
                      <div className="flex justify-between">
                        <div className="text-lg font-medium ">
                          Please select the payment methods
                        </div>
                        <Switch
                          defaultChecked
                          onChange={() => {
                            setAddPaymentBoxState(false);
                          }}
                        />
                      </div>

                      <Row gutter={[24]} className="mt-4">
                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <div className=" text-left font-medium mb-2">Total Amount</div>
                          <Form.Item name="totalAmount">
                            <Input
                              onFocus={(e) => e.target.select()}
                              style={{ textAlign: 'right' }}
                              onBlur={(event) => {
                                const price = event.target.value.replace('/[^0-9a-zA-Z.]/g');

                                form.setFieldsValue({
                                  totalAmount: currencyFormatter.format(currencyParser(price)),
                                });
                              }}
                              size="large"
                            />
                          </Form.Item>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <div className=" text-left  font-medium mb-2">Payment method</div>
                          <Select
                            onChange={handleChange2}
                            size="large"
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            defaultValue={paymentMethodState}
                            style={{ width: '150px' }}
                          >
                            <Option value="Cash" style={{}}>
                              Cash
                            </Option>
                            <Option value="Bank Wire">Bank Wire</Option>
                            <Option value="Credit card">Credit card</Option>
                            <Option value="Cheque">Cheque</Option>
                          </Select>
                        </Col>
                        {paymentMethodState === 'Cheque' ? (
                          <Col xl={12} lg={12} md={12} sm={24} xs={24} className="-mt-2">
                            <div className=" text-left font-medium mb-2">Enter the Cheque Date</div>
                            <Space direction="vertical" className="mb-4">
                              <DatePicker onChange={onChange3} size={'large'} />
                            </Space>
                          </Col>
                        ) : (
                          <></>
                        )}
                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <div className=" text-left font-medium mb-2">Notes</div>
                          <Form.Item name="notes">
                            <Input
                              onFocus={(e) => e.target.select()}
                              style={{ textAlign: 'right' }}
                              size="large"
                            />
                          </Form.Item>
                        </Col>

                        <div className="ml-3">
                          {paymentType === 'Pay Later' ? (
                            <Row gutter={[24]}>
                              <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                                <div className=" text-left  font-medium mb-2 ">
                                  Enter the partial payment amount
                                </div>
                                <Form.Item name="partiallyPaymentAmount">
                                  <Input
                                    onFocus={(e) => e.target.select()}
                                    style={{ textAlign: 'right' }}
                                    onBlur={(event) => {
                                      const price = event.target.value.replace('/[^0-9a-zA-Z.]/g');

                                      form.setFieldsValue({
                                        partiallyPaymentAmount: currencyFormatter.format(
                                          currencyParser(price),
                                        ),
                                      });
                                    }}
                                    size="large"
                                  />
                                </Form.Item>
                              </Col>
                              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                                <div className=" text-left  font-medium mb-2 ">Enter Due Days</div>
                                <Form.Item name="dueDate">
                                  <Input
                                    size="large"
                                    placeholder="Due Date"
                                    type="tel"
                                    onChange={(e) => {
                                      const { value } = e.target;
                                      if (value.match(/^[0-9]*$/)) {
                                        form.setFieldsValue({
                                          dueDate: value,
                                        });
                                      } else {
                                        message.error('Please enter valid Date');
                                      }
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Row>

                      <Col xl={12} lg={12} md={12} sm={24} xs={24} className="">
                        <Radio.Group
                          options={plainOptions}
                          onChange={onChange1}
                          value={paymentType}
                          className="font-medium text-lg"
                        />
                      </Col>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 w-full">
                    <Button
                      loading={loading}
                      disabled={productData.length === 0}
                      type="primary"
                      size="middle"
                      onClick={() => {
                        form.submit();
                        // if (paymentState === '') {
                        //   message.error('Please select payment method');
                        // } else {
                        // }
                      }}
                    >
                      Create Order
                    </Button>
                  </div>
                </Form>
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>
      </Page>
      <InvoiceModal visible={invoiceModal} setVisible={setInvoiceModal} orderId={orderId} />
    </div>
  );
};

export default connect(({ products, order, loading }) => ({
  skuProducts: products.skuProductList,
  getBarCodeProducts: products.getBarCodeProducts,
  getSkuOrders: products.getSkuOrders,
  existingCustomer: order.existingCustomer,
  createUserLoading: loading.effects['order/createUser'],
  loading: loading.effects['order/addOrders'] || loading.effects['payment/createPayment'],
}))(AddOrders);
