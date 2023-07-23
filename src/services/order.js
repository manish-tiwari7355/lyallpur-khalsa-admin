import { callApi } from '@/utils/apiUtils';
import { order } from '@/utils/endpoints/order';

export const orderList = ({ query }) =>
  callApi({ uriEndPoint: order.orderList.v1, query })
    .then((res) => res)
    .catch(() => {});

export const getOrder = ({ pathParams }) =>
  callApi({ uriEndPoint: order.getorder.v1, pathParams })
    .then((res) => res)
    .catch(() => {});
export const getUserOrders = ({ pathParams, query }) =>
  callApi({ uriEndPoint: order.getUserOrders.v1, pathParams, query })
    .then((res) => res)
    .catch(() => {});

export const addOrders = ({ body, pathParams }) =>
  callApi({ uriEndPoint: order.addOrders.v1, body, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const getExistingCustomer = ({ query }) =>
  callApi({ uriEndPoint: order.existingCustomer.v1, query })
    .then((res) => res)
    .catch(() => {});

export const createUser = ({ body }) => callApi({ uriEndPoint: order.createUser.v1, body });

export const getSingleOrderDetail = ({ pathParams }) =>
  callApi({ uriEndPoint: order.getSingleOrderDetail.v1, pathParams });

export const updateOrderStatus = ({ pathParams, body }) =>
  callApi({ uriEndPoint: order.updateOrderStatus.v1, pathParams, body });

export const deleteOrders = ({ pathParams, body }) =>
  callApi({ uriEndPoint: order.deleteOrders.v1, pathParams, body });
export const addShippingFee = ({ pathParams, body }) =>
  callApi({ uriEndPoint: order.addShippingFee.v1, pathParams, body });
export const updateShipping = ({ pathParams, body }) =>
  callApi({ uriEndPoint: order.updateShipping.v1, pathParams, body });
export const updateIndividualOrder = ({ pathParams, body }) =>
  callApi({ uriEndPoint: order.updateIndividualOrder.v1, pathParams, body });
export const deleteIndividualOrder = ({ pathParams, body }) =>
  callApi({ uriEndPoint: order.deleteIndividualOrder.v1, pathParams, body });
export const addOrderItems = ({ pathParams, body }) =>
  callApi({ uriEndPoint: order.addOrderItems.v1, pathParams, body });
