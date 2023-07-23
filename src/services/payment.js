import { callApi } from '@/utils/apiUtils';
import { payment } from '@/utils/endpoints/payment';

export const addPayment = ({ pathParams, body }) =>
  callApi({ uriEndPoint: payment.addPayment.v1, pathParams, body })
    .then((res) => res)
    .catch(() => {});
export const addMultiplePayment = ({ pathParams, body }) =>
  callApi({ uriEndPoint: payment.addMultiplePayment.v1, pathParams, body })
    .then((res) => res)
    .catch(() => {});
export const getPayment = ({ pathParams }) =>
  callApi({ uriEndPoint: payment.getPayment.v1, pathParams })
    .then((res) => res)
    .catch(() => {});
export const updatePayment = ({ pathParams, body }) =>
  callApi({ uriEndPoint: payment.updatePayment.v1, pathParams, body })
    .then((res) => res)
    .catch(() => {});
export const getAllPendingPaymentAmountDetails = () =>
  callApi({ uriEndPoint: payment.getAllPendingPaymentAmountDetails.v1 })
    .then((res) => res)
    .catch(() => {});
export const getPendingPaymentDetails = ({ query }) =>
  callApi({ uriEndPoint: payment.getPendingPaymentDetails.v1, query })
    .then((res) => res)
    .catch(() => {});
