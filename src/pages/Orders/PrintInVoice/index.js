/* eslint-disable no-underscore-dangle */
import React from 'react';
import logo1 from '@/assets/logo/logo.png';

import './index.less';
import dayjs from 'dayjs';

class PrintInVoice extends React.Component {
  render() {
    const { orderData, ref } = this.props;
    console.log(orderData, 'orderData');

    return (
      <div className="p-6 bg-white ">
        <div className=" w-full flex " style={{ border: '2px solid black' }}>
          <div className="w-3/4 p-2">
            <div className="flex flex-row w-full ">
              <div className="w-2/3">
                <div className="uppercase text-3xl font-semibold py-2">OHM WhOLESALE</div>

                <div className="uppercase text-base font-semibold ">846 WOLCOTT ST</div>
                <div className="uppercase text-base font-semibold ">WATERBURY CT 06705</div>
                <div className="flex flex-row ">
                  <div
                    className="uppercase  font-semibold "
                    style={{ fontSize: '14px', width: '130px' }}
                  >
                    Warehouese
                  </div>
                  <div className="">+1 (203) 725-5206</div>
                </div>

                <div className="flex flex-row">
                  <div
                    className="uppercase  font-semibold"
                    style={{ fontSize: '14px', width: '130px' }}
                  >
                    Email{' '}
                  </div>
                  <div className="font-medium">ohmwholesales@gmail.com</div>
                </div>
                <div className="flex flex-row">
                  <div
                    className="uppercase  font-semibold"
                    style={{ fontSize: '14px', width: '130px' }}
                  >
                    Website{' '}
                  </div>
                  <div className="  font-medium">https://www.ohmwholesales.com</div>
                </div>
              </div>
              <div className="mt-6 ">
                <img
                  src={logo1}
                  alt="OHM Wholesale"
                  style={{ height: 80, width: 160, marginRight: '20px' }}
                />
              </div>
            </div>
          </div>
          <div className="w-1/4 " style={{ borderLeft: '2px solid black' }}>
            <div
              className="font-semibold text-3xl italic  text-center"
              style={{ borderBottom: '2px solid black' }}
            >
              InVoice
            </div>
            <div className="flex flex-row w-full">
              <div className="w-full">
                <div className="text-center" style={{ borderBottom: '2px solid black' }}>
                  Invoice #
                </div>
                <div
                  className="text-center font-semibold py-2"
                  style={{ borderBottom: '2px solid black' }}
                >
                  {orderData?.orderId}
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="w-1/2 ">
                <div
                  className="text-center"
                  style={{ borderBottom: '2px solid black', borderRight: '2px solid black' }}
                >
                  Date
                </div>
                <div className="text-center font-semibold py-2" style={{}}>
                  {dayjs(orderData?.createdAt).format('MM-DD-YYYY')}
                </div>
              </div>
              <div className="w-1/2">
                <div className="text-center" style={{ borderBottom: '2px solid black' }}>
                  Due Date
                </div>
                <div className="text-center font-semibold py-2" style={{}}>
                  {dayjs(orderData?.createdAt).add(15, 'day').format('MM-DD-YYYY')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex  h-full" style={{ border: '2px solid black' }}>
          <div className=" w-1/2 h-full">
            <div style={{ borderRight: '2px solid black' }}>
              <div className="h-1/3 p-2 text-base" style={{ borderBottom: '2px solid black' }}>
                Ship To
              </div>
              <div className="p-2 h-2/3">
                <div className="uppercase">{orderData?.user?.companyName}</div>
                <div className="uppercase">{orderData?.address?.address_line_1}</div>
                <div className="uppercase">
                  {orderData?.address?.city} ,{orderData?.address?.state_code}
                </div>
                <div className="uppercase">
                  {orderData?.address?.country_code || 'United States Of America'}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-1/2 h-full">
            <div className="h-1/3 p-2 text-base" style={{ borderBottom: '2px solid black' }}>
              Bill To
            </div>
            <div className="p-2 ">
              <div className="uppercase">{orderData?.user?.user?.companyName}</div>
              <div className="uppercase">{orderData?.user?.address?.address_line_1}</div>
              <div className="uppercase">
                {orderData?.user?.address?.city} ,{orderData?.user?.address?.state_code}
              </div>
              <div className="uppercase">
                {orderData?.user?.address?.country_code || 'United States Of America'}
              </div>
            </div>
          </div>
        </div>
        <div className=" " style={{ border: '2px solid black' }}>
          <div className="flex w-full">
            <div
              className="  font-semibold"
              style={{
                borderRight: '2px solid black',
                fontSize: 13,

                textAlign: 'center',
                height: '35px',
                width: '10%',
                borderBottom: '2px solid black',
              }}
            >
              S.no
            </div>
            <div
              className="w-2/6 px-2 font-semibold "
              style={{
                borderRight: '2px solid black',
                fontSize: 13,

                textAlign: 'center',
                height: '35px',
                width: '50%',

                borderBottom: '2px solid black',
              }}
            >
              Descriptions
            </div>
            <div
              className="  font-semibold"
              style={{
                borderRight: '2px solid black',
                fontSize: 13,
                width: '10%',

                height: '35px',
                borderBottom: '2px solid black',

                textAlign: 'center',
              }}
            >
              Quantity
            </div>
            <div
              className="  font-semibold"
              style={{
                borderRight: '2px solid black',
                fontSize: 10,

                textAlign: 'center',
                width: '15%',

                height: '35px',
                borderBottom: '2px solid black',
              }}
            >
              0.40 cent/ml Tax
            </div>
            <div
              className="  font-semibold"
              style={{
                borderRight: '2px solid black',
                fontSize: 11,

                textAlign: 'center',
                width: '14%',

                height: '35px',
                borderBottom: '2px solid black',
              }}
            >
              10% Vape Tax
            </div>
            <div
              className="  font-semibold"
              style={{
                borderRight: '2px solid black',
                fontSize: 13,

                width: '10%',

                textAlign: 'center',
                height: '35px',

                borderBottom: '2px solid black',
              }}
            >
              Rate
            </div>
            <div
              className="  font-semibold"
              style={{
                fontSize: 13,

                height: '35px',
                width: '10%',

                textAlign: 'center',
                borderBottom: '2px solid black',
              }}
            >
              Amount
            </div>
          </div>

          <div className="w-full" style={{}}>
            {orderData?.productData?.map((item, index) => {
              return (
                <div key={item?._id} style={{}} className="text-center w-full flex  mt-50">
                  <div
                    className=" font-medium "
                    style={{
                      fontSize: 12,

                      textAlign: 'center',
                      borderRight: '2px solid black',
                      height: '60px',
                      display: 'flex',
                      width: '10%',

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    className="px-2 w-2/6"
                    style={{
                      fontSize: 12,
                      textAlign: 'left',
                      borderRight: '2px solid black',
                      height: '60px',
                      display: 'flex',
                      width: '50%',

                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    {item.sku}
                  </div>
                  <div
                    className=" font-medium "
                    style={{
                      fontSize: 12,

                      textAlign: 'center',
                      borderRight: '2px solid black',
                      height: '60px',
                      display: 'flex',
                      width: '10%',

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {item.quantity}
                  </div>
                  <div
                    className=" font-medium "
                    style={{
                      fontSize: 12,

                      textAlign: 'center',
                      borderRight: '2px solid black',
                      height: '60px',
                      display: 'flex',
                      width: '15%',

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    $
                    {orderData?.address?.state_code === 'Connecticut' ||
                    orderData?.address?.state_code === 'Connecticut CT' ||
                    orderData?.address?.state_code === 'connecticut' ||
                    orderData?.address?.state_code === 'CT' ||
                    orderData?.address?.state_code === 'Connecticut (CT)'
                      ? (
                          (!!item?.variants?.volume === false ? 0 : item?.variants?.volume * 0.4) *
                          item.quantity
                        ).toFixed(2)
                      : 0}
                  </div>
                  <div
                    className=" font-medium "
                    style={{
                      fontSize: 12,

                      textAlign: 'center',
                      borderRight: '2px solid black',
                      height: '60px',
                      display: 'flex',
                      width: '14%',

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    $
                    {(!!orderData?.address?.state_code === true &&
                      orderData?.address?.state_code === 'Connecticut') ||
                    orderData?.address?.state_code === 'Connecticut CT' ||
                    orderData?.address?.state_code === 'connecticut' ||
                    orderData?.address?.state_code === 'CT' ||
                    orderData?.address?.state_code === 'Connecticut (CT)'
                      ? (
                          (!!item?.product === false ? 0 : item?.product?.category?.tax / 100) *
                          item?.price *
                          item.quantity
                        ).toFixed(2)
                      : 0}
                  </div>
                  <div
                    className=" font-medium "
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      borderRight: '2px solid black',
                      height: '60px',
                      display: 'flex',
                      width: '10%',

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    ${item.price}
                  </div>

                  <div
                    className=" font-medium "
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      height: '60px',
                      display: 'flex',
                      width: '10%',

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    ${item.price * item.quantity}
                  </div>
                </div>
              );
            })}
            {/* <div
            className="w-1/6"
            style={{
              borderRight: '2px solid black',
            }}
          >
            {orderData?.productData?.map((item) => {
              return <div key={item?._id} className="text-center  "></div>;
            })}
          </div>
          <div
            className="w-1/6"
            style={{
              borderRight: '2px solid black',
            }}
          >
            {orderData?.productData?.map((item, index) => {
              return <div key={item?._id} className="text-center "></div>;
            })}
          </div>
          <div className="w-1/6" style={{}}>
            {orderData?.productData?.map((item) => {
              return <div key={item?._id} className="text-center "></div>;
            })}
          </div> */}
          </div>
        </div>
        <div
          className="w-full flex h-full"
          style={{
            border: '2px solid black',
          }}
        >
          <div
            className=" p-4"
            style={{
              borderRight: '2px solid black',
              width: '70%',
            }}
          >
            <div className="text-sm">
              <div>THANKS FOR YOUR BUSINESS.</div>
              <div>BUYERS ARE RESPONSIBLE FOR VAPE LOCAL AND STATE TAX FOR OUT OF STATE.</div>
              <div>ALL SMOKING ACCESSORIES ARE FOR TOBACCO USE ONLY.</div>
              <div>
                ALL THE PRODUCTS WE SELL IS NOT TO BE SOLD TO MINOR +18 OR +21 (PLEASE CHECK WITH
                YOUR STATE).
              </div>
              <div>TERMS AND CONDITIONS APPLY.</div>
              <div>
                10% TAX APPLY ON OPEN VAPE , 40C PER ML ON CLOSE PODS SYSTEM ONLY FOR CONNECTICUT
                SHOP.
              </div>
            </div>
          </div>
          <div className=" " style={{ width: '15%' }}>
            <div className=" font-semibold text-sm mt-2  ml-3 ext-left" style={{}}>
              Sub Total
            </div>
            <div className=" font-semibold text-sm mt-2  ml-3 text-left">Tax</div>
            <div className=" font-semibold text-sm mt-2  ml-3 text-left">Shipping Fee</div>
            <div className=" font-semibold text-sm mt-2  ml-3 text-left">Total</div>
          </div>
          <div className=" h-full " style={{ width: '15%' }}>
            <div className=" font-semibold text-sm mt-2  ml-3 text-left">
              ${orderData?.subTotal}
            </div>

            <div className=" font-semibold text-sm mt-2  ml-3 text-left">
              ${orderData?.tax || 0}
            </div>
            <div className=" font-semibold text-sm mt-2  ml-3 text-left">
              ${orderData?.shippingFee || 0}
            </div>
            <div className=" font-semibold text-sm mt-2  ml-3 text-left">${orderData?.total}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default PrintInVoice;
