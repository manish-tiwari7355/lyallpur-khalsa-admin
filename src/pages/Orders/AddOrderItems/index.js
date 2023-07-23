/* eslint-disable no-underscore-dangle */

import {
  AutoComplete,
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  notification,
  Radio,
  Row,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
import logo1 from '@/assets/logo/logo.png';

import dayjs from 'dayjs';
import { DeleteOutlined } from '@ant-design/icons';
import EmptyStateContainer from '@/components/EmptyStateContainer';
import { debounce } from 'lodash';
import { decodeDollarsToDigits } from '@/utils/utils';

const AddOrderItems = ({
  visible,
  setVisible,
  dispatch,
  skuProducts,
  getSkuOrders,
  getBarCodeProducts,
  singleOrderDetail,
  getOrderData,
  loading,
}) => {
  const [form] = Form.useForm();

  const { Search } = Input;
  const inputRef = useRef();

  const [barCodeState, setBarCodeState] = useState(false);
  const [productData, setProductData] = useState([]);
  const [productCode, setProductCode] = useState('');
  const [skuProductCode, setSkuProductCode] = useState('');
  const [quantity, setQuantity] = useState([]);
  const [getSkuStateData, setGetSkuStateData] = useState(false);

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

  console.log(quantity);
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

  useEffect(() => {
    if (getSkuOrders?.products[0]?.product?.isActive === true) {
      const data =
        productData && productData?.find((val) => val?.sku === getSkuOrders?.products[0]?.sku);

      if (data) {
        setProductData([...productData]);
        setQuantity(
          quantity.map((j) =>
            // eslint-disable-next-line radix
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
            quantity: 1,
            volume:
              !!getSkuOrders?.products[0]?.volume === false ? 0 : getSkuOrders?.products[0]?.volume,
            category: getSkuOrders?.products[0]?.product?.category,
            price: getPrice(singleOrderDetail?.order?.user?.role, getSkuOrders?.products[0]?.price),
          },
        ]);
        setProductCode('');
      }
    }
  }, [getSkuOrders]);

  console.log(getSkuOrders, 'getSkuOrders?.products[0]?.volumeTax');

  useEffect(() => {
    if (getBarCodeProducts?.products?.product?.isActive === true) {
      const data =
        productData && productData?.find((val) => val?.sku === getBarCodeProducts?.products?.sku);
      if (data) {
        setProductData([...productData]);
        setQuantity(
          quantity.map((j) =>
            // eslint-disable-next-line radix
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
            volume:
              !!getBarCodeProducts?.products?.volume === false
                ? 0
                : getBarCodeProducts?.products?.volume,
            category: getBarCodeProducts?.products?.product?.category,
            price: getPrice(
              singleOrderDetail?.order?.user?.role,
              getBarCodeProducts?.products?.price,
            ),
          },
        ]);
        setProductCode('');
      }
    }
  }, [getBarCodeProducts]);

  const selectedSkuAction = (values) => {
    setSkuProductCode(values);
  };
  const action = (values) => {
    setProductCode(values);
  };
  const debouncedSearch = debounce(action, 300);
  const removeProduct = (val) => {
    const data = form.getFieldsValue('');
    const data2 = quantity?.find((item) => item?.sku === val?.sku);

    const totalDeductedAmount = data2?.price * data2?.quantity;
    const deleteQuantity = quantity?.filter((item) => item?.sku !== data2?.sku);
    setQuantity([...deleteQuantity]);

    const data3 = productData?.filter((item) => item?._id !== val?._id);

    setProductData([...data3]);

    form.setFieldsValue({
      totalAmount: `$${parseFloat(decodeDollarsToDigits(data.totalAmount)) - totalDeductedAmount}`,
    });
  };

  return (
    <div className="p-10">
      <Modal
        width={1000}
        title={null}
        centered
        visible={visible}
        closable={false}
        onCancel={() => setVisible(false)}
        footer={false}
        bodyStyle={{ width: '1200px', height: '800px', backgroundColor: 'white', padding: '20px' }}
      >
        <Row gutter={[24, 24]} className=" h-full bg-gray-100">
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <div className="px-5 mt-2">
              <div className="text-lg  font-semibold "> Add Products </div>
              <div className="text-sm ">
                Please enter Stock Keeping Unit(SKU) value or scan the barcode of product
              </div>
              <div className="mt-4">
                <Radio.Group
                  onChange={() => {
                    setBarCodeState(!barCodeState);
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

          <Col xs={24} sm={24} md={14} lg={14} xl={14} className="h-full">
            <Form
              form={form}
              layout="vertical"
              hideRequiredMark
              onFinish={(values) => {
                dispatch({
                  type: 'order/addOrderItemsList',
                  payload: {
                    pathParams: {
                      orderId: singleOrderDetail?.order?._id,
                      userId: singleOrderDetail?.order?.user?._id,
                    },
                    body: {
                      productData: quantity?.map((val) => ({
                        ...val,
                      })),
                    },
                  },
                })
                  .then((result) => {
                    if (result?.success) {
                      getOrderData();
                      message.success('Order Items added successfully');
                      setProductData([]);
                      setQuantity([]);
                    }
                  })
                  .catch((err) => {
                    notification.error({
                      message: 'Error',
                      description: err?.data?.error?.message,
                    });
                  });
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
                <div style={{ overflow: 'auto', height: '550px' }}>
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
                                      ${getPrice(singleOrderDetail?.order?.user?.role, val?.price)}
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
                </div>
              </div>
              <div className="w-full flex justify-end my-10">
                <Button
                  size="large"
                  className="mr-5"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  Cancel
                </Button>
                <Button loading={loading} size="large" type="primary" onClick={() => form.submit()}>
                  Update
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default connect(({ order, loading, products }) => ({
  skuProducts: products.skuProductList,
  getBarCodeProducts: products.getBarCodeProducts,
  getSkuOrders: products.getSkuOrders,
  singleOrderDetail: order?.singleOrderDetail,

  loading: loading?.effects['order/addOrderItemsList'],
}))(AddOrderItems);
