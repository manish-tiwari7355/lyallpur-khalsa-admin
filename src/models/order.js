/* eslint-disable no-underscore-dangle */
import {
  orderList,
  getOrder,
  addOrders,
  getExistingCustomer,
  createUser,
  getSingleOrderDetail,
  updateOrderStatus,
  getUserOrders,
  deleteOrders,
  addShippingFee,
  updateShipping,
  updateIndividualOrder,
  deleteIndividualOrder,
  addOrderItems,
} from '@/services/order';

const Model = {
  namespace: 'order',
  state: { orderList: null, singleOrder: null, existingCustomer: null, geUsersOrder: null },
  effects: {
    *orderList({ payload }, { call, put }) {
      const res = yield call(orderList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'orderList',
      });
      return res;
    },
    *getUserOrders({ payload }, { call, put }) {
      const res = yield call(getUserOrders, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'geUsersOrder',
      });
      return res;
    },
    *getOrder({ payload }, { call, put }) {
      const res = yield call(getOrder, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'singleOrder',
      });
      return res;
    },
    *createUser({ payload }, { call }) {
      let res;
      try {
        res = yield call(createUser, payload);
      } catch (err) {
        return Promise.reject(err);
      }
      return res;
    },

    *getExistingCustomer({ payload }, { call, put }) {
      let res;
      try {
        res = yield call(getExistingCustomer, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'existingCustomer',
        });
      } catch (err) {
        return Promise.reject(err);
      }

      return res;
    },
    *updateOrderStatus({ payload }, { call }) {
      const res = yield call(updateOrderStatus, payload);

      return res;
    },
    *deleteUserOrders({ payload }, { call }) {
      const res = yield call(deleteOrders, payload);

      return res;
    },
    *addShippingFee({ payload }, { call }) {
      const res = yield call(addShippingFee, payload);

      return res;
    },
    *updateShipping({ payload }, { call }) {
      const res = yield call(updateShipping, payload);

      return res;
    },
    *updateIndividualOrder({ payload }, { call }) {
      try {
        const res = yield call(updateIndividualOrder, payload);

        return res;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *deleteIndividualOrder({ payload }, { call }) {
      const res = yield call(deleteIndividualOrder, payload);

      return res;
    },
    *addOrderItemsList({ payload }, { call }) {
      try {
        const res = yield call(addOrderItems, payload);

        return res;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *addOrders({ payload }, { call }) {
      try {
        const res = yield call(addOrders, payload);
        return res;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *getSingleOrderDetail({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleOrderDetail, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'singleOrderDetail',
        });
        return res;
      } catch (err) {
        return Promise.reject(err);
      }
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
