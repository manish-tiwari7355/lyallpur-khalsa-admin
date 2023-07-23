import {
  getBrandList,
  updateBrand,
  addBrand,
  deleteBrand,
  allBrand,
  getSingleBrandList,
  getParentDetail,
  getAllBrandList,
} from "@/services/brand";

const Model = {
  namespace: "brand",
  state: {
    brandList: null,
    singleBrand: null,
  },
  effects: {
    *getBrandList({ payload }, { call, put }) {
      const res = yield call(getBrandList, payload);
      yield put({
        type: "setStates",
        payload: res,
        key: "brandListById",
      });
      return res;
    },
    *getAllBrandList({ payload }, { call, put }) {
      const res = yield call(getAllBrandList, payload);
      yield put({
        type: "setStates",
        payload: res,
        key: "brandList",
      });
      return res;
    },
    *getSingleBrandList({ payload }, { call, put }) {
      const res = yield call(getSingleBrandList, payload);
      yield put({
        type: "setStates",
        payload: res,
        key: "singleBrand",
      });
      return res;
    },
    *getParentDetails({ payload }, { call, put }) {
      const res = yield call(getParentDetail, payload);
      yield put({
        type: "setStates",
        payload: res,
        key: "getParentDetails",
      });
    },
    *addBrand({ payload }, { call }) {
      const response = yield call(addBrand, payload);
      return response;
    },

    *updateBrand({ payload }, { call, put }) {
      const response = yield call(updateBrand, payload);
      return response;
    },
    *deleteBrand({ payload }, { call, put }) {
      const response = yield call(deleteBrand, payload);
      return response;
    },
    *allBrand({ payload }, { call }) {
      const response = yield call(allBrand, payload);
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
