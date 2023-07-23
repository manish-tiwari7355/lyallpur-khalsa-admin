/* eslint-disable no-underscore-dangle */
import { Button, Col, Modal, Row } from 'antd';
import React, { useEffect } from 'react';
import { connect, history } from 'umi';

import './index.less';

const InvoiceModal = ({ visible, setVisible, orderId, dispatch, singleOrderDetail }) => {
  useEffect(() => {
    dispatch({
      type: 'order/getSingleOrderDetail',
      payload: {
        pathParams: {
          id: orderId,
        },
      },
    });
  }, [dispatch, orderId]);

  return (
    <div>
      <Modal
        title={null}
        visible={visible}
        closable={false}
        onCancel={() => setVisible(false)}
        style={{ width: '720px' }}
        footer={
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={() => setVisible(false)}
              style={{ marginRight: '10px' }}
            >
              Print
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setVisible(false);
                history.push('/orders');
              }}
            >
              Close
            </Button>
          </div>
        }
        bodyStyle={{ height: '60vh', overflow: 'auto' }}
      >
        <div className="p-5">
          <div className="bg-red-600 rounded-lg  text-white font-normal p-3 px-4 flex justify-between">
            <div>
              <div className=" text-lg">OHM WHOLESALE</div>
              <div className="text-base">2005788333</div>
            </div>
            <div className="text-base ">
              <div>846 wolcott st</div>
              <div>waterbury, Connecticut</div>
              <div>06705</div>
              <div>United States</div>
            </div>
          </div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <div className="border-r">
                <div className="w-full mt-5 ">
                  <table gutter={[16, 16]} className="w-full">
                    <tr className="text-red-600 border-b border-black">
                      <th className="pr-4">Item</th>
                      <th className="px-4">Rate</th>
                      <th className="px-4">Qty</th>
                      <th className="pl-4">Line Total</th>
                    </tr>
                    {singleOrderDetail?.order?.productData?.map((val) => {
                      return (
                        <tr key={val?._id} className="text-black font-semibold border-b py-1">
                          <td className="pr-4">
                            <div className="text-sm">{val?.product?.name}</div>
                            <div className="text-xs">{val?.productDetails?.attributes}</div>
                          </td>
                          <td className="px-4">${val?.price}</td>
                          <td className="px-4">{val?.quantity}</td>
                          <td className="pl-4">${val?.price * val?.quantity}</td>
                        </tr>
                      );
                    })}
                  </table>
                  <div className="text-right font-semibold">
                    <div className=" text-black  px-5 mt-4 space-y-2">
                      <div>Sub Total : $ {singleOrderDetail?.order?.subTotal}</div>
                      <div className="border-b pb-2">Tax : $ {singleOrderDetail?.order?.tax}</div>
                    </div>
                    <div className=" text-black  px-5 mt-4 space-y-2">
                      <div>Total : $ {singleOrderDetail?.order?.total}</div>
                      <div className="border-b pb-2">Amount Paid : $ 0.00</div>
                    </div>
                    <div className=" text-red-600  px-5 mt-2 space-y-2">
                      <div className="border-b pb-2">
                        Amount Due (USD) : ${singleOrderDetail?.order?.total}
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold mt-6">
                    <div className="text-red-600 text-base">Terms</div>
                    <div className="text-xs">
                      <div>THANKS FOR YOUR BUSINESS.</div>
                      <div>
                        BUYERS ARE RESPONSIBLE FOR VAPE LOCAL AND STATE TAX FOR OUT OF STATE.
                      </div>
                      <div>ALL SMOKING ACCESSORIES ARE FOR TOBACCO USE ONLY.</div>
                      <div>
                        ALL THE PRODUCTS WE SELL IS NOT TO BE SOLD TO MINOR +18 OR +21 (PLEASE CHECK
                        WITH YOUR STATE).
                      </div>
                      <div>TERMS AND CONDITIONS APPLY.</div>
                      <div>
                        10% TAX APPLY ON OPEN VAPE , 40C PER ML ON CLOSE PODS SYSTEM ONLY FOR
                        CONNECTICUT SHOP.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="text-right font-semibold mt-4">
                <div>
                  <div className="text-red-600">Amount Due (USD)</div>
                  <div className="text-black text-2xl">${singleOrderDetail?.order?.total}</div>
                </div>
                <div>
                  <div className="text-red-600">Billed To</div>
                  <div>{singleOrderDetail?.orders?.user?.primaryAddress}</div>
                  <div>
                    {singleOrderDetail?.orders?.user?.zipCode},
                    {singleOrderDetail?.orders?.user?.city}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-red-600">Invoice Number</div>
                  <div>778873</div>
                </div>
                <div className="mt-3">
                  <div className="text-red-600">Date of issue</div>
                  <div>05/17/2002</div>
                </div>
                <div className="mt-3">
                  <div className="text-red-600">Due Date</div>
                  <div>06/16/2022</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ order, loading }) => ({
  singleOrderDetail: order?.singleOrderDetail,
  loading: loading?.effects['order/getSingleOrderDetail'],
}))(InvoiceModal);
