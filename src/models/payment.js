/* eslint-disable no-underscore-dangle */
import {
  addMultiplePayment,
  addPayment,
  getAllPendingPaymentAmountDetails,
  getPayment,
  getPendingPaymentDetails,
  updatePayment,
} from '@/services/payment';

const Model = {
  namespace: 'payment',
  state: {
    paymentData: null,
    getPendingPaymentDetails: null,
    getAllPendingPaymentAmountDetails: null,
  },
  effects: {
    *createPayment({ payload }, { call }) {
      const response = yield call(addPayment, payload);
      return response;
    },
    *createMultiplePayment({ payload }, { call }) {
      const response = yield call(addMultiplePayment, payload);
      return response;
    },
    *getPayments({ payload }, { call, put }) {
      const res = yield call(getPayment, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'paymentData',
      });
      return res;
    },
    *getPendingPayment({ payload }, { call, put }) {
      const res = yield call(getPendingPaymentDetails, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getPendingPaymentDetails',
      });
      return res;
    },
    *getAllPendingPayment({ payload }, { call, put }) {
      const res = yield call(getAllPendingPaymentAmountDetails, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getAllPendingPaymentAmountDetails',
      });
      return res;
    },
    *updatePayment({ payload }, { call }) {
      const response = yield call(updatePayment, payload);
      return response;
    },
  },

  reducers: {
    setStates(state, { payload, key }) {
      return {
        ...state,
        [key]: payload,
      };
    },
  },
};

export default Model;
