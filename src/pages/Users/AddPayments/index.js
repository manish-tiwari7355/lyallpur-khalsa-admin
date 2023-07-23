/* eslint-disable no-underscore-dangle */
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { Button, Col, DatePicker, Input, message, Row, Select, Space } from 'antd';
import { connect, useDispatch, useHistory, useLocation } from 'umi';

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import { order } from '@/utils/endpoints/order';
import { get } from 'lodash';

function AddPayments({ loading }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;
  const [paymentMethodState, setPaymentMethodState] = useState('Cash');
  const [notes, setNotes] = useState('');
  const [orderDetailsState, setOrderDetailsState] = useState([]);

  const orderData = location.getUsersMultipleData;
  const [paymentDate, setPaymentDate] = useState({
    date: dayjs(),
    dateString: '',
  });
  const [chequeDate, setChequeDate] = useState({
    date: dayjs(),
    dateString: '',
  });
  const handleChange = (value) => {
    setPaymentMethodState(value);
    if (value !== 'Cheque') {
      setChequeDate({
        date: dayjs(),
        dateString: '',
      });
    }
  };

  const OnChequeDate = (date, dateString) => {
    setChequeDate({
      date,
      dateString,
    });
  };
  console.log(orderData, 'orderData');
  useEffect(() => {
    if (orderData) {
      orderData
        ?.filter((item) => item.paymentDetails?.status !== 'paid')
        ?.map((item, index) =>
          setOrderDetailsState((prev) => [
            ...prev,
            {
              index,
              orderId: item?.orderId,
              paymentDate: dayjs(),
              notes: '',
              paymentMethod: 'Cash',
              totalAmount:
                !!item?.paymentDetails === true ? item?.paymentDetails?.payableAmount : item.total,
              chequeDate: dayjs(),
              paymentId: item?.paymentDetails?._id,
              order_id: item?._id,
            },
          ]),
        );
    }
  }, [orderData]);
  // eslint-disable-next-line no-underscore-dangle
  const userId = orderData && orderData[0]?.user?._id;

  const submit = () => {
    dispatch({
      type: 'payment/createMultiplePayment',
      payload: {
        pathParams: { id: userId },
        body: {
          orderDetailsState,
        },
      },
    }).then((res) => {
      history.push('/users/all');
      console.log(res, 'red');
    });
  };
  console.log('orderDetailsState', orderDetailsState);

  const getTotalAmount =
    orderData &&
    orderData?.map((item) => {
      if (!!item.paymentDetails === true) {
        return item?.paymentDetails?.payableAmount;
      }
      return item.total;
    });

  const totalAmount = getTotalAmount?.reduce((prev, curr) => prev + curr, 0);

  const orderStatus = orderDetailsState?.every((item) => item.paymentDetails?.status === 'paid');
  console.log('orderStatus', orderStatus);
  return (
    <div className="container mx-auto w-full">
      <Page
        title="Add Payments"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Users',
                path: '/users',
              },

              {
                name: 'Payments',
                // path: `/orders`,
              },
            ]}
          />
        }
      >
        {orderStatus === true ? (
          <>
            <div className="font-semibold text-2xl">Orders are Already Paid</div>
          </>
        ) : (
          <>
            {orderDetailsState?.length > 0 ? (
              <>
                {orderDetailsState?.length >= 2 ? (
                  <>
                    <div className="bg-white rounded shadow mb-3 p-3 w-full">
                      <div className="flex justify-between w-full">
                        <div className="font-semibold text-2xl">Apply to all payments</div>

                        <Button
                          size="large"
                          type="primary"
                          className="mr-10 "
                          onClick={() => {
                            const data =
                              orderDetailsState &&
                              orderDetailsState?.map((item) => {
                                return {
                                  ...item,
                                  paymentDate: paymentDate?.date,
                                  notes,
                                  paymentMethod: paymentMethodState || 'Cash',
                                  chequeDate: chequeDate?.date,
                                };
                              });
                            setOrderDetailsState(data);
                          }}
                        >
                          Apply all
                        </Button>
                      </div>
                      <div className="ml-4">
                        <Row gutter={[24, 24]} className="my-5">
                          <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                            <div className="py-2 font-medium text-base">Payment Date</div>
                            <Space direction="vertical" className="">
                              <DatePicker
                                onChange={(date, dateString) => {
                                  setPaymentDate({
                                    date,
                                    dateString,
                                  });
                                }}
                                size="large"
                              />
                            </Space>
                          </Col>
                          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <div className="py-2 font-medium text-base">Internet Notes</div>
                            <Input
                              size="large"
                              className="w-full"
                              value={notes}
                              onChange={(e) => {
                                setNotes(e.target.value);
                              }}
                            />
                          </Col>
                          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <div className="flex items-center">
                              <div>
                                <div className="py-2 font-medium text-base">Payment type</div>
                                <div className="flex ">
                                  <Select
                                    onChange={handleChange}
                                    size="large"
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    value={paymentMethodState}
                                    style={{ width: '150px', marginRight: '20px' }}
                                  >
                                    <Option value="Cash">Cash</Option>
                                    <Option value="Bank Wire">Bank Wire</Option>
                                    <Option value="Credit card">Credit card</Option>
                                    <Option value="Cheque">Cheque</Option>
                                  </Select>
                                </div>
                              </div>
                              <div>
                                {paymentMethodState === 'Cheque' ? (
                                  <>
                                    <div className="py-2 font-medium text-base ">
                                      Enter the Cheque Date
                                    </div>
                                    <Space direction="vertical" className="">
                                      <DatePicker onChange={OnChequeDate} size={'large'} />
                                    </Space>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="flex items-center mb-8 mt-12">
                  <div className="font-medium text-2xl ">Company Name : </div>
                  <div className="font-medium text-xl ml-2 capitalize">
                    {orderData && orderData[0]?.user?.companyName}
                  </div>
                </div>
                <Row gutter={[24, 24]} className="">
                  <Col xl={3} lg={3} md={3} sm={24} xs={24}>
                    <div className="py-2 font-medium text-lg">Order Id</div>
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                    <div className="py-2 font-medium text-lg">Payment Date</div>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                    <div className="py-2 font-medium text-lg">Internet Notes</div>
                  </Col>
                  <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                    <div className="py-2 font-medium text-lg">Payment type</div>
                  </Col>

                  {paymentMethodState === 'Cheque' ? (
                    <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                      <div className="py-2 font-medium text-lg">Cheque Date</div>
                    </Col>
                  ) : (
                    <></>
                  )}
                  {/* <Col xl={3} lg={3} md={3} sm={24} xs={24}>
                <div className="py-2 font-medium text-lg">Amount</div>
              </Col> */}
                </Row>
                {orderDetailsState?.map((item, index) => {
                  return (
                    // eslint-disable-next-line no-underscore-dangle
                    <div key={item?._id}>
                      <div className="py-3 w-full">
                        <div className="">
                          <Row gutter={[24]} className="">
                            <Col xl={3} lg={3} md={3} sm={24} xs={24}>
                              <div className=" text-lg">{item?.orderId}</div>
                            </Col>
                            <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                              <Space direction="vertical" className="">
                                <DatePicker
                                  value={moment(item?.paymentDate)}
                                  defaultValue={dayjs('YYYY-MM-DD')}
                                  onChange={(e, b) => {
                                    console.log(e, b);
                                    const data = orderDetailsState?.map((itemIn, indexIn) => {
                                      if (index === indexIn) {
                                        return {
                                          ...itemIn,
                                          paymentDate: e,
                                        };
                                      }
                                      return itemIn;
                                    });
                                    console.log(data, 'data');
                                    setOrderDetailsState(data);
                                  }}
                                  size="large"
                                />
                              </Space>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                              <Input
                                size="large"
                                className="w-full"
                                value={item?.notes}
                                onChange={(e) => {
                                  const data = orderDetailsState?.map((itemIn, indexIn) => {
                                    if (index === indexIn) {
                                      return {
                                        ...itemIn,
                                        notes: e.target.value,
                                      };
                                    }
                                    return itemIn;
                                  });
                                  setOrderDetailsState(data);
                                }}
                              />
                            </Col>

                            <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                              <div>
                                <Select
                                  onChange={(e) => {
                                    setPaymentMethodState('Cash');

                                    const data = orderDetailsState?.map((itemIn, indexIn) => {
                                      if (index === indexIn) {
                                        return {
                                          ...itemIn,
                                          paymentMethod: e,
                                        };
                                      }
                                      return itemIn;
                                    });
                                    setOrderDetailsState(data);
                                  }}
                                  size="large"
                                  showSearch
                                  value={item?.paymentMethod}
                                  style={{ width: '150px' }}
                                >
                                  <Option value="Cash">Cash</Option>
                                  <Option value="Bank Wire">Bank Wire</Option>
                                  <Option value="Credit card">Credit card</Option>
                                  <Option value="Cheque">Cheque</Option>
                                </Select>
                              </div>
                            </Col>

                            {paymentMethodState === 'Cheque' || item.paymentMethod === 'Cheque' ? (
                              <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                                <Space direction="vertical" className="">
                                  <DatePicker
                                    value={moment(item?.chequeDate)}
                                    onChange={(e, b) => {
                                      const data = orderDetailsState?.map((itemIn, indexIn) => {
                                        if (index === indexIn) {
                                          return {
                                            ...itemIn,
                                            chequeDate: e,
                                          };
                                        }
                                        return itemIn;
                                      });
                                      setOrderDetailsState(data);
                                    }}
                                    size={'large'}
                                  />
                                </Space>
                              </Col>
                            ) : (
                              <></>
                            )}

                            <Col xl={3} lg={3} md={3} sm={24} xs={24}>
                              <Input
                                size="large"
                                value={`$${item?.totalAmount}`}
                                className="text-right"
                              />
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex w-full justify-between py-6 px-8 mt-8 bg-white ">
                  <div style={{ color: 'transparent' }}>${totalAmount}</div>
                  <div className="text-xl font-medium capitalize">
                    {orderData && orderData[0]?.user?.companyName} Payment Total
                  </div>
                  <div className="text-xl font-medium capitalize">${totalAmount}</div>
                </div>
                <div className="flex w-full justify-end py-6 px-8 mt-8 ">
                  <Button size="large" className="mr-4">
                    Cancel
                  </Button>
                  <Button
                    loading={loading}
                    type="primary"
                    size="large"
                    onClick={() => {
                      // const validation = orderDetailsState?.map((item) => {
                      //   if (!!item.paymentDate === false) {
                      //    return false
                      //   }
                      //   return item
                      // });
                      // console.log(validation)

                      submit();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full h-full justify-center item-center text-2xl font-semibold ml-4">
                Please Select An Order
              </div>
            )}
          </>
        )}
      </Page>
    </div>
  );
}

const mapStateToProps = ({ user, order, loading }) => ({
  currentUser: user?.currentUser,
  geUsersOrder: order?.geUsersOrder,
  loading:
    loading.effects['order/getUserOrders'] || loading.effects['payment/createMultiplePayment'],
});
export default connect(mapStateToProps)(AddPayments);
