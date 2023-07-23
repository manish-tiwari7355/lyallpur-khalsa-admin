/* eslint-disable no-underscore-dangle */
import Breadcrumbs from '@/components/BreadCrumbs';
import EmptyStateContainer from '@/components/EmptyStateContainer';
import Page from '@/components/Page';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
} from 'antd';
import { connect, useParams, useHistory } from 'umi';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { currencyFormatter } from '@/utils/common';
import { currencyParser, decodeDollarsToDigits } from '@/utils/utils';
import UpdatedInVoice from '../UpdatedInVoice';
import ReactToPrint from 'react-to-print';
import PrintInVoice from '../PrintInVoice';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { truncate } from 'lodash';
import AddOrderItems from '../AddOrderItems';

const SingleOrderDetail = ({
  dispatch,
  singleOrderDetail,
  paymentData,
  loading,
  updateLoading,
  shippingLoading,
  deleteUpdateOrder,
}) => {
  const { orderId } = useParams();
  const [form] = Form.useForm();
  const [addOrderItemsModal, setAddOrderItemsModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateOrder, setUpdateOrder] = useState({
    visible: false,
    id: '',
    quantity: 0,
  });
  const getOrderData = () => {
    dispatch({
      type: 'order/getSingleOrderDetail',
      payload: {
        pathParams: {
          id: orderId,
        },
      },
    });
  };
  const [paymentType, setPaymentType] = useState('Fully Paid');
  const { Option } = Select;
  const [updateOrderQuantity, setUpdateOrderQuantity] = useState(1);
  const [updateShipping, setUpdateShipping] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [shippingFeeeState, setShippingFeeeState] = useState(false);

  const [paymentMethodState, setPaymentMethodState] = useState('Cash');
  const [onlinePaymentMethodState, setolinePaymentMethodState] = useState('');
  const [shippingFee, setshippingFee] = useState('');
  const [transactionModal, setTransactionModal] = useState(false);
  const onChange1 = ({ target: { value } }) => {
    setPaymentType(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const items = [
    {
      title: 'S.No.',
      key: 'Sr.No.',
      width: 100,
      align: 'left',
      datIndex: '',
      render: (_, __, index) => <div> {index + 1}</div>,
    },
    {
      title: 'Items',
      align: 'left',
      render: (data, record) => (
        <div className="text-sm" style={{ fontSize: 15 }}>
          {' '}
          {record?.sku}
        </div>
      ),
    },
    {
      title: 'QTY',
      align: 'center',
      render: (data, record) => (
        <div className="uppercase" style={{ fontSize: 15 }}>
          {' '}
          {record?.quantity || '--'}
        </div>
      ),
    },
    {
      title: '0.40 cent/ml Tax',
      align: 'center',
      render: (data, record) => (
        <div className="uppercase" style={{ fontSize: 15 }}>
          $
          {singleOrderDetail?.order?.address?.state_code === 'Connecticut' ||
          singleOrderDetail?.order?.address?.state_code === 'Connecticut CT' ||
          singleOrderDetail?.order?.address?.state_code === 'connecticut' ||
          singleOrderDetail?.order?.address?.state_code === 'CT' ||
          singleOrderDetail?.order?.address?.state_code === 'Connecticut (CT)'
            ? (
                (!!record?.variants?.volume === false ? 0 : record?.variants?.volume * 0.4) *
                record.quantity
              ).toFixed(2)
            : 0}
        </div>
      ),
    },
    {
      title: '10% Vape Tax',
      align: 'center',
      render: (data, record) => (
        <div className="uppercase" style={{ fontSize: 15 }}>
          $
          {singleOrderDetail?.order?.address?.state_code === 'Connecticut' ||
          singleOrderDetail?.order?.address?.state_code === 'Connecticut CT' ||
          singleOrderDetail?.order?.address?.state_code === 'connecticut' ||
          singleOrderDetail?.order?.address?.state_code === 'CT' ||
          singleOrderDetail?.order?.address?.state_code === 'Connecticut (CT)'
            ? (
                (!!record?.product === false ? 0 : record?.product?.category?.tax / 100) *
                record?.price *
                record.quantity
              ).toFixed(2)
            : 0}
        </div>
      ),
    },
    {
      title: 'Price',
      align: 'center',
      render: (data, record) => (
        <div className="uppercase" style={{ fontSize: 15 }}>
          ${record?.price.toFixed(2)}
        </div>
      ),
    },

    {
      title: 'Total Price',
      align: 'center',
      dataIndex: 'total',
      render: (data, record) => (
        <div className="uppercase" style={{ fontSize: 15 }}>
          {' '}
          {`$${(record?.price * record?.quantity).toFixed(2)}` || '--'}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'left',

      render: (records) => (
        <div className="flex gap-4">
          {/* updateIndividualOrder */}
          <div>
            {singleOrderDetail?.order.paymentDetails?.status === 'paid' ? (
              <div>--</div>
            ) : (
              <>
                <Button
                  type="link"
                  size="small"
                  style={{ padding: '0px 1px' }}
                  onClick={() => {
                    console.log(records, 'records');
                    // eslint-disable-next-line no-unused-expressions
                    setUpdateOrder({
                      quantity: records?.quantity,
                      visible: true,
                      id: records?._id,
                    });
                  }}
                >
                  <EditOutlined />
                </Button>
              </>
            )}
          </div>
          <div>
            {singleOrderDetail?.order.paymentDetails?.status === 'paid' ? (
              <div>--</div>
            ) : (
              <>
                <Popconfirm
                  loading={deleteUpdateOrder}
                  title={'Are you sure to remove this order item?'}
                  onConfirm={() => {
                    dispatch({
                      type: 'order/deleteIndividualOrder',
                      payload: {
                        pathParams: {
                          id: orderId,
                        },
                        body: {
                          individualOrderedProductId: updateOrder?.id,
                          address: singleOrderDetail?.order?.address,
                        },
                      },
                    }).then((res) => {
                      getOrderData();
                      setUpdateOrderQuantity(1);
                      setUpdateOrder({
                        visible: false,
                        id: '',
                        quantity: 0,
                      });
                    });
                  }}
                  onCancel={() => {
                    setUpdateOrder({
                      visible: false,
                      id: '',
                      quantity: 0,
                    });
                  }}
                  okText="Confirm"
                  cancelText="No"
                  okType="danger"
                >
                  <Button
                    type="link"
                    danger
                    size="small"
                    style={{ padding: '0px 1px' }}
                    onClick={() => {
                      setUpdateOrder({
                        ...updateOrder,
                        visible: false,
                        id: records?._id,
                      });
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              </>
            )}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (orderId) {
      getOrderData();
    }
  }, [dispatch, orderId]);

  const plainOptions = ['Fully Paid', 'Pay Later'];
  const handleChange = (value) => {
    setPaymentMethodState(value);
  };

  const getPaymentDetails = () => {
    dispatch({
      type: 'payment/getPayments',
      payload: {
        pathParams: {
          // eslint-disable-next-line no-underscore-dangle
          id: singleOrderDetail?.order?.paymentDetails?._id,
        },
      },
    });
  };
  const [checkDateState, setCheckDateState] = useState('');
  const onChange3 = (date, dateString) => {
    console.log(date, dateString);
    setCheckDateState(dateString);
  };

  const onFinish = (val) => {
    dispatch({
      type: 'payment/createPayment',
      payload: {
        pathParams: {
          id: orderId,
        },
        body: {
          totalAmount: parseFloat(decodeDollarsToDigits(val?.totalAmount)),
          modeOfPayment: singleOrderDetail?.order?.paymentmethod || paymentMethodState,
          paymentType: paymentType === 'Fully Paid' ? 'fullyPaid' : 'payLater',
          partiallyPaidAmount: parseFloat(decodeDollarsToDigits(val?.partiallyPaymentAmount)) || 0,
          dueDate: Number(val?.dueDate) || 0,
          chequeDate: checkDateState,
          notes: val?.notes,
        },
      },
    }).then((res) => {
      getOrderData();
      console.log(res);
      getPaymentDetails();
      setPaymentMethodState('');
      form.resetFields();
      setPaymentType('');
      setIsModalVisible(false);
    });
  };
  const update = (val) => {
    dispatch({
      type: 'payment/updatePayment',
      payload: {
        pathParams: {
          id: paymentData?.payment?._id,
        },
        body: {
          totalAmount: parseFloat(decodeDollarsToDigits(val?.totalAmount)),

          modeOfPayment: singleOrderDetail?.order?.paymentmethod || paymentMethodState,
          paymentType: paymentType === 'Fully Paid' ? 'fullyPaid' : 'payLater',
          partiallyPaidAmount: parseFloat(decodeDollarsToDigits(val?.partiallyPaymentAmount)) || 0,
          dueDate: Number(val?.dueDate) || 0,
          chequeDate: checkDateState,
          notes: val?.notes,
        },
      },
    }).then((res) => {
      getOrderData();
      getPaymentDetails();

      setPaymentMethodState('');
      form.resetFields();
      setPaymentType('');
      setIsModalVisible(false);
    });
  };

  useEffect(() => {
    getPaymentDetails();
    if (
      singleOrderDetail?.order?.type === 'online' &&
      !!singleOrderDetail?.order?.paymentDetails === false
    ) {
      setolinePaymentMethodState(singleOrderDetail?.order?.paymentmethod);
    }
  }, [
    dispatch,
    singleOrderDetail?.order?.paymentDetails?._id,
    singleOrderDetail?.order?.paymentmethod,
  ]);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle

    if (paymentData?.payment?._id) {
      setPaymentMethodState(paymentData?.payment?.modeOfPayment);
      setolinePaymentMethodState(paymentData?.payment?.modeOfPayment);
      form.setFieldsValue({
        totalAmount: `$${singleOrderDetail?.order?.paymentDetails?.payableAmount}`,
      });
      // eslint-disable-next-line no-underscore-dangle
    } else if (orderId || !!paymentData?.payment?._id === false) {
      form.setFieldsValue({
        totalAmount: `$${singleOrderDetail?.order?.total}`,
        paymentmethod: singleOrderDetail?.order?.paymentmethod,
      });
    }
  }, [paymentData, isModalVisible, orderId]);

  console.log('singleOrderDetail?.order?.paymentmethod', singleOrderDetail?.order?.paymentmethod);
  const componentRef = useRef();

  useEffect(() => {
    setshippingFee('');
    if (singleOrderDetail?.order?.shippingFee > 0) {
      setUpdateShipping(true);
      setshippingFee(`$${singleOrderDetail?.order?.shippingFee}`);
      setShippingFeeeState(true);
    } else if (singleOrderDetail?.order?.shippingFee === 0) {
      setUpdateShipping(false);
    }
  }, [singleOrderDetail?.order?.shippingFee]);

  return (
    <div className="container mx-auto">
      <Spin spinning={!!deleteUpdateOrder}>
        <Modal
          centered
          visible={updateOrder?.visible}
          destroyOnClose
          footer={
            <div>
              <Button
                onClick={() => {
                  setUpdateOrder({
                    visible: false,
                    id: '',
                    quantity: 0,
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                loading={deleteUpdateOrder}
                onClick={() => {
                  dispatch({
                    type: 'order/updateIndividualOrder',
                    payload: {
                      pathParams: {
                        id: orderId,
                      },
                      body: {
                        individualOrderedProductId: updateOrder?.id,
                        quantity: Number(updateOrder?.quantity),
                        address: singleOrderDetail?.order?.address,
                      },
                    },
                  })
                    .then((res) => {
                      console.log(res, 'res1');
                      getOrderData();
                      setUpdateOrderQuantity(1);

                      setUpdateOrder({
                        visible: false,
                        id: '',
                        quantity: 0,
                      });
                    })
                    .catch((err) => {
                      notification.error({
                        message: 'Error',
                        description: err?.data?.error?.message,
                      });
                    });
                }}
              >
                Ok
              </Button>
            </div>
          }
          onOk={() => {}}
          onCancel={() => {
            setUpdateOrder({
              visible: false,
              id: '',
              quantity: 0,
            });
          }}
        >
          <div className="p-5">
            <div className="font-semibold text-xl">Update order</div>

            <div className="flex mt-8 items-center">
              <div className="text-lg mr-5 font-semibold ">Enter Quantity :</div>
              <div style={{ width: '100px' }}>
                <Input
                  type="number"
                  min={1}
                  size="large"
                  placeholder="Enter inventory"
                  value={updateOrder.quantity}
                  onChange={(e) => {
                    setUpdateOrder({
                      ...updateOrder,
                      quantity: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
        <Page
          title={<span>Order Number : {`#${singleOrderDetail?.order?.orderId}`}</span>}
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
                  name: 'Order Number',
                },
              ]}
            />
          }
          primaryAction={
            <div className="flex flex-row ">
              {singleOrderDetail?.order?.paymentDetails?.status === 'paid' ? (
                <>
                  <Button size="middle" className="mr-4" type="primary">
                    Paid
                  </Button>

                  <Button
                    size="middle"
                    type="primary"
                    className="mr-4"
                    onClick={() => {
                      if (singleOrderDetail?.order.productData?.length === 0) {
                        message.error('Please add atleast one product');
                      } else {
                        setInvoiceModal(true);
                      }
                    }}
                  >
                    View Invoice
                  </Button>
                  <ReactToPrint
                    trigger={() => <Button type="primary">Print Invoice!</Button>}
                    content={() => componentRef.current}
                    pageStyle="100px"
                  />
                </>
              ) : (
                <>
                  <Button
                    size="middle"
                    type="primary"
                    className="mr-4"
                    onClick={() => {
                      setAddOrderItemsModal(true);
                    }}
                  >
                    Add product
                  </Button>
                  <Button
                    size="middle"
                    className="mr-4"
                    type="primary"
                    onClick={() => {
                      if (singleOrderDetail?.order.productData?.length === 0) {
                        message.error('Please add atleast one product');
                      } else {
                        showModal();
                      }
                    }}
                  >
                    {!!singleOrderDetail?.order?.paymentDetails === false
                      ? 'Add Payment'
                      : 'Update Payment'}
                  </Button>
                  <Button
                    size="middle"
                    type="primary"
                    className="mr-4"
                    onClick={() => {
                      if (singleOrderDetail?.order.productData?.length === 0) {
                        message.error('Please add atleast one product');
                      } else {
                        setInvoiceModal(true);
                      }
                    }}
                  >
                    View Invoice
                  </Button>
                  <ReactToPrint
                    trigger={() => (
                      <Button type="primary" onClick={() => {}}>
                        Print Invoice!
                      </Button>
                    )}
                    content={() => componentRef.current}
                    pageStyle="60px"
                  />
                </>
              )}
            </div>
          }
        >
          <AddOrderItems
            visible={addOrderItemsModal}
            getOrderData={() => getOrderData()}
            setVisible={setAddOrderItemsModal}
            orderData={singleOrderDetail?.order}
          />
          <UpdatedInVoice
            ref={componentRef}
            visible={invoiceModal}
            setVisible={setInvoiceModal}
            orderData={singleOrderDetail?.order}
          />
          <div style={{ display: 'none' }}>
            <PrintInVoice ref={componentRef} orderData={singleOrderDetail?.order} />
          </div>
          <Modal
            centered
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={
              <div className="flex justify-end gap-2">
                <div>
                  <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                </div>
                <div>
                  <Button
                    loading={loading}
                    type="primary"
                    onClick={() => {
                      form.validateFields().then(() => {
                        form.submit();
                      });
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            }
          >
            <div className="p-6">
              <div className="text-lg font-medium ">Please select the payment method</div>
              <Form
                onFinish={(val) => {
                  if (!!singleOrderDetail?.order?.paymentDetails === false) {
                    onFinish(val);
                  } else {
                    update(val);
                  }
                }}
                form={form}
                hideRequiredMark
              >
                <Row gutter={[24]} className="mt-4">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className=" text-left font-medium mb-2">Total Amount</div>
                    <Form.Item name="totalAmount">
                      <Input
                        disabled
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
                  {/* {singleOrderDetail?.order?.type === 'online' ? (
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <div className=" text-left  font-medium mb-2">Payment method</div>
                      <Input disabled size="large" defaultValue={onlinePaymentMethodState}></Input>
                    </Col>
                  ) : ( */}
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className=" text-left  font-medium mb-2">Payment method</div>
                    <Select
                      onChange={handleChange}
                      size="large"
                      showSearch
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      defaultValue={onlinePaymentMethodState || paymentMethodState}
                      style={{ width: '250px' }}
                    >
                      <Option value="Cash">Cash</Option>
                      <Option value="Bank Wire">Bank Wire</Option>
                      <Option value="Credit card">Credit card</Option>
                      <Option value="Cheque">Cheque</Option>
                    </Select>
                  </Col>
                  {/* )} */}
                  {paymentMethodState === 'Cheque' ? (
                    <>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} className="-mt-2">
                        <div className=" text-left font-medium mb-2">Enter the Cheque Date</div>
                        <Space direction="vertical" className="mb-4">
                          <DatePicker onChange={onChange3} className="w-full" size={'large'} />
                        </Space>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} className="-mt-2">
                        <div className=" text-left font-medium mb-2">Notes</div>
                        <Form.Item name="notes">
                          <Input
                            onFocus={(e) => e.target.select()}
                            placeholder="Enter notes"
                            size="large"
                          />
                        </Form.Item>
                      </Col>{' '}
                    </>
                  ) : (
                    <></>
                  )}
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
              </Form>
            </div>
          </Modal>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <div className="bg-white rounded-lg p-4 ">
                <div className="text-lg font-semibold border-b pb-2">
                  Customer And Order Details
                </div>
                <div className="flex justify-between text-base font-semibold border-b py-2">
                  <div>Customer Name</div>
                  <div className="capitalize">
                    {`${singleOrderDetail?.order?.user?.firstName || '--'}  
                  ${singleOrderDetail?.order?.user?.lastName || '--'}`}
                  </div>
                </div>
                <div className="flex justify-between text-base font-semibold border-b py-2">
                  <div>Company Name</div>
                  <div className="capitalize">
                    {`${singleOrderDetail?.order?.user?.companyName || '--'} `}
                  </div>
                </div>
                <div className="flex justify-between text-base font-semibold border-b py-2">
                  <div>Phone Number</div>
                  <div>
                    {singleOrderDetail?.order?.user?.phone
                      .replace(/\D/g, '')
                      .replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3')}
                  </div>
                </div>
                <div className="flex justify-between text-base font-semibold border-b py-2">
                  <div>Type</div>
                  <div>
                    {singleOrderDetail?.order?.type === 'offline' ? 'Cash / carry' : 'Online'}
                  </div>
                </div>
                <div className="flex justify-between text-base font-semibold  py-2">
                  <div>Note</div>
                  <div>{singleOrderDetail?.order?.paymentDetails?.notes || 'N/A'}</div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <div className="bg-white rounded-lg p-4 ">
                <div className="text-lg font-semibold  pb-2">Delivery Address</div>
                <div className="flex  text-base   py-2">
                  <div className="font-semibold capitalize">Address line : </div>
                  <div> {singleOrderDetail?.order?.address?.address_line_1}</div>
                </div>
                <div className="flex  text-base   py-2">
                  <div className="font-semibold">State : </div>
                  <div className="capitalize ml-2">
                    {' '}
                    {singleOrderDetail?.order?.address?.state_code || '--'}
                  </div>
                </div>
                {/* <div className="flex  text-base   py-2">
                <div className="font-semibold">Flat / Building Name : </div>
                <div>---</div>
              </div> */}
                <div className="flex  text-base  py-2">
                  <div className="font-semibold">City : </div>
                  <div className="capitalize ml-2">
                    {' '}
                    {singleOrderDetail?.order?.address?.city || '--'}
                  </div>
                </div>
                <div className="flex  text-base   py-2">
                  <div className="font-semibold">Postcode : </div>
                  <div className="ml-2">
                    {' '}
                    {singleOrderDetail?.order?.address?.postal_code || '--'}
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div
                className="bg-white rounded-lg p-4"
                style={{ overflow: 'auto', minHeight: '320px', height: '600px' }}
              >
                <Table
                  loading=""
                  pagination={false}
                  columns={items}
                  rowKey={(record) => record?._id}
                  dataSource={singleOrderDetail?.order?.productData}
                  locale={{
                    emptyText: <EmptyStateContainer type={'Items'} />,
                  }}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="bg-white rounded-lg p-4">
                <div className="text-lg ">Order Summary</div>
                <div className="flex justify-between text-base  py-2">
                  <div className="font-semibold">Order created</div>
                  <div>{moment(singleOrderDetail?.order?.createdAt).format('ll')}</div>
                </div>
                <div className="flex justify-between text-base  py-2">
                  <div className="font-semibold">Order Time</div>
                  <div>{moment(singleOrderDetail?.order?.createdAt).format('LT')}</div>
                </div>
                <div className="flex justify-between text-base  py-2">
                  <div className="font-semibold">Subtotal</div>
                  <div>${singleOrderDetail?.order?.subTotal}</div>
                </div>
                <div className="flex justify-between text-base  py-2">
                  <div className="font-semibold">Tax</div>
                  <div>${singleOrderDetail?.order?.tax}</div>
                </div>
                <div className="flex justify-between text-base  py-2">
                  <div className="font-semibold">Volume tax</div>
                  <div>
                    $
                    {!!singleOrderDetail?.order?.volumeTax === false
                      ? 0
                      : singleOrderDetail?.order?.volumeTax?.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between text-base my-2 py-2">
                  <div className="font-semibold">Delivery Fee</div>
                  <div>${singleOrderDetail?.order?.shippingFee}</div>
                </div>
              </div>

              {shippingFeeeState ? (
                <div className="my-4 flex justify-between text-base items-center">
                  <Input
                    placeholder="Enter the payment Shipping"
                    className=""
                    style={{ width: '300px' }}
                    size="large"
                    value={shippingFee}
                    onChange={(e) => {
                      setshippingFee(e.target.value);
                    }}
                    onBlur={(e) => {
                      const fee = e.target.value.replace('/[^0-9a-zA-Z.]/g');
                      setshippingFee(currencyFormatter.format(currencyParser(fee)));
                    }}
                  />
                  {/* <CloseOutlined
                  onClick={() => {
                    setshippingFee('');
                    setShippingFeeeState(false);
                  }}
                /> */}
                </div>
              ) : (
                <></>
              )}

              {!updateShipping ? (
                <>
                  {!shippingFeeeState ? (
                    <Button
                      type="primary"
                      className="mt-2"
                      onClick={() => {
                        setShippingFeeeState(true);
                      }}
                    >
                      Add Shipping Fee
                    </Button>
                  ) : (
                    <Button
                      loading={!updateShipping ? shippingLoading : updateShipping}
                      type="primary"
                      className="mt-2"
                      onClick={() => {
                        dispatch({
                          type: 'order/addShippingFee',
                          payload: {
                            pathParams: {
                              id: orderId,
                            },
                            body: {
                              shippingFee: parseFloat(decodeDollarsToDigits(shippingFee)),
                              total: singleOrderDetail?.order?.total,
                            },
                          },
                        }).then(() => {
                          getOrderData();
                          setUpdateShipping(true);
                        });
                      }}
                    >
                      {!updateShipping ? 'Add Shipping Fee' : 'Update shipping fee'}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  type="primary"
                  className="mt-2"
                  loading={updateLoading}
                  onClick={() => {
                    dispatch({
                      type: 'order/updateShipping',
                      payload: {
                        pathParams: {
                          id: orderId,
                        },
                        body: {
                          shippingFee: parseFloat(decodeDollarsToDigits(shippingFee)),
                        },
                      },
                    }).then(() => {
                      getOrderData();
                      setUpdateShipping(true);
                    });
                  }}
                >
                  Update Shipping Fee
                </Button>
              )}

              <div className="bg-white rounded-lg p-4 mt-4">
                <div className="flex justify-between text-base  py-2">
                  <div className="font-semibold">Total</div>
                  <div>${singleOrderDetail?.order?.total.toFixed(2)}</div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <div className="bg-white rounded-lg p-4 ">
                {!!singleOrderDetail?.order?.paymentDetails === false ? (
                  <div className="">
                    <div className="font-medium text-xl">No payment has been made yet!</div>
                  </div>
                ) : (
                  <>
                    <div className="text-lg ">Payment Summary</div>
                    {/* <div className="flex justify-between text-base  py-2 mt-2">
                    <div className="font-semibold">Payment Method</div>
                    <div className="font-medium text-lg">
                      {singleOrderDetail?.order?.paymentDetails?.modeOfPayment}
                    </div>
                  </div> */}

                    <div className="flex justify-between text-base  py-2 ">
                      <div className="font-medium ">Status</div>
                      <div className="font-medium   uppercase " style={{ fontSize: 15 }}>
                        {singleOrderDetail?.order?.paymentDetails?.status}
                      </div>
                    </div>
                    {singleOrderDetail?.order?.paymentDetails?.status !== 'paid' ? (
                      <>
                        <div className="flex justify-between text-base  py-2">
                          <div className="font-medium">Paid Amount</div>
                          <div className="font-medium " style={{ fontSize: 15 }}>
                            ${singleOrderDetail?.order?.paymentDetails?.partiallyPaidAmount}
                          </div>
                        </div>
                        <div className="flex justify-between text-base  py-2 ">
                          <div className="font-medium">Due Date</div>
                          <div className="font-medium " style={{ fontSize: 15 }}>
                            {moment(singleOrderDetail?.order?.paymentDetails?.updatedDate).format(
                              'DD-MM-YYYY',
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between text-base  py-2 ">
                          <div className="font-medium">Amount Left</div>
                          <div className="font-medium " style={{ fontSize: 15 }}>
                            $
                            {singleOrderDetail?.order?.paymentDetails?.payableAmount > 0
                              ? singleOrderDetail?.order?.paymentDetails?.payableAmount
                              : 0}
                          </div>
                        </div>
                        {singleOrderDetail?.order?.paymentDetails?.payableAmount < 0 ? (
                          <div className="flex justify-between text-base  py-2 ">
                            <div className="font-medium">Amount to pay </div>
                            <div className="font-medium " style={{ fontSize: 15 }}>
                              ${singleOrderDetail?.order?.paymentDetails?.payableAmount}
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}

                    {/* <div className="flex justify-between text-base  py-2 ">
                    <div className="font-medium">Balance</div>
                    <div className="font-medium " style={{ fontSize: 15 }}>
                      ${singleOrderDetail?.order?.paymentDetails?.totalAmount}
                    </div>
                  </div> */}
                    <div className="flex justify-between text-base  py-2 ">
                      <div className="font-medium">Transaction History</div>
                      <div className="font-medium " style={{ fontSize: 15 }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            setTransactionModal(true);
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </div>

                    {/* <div className="flex justify-between text-base  py-2 ">
                    <div className="font-semibold">Payment Type</div>
                    <div className="font-medium text-lg">
                      {singleOrderDetail?.order?.paymentDetails?.paymentType}
                    </div>
                  </div> */}
                  </>
                )}
              </div>
            </Col>
          </Row>
          <div></div>
        </Page>
        <Modal
          width={1000}
          centered
          visible={transactionModal}
          onOk={() => setTransactionModal(false)}
          onCancel={() => setTransactionModal(false)}
          closable={false}
          footer={false}
          bodyStyle={{
            width: '1000px',
            backgroundColor: 'white',
            padding: '20px',
          }}
        >
          <div className="p-6 bg-white h-full bg-gray-100">
            <div className="font-semibold text-lg mb-4">Transaction History</div>
            <div className="flex  items-center w-full mb-4">
              <div className=" text-center font-medium" style={{ width: '50px', fontSize: '16px' }}>
                S.no
              </div>
              <div
                className=" text-center font-medium"
                style={{ width: '150px', fontSize: '16px' }}
              >
                Paid Amount
              </div>
              <div
                className=" text-center font-medium"
                style={{ width: '150px', fontSize: '16px' }}
              >
                Payment Method
              </div>
              <div
                className=" text-center font-medium"
                style={{ width: '150px', fontSize: '16px' }}
              >
                Cheque Date
              </div>
              <div
                className=" text-center font-medium"
                style={{ width: '150px', fontSize: '16px' }}
              >
                Created At
              </div>
              <div
                className=" text-center font-medium"
                style={{ width: '150px', fontSize: '16px' }}
              >
                Due Date
              </div>
              <div
                className=" text-center font-medium"
                style={{ width: '150px', fontSize: '16px' }}
              >
                Time
              </div>
            </div>
            {paymentData?.payment?.transactionRecord?.map((item, index) => {
              return (
                <div className="flex  item-center  w-full" key={item?._id}>
                  <div
                    className="  text-center font-medium "
                    style={{ width: '50px', fontSize: '15px' }}
                  >
                    {index + 1}
                  </div>
                  <div
                    className="  text-center font-medium"
                    style={{ width: '150px', fontSize: '15px' }}
                  >
                    ${item?.partiallyPaidAmount}
                  </div>
                  <div
                    className="  text-center font-medium"
                    style={{ width: '150px', fontSize: '15px' }}
                  >
                    {item.modeOfPayment}
                  </div>
                  <div
                    className="  text-center font-medium"
                    style={{ width: '150px', fontSize: '15px' }}
                  >
                    {item.modeOfPayment !== 'Cheque'
                      ? '--'
                      : moment(item.chequeDate).format('DD MMM YYYY')}
                  </div>
                  <div
                    className="  text-center font-medium"
                    style={{ width: '150px', fontSize: '15px' }}
                  >
                    {moment(item.createdAt).format('DD MMM YYYY')}
                  </div>
                  <div
                    className="  text-center font-medium"
                    style={{ width: '150px', fontSize: '15px' }}
                  >
                    {moment(item.updatedDate).format('DD MMM YYYY')}
                  </div>
                  <div
                    className="  text-center font-medium"
                    style={{ width: '150px', fontSize: '15px' }}
                  >
                    {moment(item.updatedDate).format('HH:mm')}
                  </div>
                  {/* <div
                  className="  text-center font-medium"
                  style={{ width: '150px', fontSize: '15px' }}
                >
                  {moment(singleOrderDetail?.order?.paymentDetails?.updatedDate, 'YYYY-MM-DD').diff(
                    moment(singleOrderDetail?.order?.paymentDetails?.createdAt, 'YYYY-MM-DD'),
                    'days',
                  )}{' '}
                </div> */}
                </div>
              );
            })}
            <div className="w-full flex flex-col justify-end items-end mt-4">
              <div className="flex items-center">
                <div className="font-medium" style={{ fontSize: '16px' }}>
                  Amount Left :
                </div>
                <div className="font-medium" style={{ fontSize: '16px' }}>
                  ${singleOrderDetail?.order?.paymentDetails?.payableAmount}
                </div>
              </div>
              <div className="flex items-center">
                <div className="font-medium" style={{ fontSize: '16px' }}>
                  Total Amount :
                </div>
                <div className="font-medium" style={{ fontSize: '16px' }}>
                  ${singleOrderDetail?.order?.total}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </Spin>
    </div>
  );
};

export default connect(({ order, payment, loading }) => ({
  singleOrderDetail: order?.singleOrderDetail,
  paymentData: payment?.paymentData,
  shippingLoading: loading.effects['order/addShippingFee'],
  deleteUpdateOrder:
    loading.effects['order/deleteIndividualOrder'] ||
    loading.effects['order/updateIndividualOrder'],
  updateLoading: loading.effects['order/updateShipping'],
  loading:
    loading.effects['payment/getPayments'] ||
    loading.effects['payment/createPayment'] ||
    loading.effects['payment/updatePayment'],
}))(SingleOrderDetail);
