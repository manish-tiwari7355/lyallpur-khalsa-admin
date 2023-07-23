import {
  getCategoryList,
  updateCategory,
  addCategory,
  deleteCategory,
  allCategory,
  getSingleCategoryList,
  getParentDetail,
  getAllCategoryList,
} from "@/services/category";

const Model = {
  namespace: "category",
  state: {
    categoryList: null,
    singleCategory: null,
  },
  effects: {
    *getCategoryList({ payload }, { call, put }) {
      const res = yield call(getCategoryList, payload);
      yield put({
        type: "setStates",
        payload: res,
        key: "categoryList",
      });
      return res;
    },
    *getAllCategoryList({ payload }, { call, put }) {
      const res = yield call(getAllCategoryList, payload);
      yield put({
        type: "setStates",
        payload: res,
        key: "categoryList",
      });
      return res;
    },
    *getSingleCategoryList({ payload }, { call, put }) {
      const res = yield call(getSingleCategoryList, payload);
      yield put({
        type: "setStates",
        payload: res,
        key: "singleCategory",
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
    *addCategory({ payload }, { call }) {
      const response = yield call(addCategory, payload);
      return response;
    },
    *updateCategory({ payload }, { call, put }) {
      const response = yield call(updateCategory, payload);
      return response;
    },
    *deleteCategory({ payload }, { call, put }) {
      const response = yield call(deleteCategory, payload);
      return response;
    },
    *allCategory({ payload }, { call }) {
      const response = yield call(allCategory, payload);
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
