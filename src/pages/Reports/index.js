import Page from '@/components/Page';

import React, { useEffect, useState } from 'react';
import { connect, useHistory } from 'umi';
import Breadcrumbs from '@/components/BreadCrumbs';
import { Button, DatePicker, Drawer, message, Select, Spin } from 'antd';

import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');

function Reports({ dispatch, reportsData, loading, loading2 }) {
  const [visible, setVisible] = useState(false);
  const [selectDateRangeState, setSelectDateRangeState] = useState('Select range');
  const [startDateState, setStartDateState] = useState('');
  const [customStartDateState, setCustomStartDateState] = useState('');
  const [customEndDateState, setCustomEndDateState] = useState('');
  const [endDateState, setEndDateState] = useState('');
  const { Option } = Select;
  const history = useHistory();

  const date1 = dayjs(startDateState).format('MM');
  const date2 = dayjs(endDateState).format('MM');
  const updatedDate = date2 - date1;
  const showDrawer = () => {
    setVisible(true);
  };
  const onChange = (value) => {
    setSelectDateRangeState(value);
  };
  const onChange2 = (value) => {
    setCustomStartDateState(value);
  };
  const onChange3 = (value) => {
    setCustomEndDateState(value);
  };

  const onClose = () => {
    setVisible(false);
  };
  // useEffect(() => {
  //   if (reportsData) {
  //     setStartDateState(reportsData?.firstOrderData);
  //     setEndDateState(reportsData?.lastOrderData);
  //   }
  // }, [reportsData, startDateState, endDateState]);
  dayjs.extend(utc);
  const getReports = () => {
    dispatch({
      type: 'reports/getReportsData',
      payload: {
        query: {
          startDate:
            !!startDateState === true
              ? dayjs(startDateState).utc().add(1, 'days').format()
              : dayjs(reportsData?.firstOrderData).format(),
          endDate:
            !!endDateState === true
              ? dayjs(endDateState).utc().format()
              : dayjs(reportsData?.lastOrderData).format(),
        },
      },
    }).then((res) => {
      setSelectDateRangeState('Select Range');
      setVisible(false);
    });
  };
  useEffect(() => {
    getReports();
  }, [dispatch, startDateState, endDateState, reportsData?.firstOrderData]);

  return (
    <div className="container mx-auto">
      <Spin spinning={!!loading}>
        <Drawer
          width={420}
          closable={true}
          title="Select Range"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <div className="flex justify-between">
            <div className="font-medium text-base">Filters</div>
            <Button
              className="font-medium text-base"
              type="primary"
              onClick={() => {
                setSelectDateRangeState('Select Range');
              }}
            >
              Reset all
            </Button>
          </div>
          <div className="font-medium text-lg mt-5">Date range</div>
          <div>
            <Select
              showSearch
              size="large"
              value={selectDateRangeState}
              onChange={onChange}
              style={{ width: '300px', marginTop: '20px' }}
            >
              <Option value="This year">
                <div>
                  <div className="font-medium text-base">This year</div>
                  <div>
                    {dayjs().startOf('year').format('MMMM D, YYYY')}-
                    {dayjs().endOf('year').format('MMMM D, YYYY')}
                  </div>
                </div>
              </Option>
              <Option value="Last year">
                <div>
                  <div className="font-medium text-base">Last year</div>
                  <div>
                    {dayjs().startOf('year').subtract(1, 'year').format('MMMM D, YYYY')}-
                    {dayjs().endOf('year').subtract(1, 'year').format('MMMM D, YYYY')}
                  </div>
                </div>
              </Option>
              <Option value="This Quater">
                <div>
                  <div className="font-medium text-base">This Quater</div>
                  <div>
                    {dayjs().startOf('month').format('MMMM D, YYYY')}-
                    {dayjs().endOf('month').add(2, 'month').format('MMMM D, YYYY')}
                  </div>
                </div>
              </Option>
              <Option value="Last Quater">
                <div>
                  <div className="font-medium text-base">Last Quater</div>
                  <div>
                    {dayjs()
                      .startOf('month')
                      .subtract(3, 'month')
                      .subtract(1, 'year')
                      .format('MMMM D, YYYY')}
                    -
                    {dayjs()
                      .endOf('month')
                      .subtract(1, 'month')
                      .subtract(1, 'year')
                      .format('MMMM D, YYYY')}
                  </div>
                </div>
              </Option>
              <Option value="Custom">
                <div className="font-medium text-base">Custom</div>
              </Option>
            </Select>
          </div>
          {selectDateRangeState === 'Custom' ? (
            <div className="w-full">
              <div className="flex w-full  my-5 items-center">
                <div className="text-base w-1/4 font-medium">Start Date:</div>
                <DatePicker size="large" onChange={onChange2} />
              </div>
              <div className="flex w-full items-center my-5">
                <div className="text-base   w-1/4 font-medium">End Date:</div>
                <DatePicker size="large" onChange={onChange3} />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center mt-10">
            <Button
              size="large"
              className="mr-5"
              onClick={() => {
                setVisible(false);
              }}
            >
              Close
            </Button>
            <Button
              // loading={loading}
              size="large"
              type="primary"
              onClick={() => {
                if (selectDateRangeState === 'This year') {
                  setStartDateState(dayjs().startOf('year').format());
                  setEndDateState(dayjs().endOf('year').format('MMMM  D, YYYY'));
                } else if (selectDateRangeState === 'Last year') {
                  setStartDateState(dayjs().startOf('year').subtract(1, 'year').format());
                  setEndDateState(dayjs().endOf('year').subtract(1, 'year').format());
                } else if (selectDateRangeState === 'This Quater') {
                  setStartDateState(dayjs().startOf('month').format());
                  setEndDateState(dayjs().endOf('month').add(2, 'month').format());
                } else if (selectDateRangeState === 'Last Quater') {
                  setStartDateState(
                    dayjs().startOf('month').subtract(3, 'month').subtract(1, 'year').format(),
                  );
                  setEndDateState(
                    dayjs().endOf('month').subtract(1, 'month').subtract(1, 'year').format(),
                  );
                } else if (selectDateRangeState === 'Custom') {
                  setStartDateState(dayjs(customStartDateState).format());
                  setEndDateState(dayjs(customEndDateState).format());
                }
              }}
            >
              Apply
            </Button>
          </div>
        </Drawer>
        <Page
          title="Sales Tax Summary"
          breadcrumbs={
            <Breadcrumbs
              path={[
                {
                  name: 'Dashboard',
                  path: '/dashboard',
                },
                {
                  name: 'Reports',
                  path: '/reports/all',
                },
              ]}
            />
          }
          primaryAction={
            <div className="flex items-center">
              <Button
                loading={loading2}
                size="middle"
                type="primary"
                className="mr-4"
                onClick={() => {
                  dispatch({
                    type: 'reports/updateReportPayment',
                    payload: {
                      body: {
                        paymentFirstDate: reportsData?.updatedStartDate,
                        paymentLastDate: reportsData?.updatedEndDate,
                        subTotalAmount: reportsData?.subTotalPrice,
                        totalTax: reportsData?.totalTax,
                        totalAmount: reportsData?.totalPrice,
                      },
                    },
                  }).then(() => {
                    message.success('Payment data saved successfully');
                  });
                }}
              >
                Pay
              </Button>
              <Button
                size="middle"
                type="primary"
                className="mr-4"
                onClick={() => {
                  showDrawer();
                }}
              >
                Filter
              </Button>
              <Button
                size="middle"
                type="primary"
                onClick={() => {
                  history.push('/reports/taxpaid');
                }}
              >
                Paid taxes
              </Button>
            </div>
          }
        >
          <div className="w-full border" style={{ padding: '20px', borderRadius: 10 }}>
            <div className="text-3xl  font-bold">Sales Tax Summary</div>
            <div>OHM WHOLESALE 846 WOLCOTT ST WATERBURY CT 06705</div>
            <div className="text-sm font-medium">
              From {dayjs(startDateState || reportsData?.firstOrderData).format('MMMM D, YYYY')} -{' '}
              {dayjs(endDateState || reportsData?.lastOrderData).format('MMMM D, YYYY')}
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-700">Total Billed :</div>
              <div className="text-sm font-medium">{reportsData?.totalPrice}(USD)</div>
            </div>
          </div>
          <div
            className="flex items-center justify-between mx-10 mt-10 w-full"
            style={{ borderBottom: '3px solid #126E32' }}
          >
            <div className={`font-bold text-lg w-1/4 text-left`} style={{ color: '#126E32' }}>
              Tax Name
            </div>
            <div className={`font-bold text-lg w-1/4 text-left`} style={{ color: '#126E32' }}>
              Taxable Amount
            </div>
            <div className={`font-bold text-lg w-1/4 text-left`} style={{ color: '#126E32' }}>
              10% Vape Tax
            </div>
            <div className={`font-bold text-lg w-1/4 text-left`} style={{ color: '#126E32' }}>
              0.40 cent/ml Tax
            </div>
          </div>
          <div
            className="mx-10 mt-10 font-bold text-lg my-5 w-full"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.4)' }}
          ></div>

          <div className="flex items-center justify-between mx-10 w-full ">
            <div className={`font-medium text-lg w-1/4 text-left `} style={{ color: '#000' }}>
              Sales (Billed)
            </div>
            <div className={`font-medium text-lg w-1/4 text-left`} style={{ color: '#000' }}>
              ${reportsData?.totalPrice}
            </div>
            <div className={`font-medium text-lg w-1/4 text-left`} style={{ color: '#000' }}>
              ${reportsData?.totalTax}
            </div>
            <div className={`font-medium text-lg w-1/4 text-left`} style={{ color: '#000' }}>
              ${reportsData?.volumeTax}
            </div>
          </div>
          <div
            className="flex items-center justify-between mx-10 w-full my-3 "
            style={{ borderBottom: '2px solid rgba(0,0,0,0.4)' }}
          >
            <div className={`font-medium text-lg w-1/4 text-left `} style={{ color: '#000' }}>
              Less Expenses
            </div>
            <div className={`font-medium text-lg w-1/4 text-left`} style={{ color: '#000' }}>
              $0.00
            </div>
            <div className={`font-medium text-lg w-1/4 text-left`} style={{ color: '#000' }}>
              $0.00
            </div>
            <div className={`font-medium text-lg w-1/4 text-left`} style={{ color: '#000' }}>
              $0.00
            </div>
          </div>
          <div className="flex items-center justify-between mx-10 w-full ">
            <div className={`font-medium text-lg w-1/4 text-left `} style={{ color: '#000' }}>
              NET
            </div>
            <div className={`font-medium text-lg w-1/4 text-left `} style={{ color: '#000' }}>
              ${reportsData?.totalPrice}
            </div>
            <div className={`font-medium text-lg w-1/4 text-left`} style={{ color: '#000' }}>
              ${reportsData?.totalTax}
            </div>
            <div className={`font-medium text-lg w-1/4 text-left`} style={{ color: '#000' }}>
              ${reportsData?.volumeTax}
            </div>
          </div>
        </Page>
      </Spin>
    </div>
  );
}

const mapStateToProps = ({ user, reports, loading }) => ({
  currentUser: user?.currentUser,
  reportsData: reports?.getReports,
  loading: loading.effects['reports/getReportsData'],
  loading2: loading.effects['reports/updateReportPayment'],
});
export default connect(mapStateToProps)(Reports);
