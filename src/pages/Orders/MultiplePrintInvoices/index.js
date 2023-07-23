/* eslint-disable no-underscore-dangle */
import React from 'react';
import logo1 from '@/assets/logo/logo.png';

import dayjs from 'dayjs';
import './print.css';

const MultiplePrintInvoices = React.forwardRef((props, ref) => {
  const { orderData } = props;
  return (
    <div className="p-10 bg-white " ref={ref}>
      {orderData
        // ?.filter((item) => !!item?.paymentDetails === true)
        ?.map((item) => {
          return (
            <div key={item?._id} className="h-full w-full">
              <div className=" w-full flex " style={{ border: '2px solid black' }}>
                <div className="w-3/4 p-2">
                  <div className="flex flex-row w-full ">
                    <div className="w-2/3">
                      <div className="uppercase text-3xl font-semibold py-2">OHM WhOLESALE</div>

                      {/* <div className="uppercase text-base font-semibold ">390-03 KNICKBOKER EVE</div> */}
                      {/* <div className="uppercase text-base font-semibold ">BOHEMIA NY 11713</div> */}
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
                        {item?.orderId}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="w-1/2 ">
                      <div
                        className="text-center"
                        style={{
                          borderBottom: '2px solid black',
                          borderRight: '2px solid black',
                        }}
                      >
                        Date
                      </div>
                      <div className="text-center font-semibold py-2" style={{}}>
                        {dayjs(item?.createdAt).format('DD-MM-YYYY')}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-center" style={{ borderBottom: '2px solid black' }}>
                        Due Date
                      </div>
                      <div className="text-center font-semibold py-2" style={{}}>
                        {dayjs(item?.createdAt).add(7, 'day').format('DD-MM-YYYY')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex  h-full" style={{ border: '2px solid black' }}>
                <div className=" w-1/2 h-full">
                  <div style={{ borderRight: '2px solid black' }}>
                    <div
                      className="h-1/3 p-2 text-base"
                      style={{ borderBottom: '3px solid black' }}
                    >
                      Bill To
                    </div>
                    <div className="p-2 h-2/3">
                      <div>OHM WHOLESALE</div>
                      <div>846 WOLCOTT ST</div>
                      <div>WATERBURY CT 06705</div>
                    </div>
                  </div>
                </div>
                <div className=" w-1/2 h-full">
                  <div className="h-1/3 p-2 text-base" style={{ borderBottom: '3px solid black' }}>
                    Ship To
                  </div>
                  <div className="p-2 h-2/3">
                    <div className="uppercase">{item?.address?.address_line_1}</div>
                    <div className="uppercase">
                      {item?.address?.city} ,{item?.address?.state_code}
                    </div>
                    <div className="uppercase">
                      {item?.address?.country_code || 'United States Of America'}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" " style={{ border: '2px solid black' }}>
                <div className="flex">
                  <div
                    className="w-1/6  font-semibold"
                    style={{
                      borderRight: '2px solid black',
                      fontSize: 16,
                      textAlign: 'center',
                      height: '30px',
                      borderBottom: '2px solid black',
                    }}
                  >
                    S.no
                  </div>
                  <div
                    className="w-3/6 px-2 font-semibold "
                    style={{
                      borderRight: '2px solid black',
                      fontSize: 16,
                      textAlign: 'center',
                      height: '30px',

                      borderBottom: '2px solid black',
                    }}
                  >
                    Description
                  </div>
                  <div
                    className="w-1/6  font-semibold"
                    style={{
                      borderRight: '2px solid black',
                      fontSize: 16,
                      textAlign: 'center',
                      height: '30px',
                      borderBottom: '2px solid black',
                    }}
                  >
                    Quantity
                  </div>
                  <div
                    className="w-1/6  font-semibold"
                    style={{
                      borderRight: '2px solid black',
                      fontSize: 16,
                      textAlign: 'center',
                      height: '30px',

                      borderBottom: '2px solid black',
                    }}
                  >
                    Rate
                  </div>
                  <div
                    className="w-1/6  font-semibold"
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      borderBottom: '2px solid black',
                    }}
                  >
                    Amount
                  </div>
                </div>

                <div className="w-full" style={{}}>
                  {item?.productData?.map((item, index) => {
                    return (
                      <div key={item?._id} style={{}} className="text-center  flex ">
                        <div
                          className=" font-medium w-1/6"
                          style={{
                            fontSize: 13,

                            textAlign: 'center',
                            borderRight: '2px solid black',
                          }}
                        >
                          {index + 1}
                        </div>
                        <div
                          className="px-2 w-3/6"
                          style={{
                            fontSize: 13,
                            textAlign: 'left',
                            borderRight: '2px solid black',
                          }}
                        >
                          {item.sku}
                        </div>
                        <div
                          className=" font-medium w-1/6"
                          style={{
                            fontSize: 13,

                            textAlign: 'center',
                            borderRight: '2px solid black',
                          }}
                        >
                          {item.quantity}
                        </div>
                        <div
                          className=" font-medium w-1/6"
                          style={{
                            fontSize: 13,
                            textAlign: 'center',
                            borderRight: '2px solid black',
                          }}
                        >
                          ${item.price}
                        </div>

                        <div
                          className=" font-medium w-1/6"
                          style={{
                            fontSize: 13,
                            textAlign: 'center',
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
               {item?.productData?.map((item) => {
                 return <div key={item?._id} className="text-center  "></div>;
               })}
             </div>
             <div
               className="w-1/6"
               style={{
                 borderRight: '2px solid black',
               }}
             >
               {item?.productData?.map((item, index) => {
                 return <div key={item?._id} className="text-center "></div>;
               })}
             </div>
             <div className="w-1/6" style={{}}>
               {item?.productData?.map((item) => {
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
                  className="w-5/6 p-4"
                  style={{
                    borderRight: '2px solid black',
                  }}
                >
                  <div className="text-sm">
                    <div>THANKS FOR YOUR BUSINESS.</div>
                    <div>BUYERS ARE RESPONSIBLE FOR VAPE LOCAL AND STATE TAX FOR OUT OF STATE.</div>
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
                <div className="w-1/6 ">
                  <div className=" font-semibold text-lg text-center">Sub Total</div>

                  <div className=" font-semibold text-lg text-center">Tax</div>
                  <div className=" font-semibold text-lg text-center">Total</div>
                </div>
                <div className="w-1/6 h-full " style={{}}>
                  <div className=" font-semibold text-lg text-center">${item?.subTotal}</div>

                  <div className=" font-semibold text-lg text-center">${item?.tax || 0}</div>
                  <div className=" font-semibold text-lg text-center">${item?.total}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-end gap-2">
                  <div>
                    {/* <Button type="primary" onClick={() => setVisible(false)}>
                 Cancel
               </Button> */}
                  </div>
                  <div>
                    {/* <Button type="primary" onClick={() => {}}>
                 Print
               </Button> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
});

export default MultiplePrintInvoices;
