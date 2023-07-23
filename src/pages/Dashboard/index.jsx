import React from 'react';
import { connect } from 'umi';

import { Divider } from 'antd';

const DashBoard = () => {
  return (
    <div className="container mx-auto ">
      <h1 className="" style={{ color: '#333' }}>
        Dashboard
      </h1>
      {/* <h4 className="-mt-4 mb-4" style={{ color: '#333333' }}>
        All details about your selling products are here
      </h4> */}
      <Divider />
      {/* <div className="mt-10">
        <div className="w-full">
          <div className="grid grid-cols-4 mt-8 gap-4">
            {productsData.map((item) => (
              <div
                onClick={() => {
                  if (item.route) {
                    history.push(item.route);
                  }
                }}
                key={item?.title}
                className=" border p-4 rounded-lg flex gap-3 items-center bg-white cursor-pointer "
              >
                <div className="h-16 w-16 bg-white border-2  border-yellow-800 rounded-md flex justify-center items-center">
                  {item?.icon}
                </div>
                <div>
                  <div className="text-md font-medium text-gray-600">{item?.title} </div>
                  <div className="text-2xl font-semibold ">{item?.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 mt-8 gap-4">
            {paymentData.map((item) => {
              return (
                <div
                  key={item?.title}
                  className=" border p-4  rounded-lg flex gap-3 items-center bg-white cursor-pointer "
                >
                  <div className="h-16 w-16 bg-white border-2 border-green-500 rounded-md flex justify-center items-center">
                    {item?.icon}
                  </div>
                  <div>
                    <div className="text-md font-medium text-gray-600">{item?.title} </div>
                    <div className="text-2xl font-semibold ">Rs.{item?.amount?.toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user: user?.currentUser,
});
export default connect(mapStateToProps)(DashBoard);
