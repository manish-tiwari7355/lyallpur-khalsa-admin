import {
  getAttributeList,
  updateAttribute,
  addAttribute,
  deleteAttribute,
  allAttribute,
  getSingleAttributeList,
  getParentDetail,
  getAllAttributeList,
} from '@/services/attribute';

const Model = {
  namespace: 'attribute',
  state: {
    attributeList: null,
    singleAttribute: null,
  },
  effects: {
    *getAttributeList({ payload }, { call, put }) {
      const res = yield call(getAttributeList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'attributeListById',
      });
      return res;
    },
    *getAllAttributeList({ payload }, { call, put }) {
      const res = yield call(getAllAttributeList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'attributeList',
      });
      return res;
    },
    *getSingleAttributeList({ payload }, { call, put }) {
      const res = yield call(getSingleAttributeList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'singleAttribute',
      });
      return res;
    },
    *getParentDetails({ payload }, { call, put }) {
      const res = yield call(getParentDetail, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getParentDetails',
      });
    },
    *addAttribute({ payload }, { call }) {
      const response = yield call(addAttribute, payload);
      return response;
    },

    *updateAttribute({ payload }, { call }) {
      const response = yield call(updateAttribute, payload);
      return response;
    },
    *deleteAttribute({ payload }, { call }) {
      const response = yield call(deleteAttribute, payload);
      return response;
    },
    *allAttribute({ payload }, { call }) {
      const response = yield call(allAttribute, payload);
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
