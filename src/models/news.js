import {
  addNewsList,
  deleteNewsList,
  getNewsList,
  getSingleNewsList,
  updateNewsList,
} from '@/services/news';

const Model = {
  namespace: 'news',
  state: {
    allNewsList: null,
    updateNewsList: null,
    singleNewsList: null,
    deleteNewsList: null,
    addNewsList: null,
  },
  effects: {
    *getNewsList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(getNewsList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'allNewsList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *getSingleNewList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(getSingleNewsList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'singleNewsList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *updateNewsList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(updateNewsList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'updateNewsList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *deleteNewsList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(deleteNewsList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'deleteNewsList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *addNewsList({ payload: { body } }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(addNewsList, { body });
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'addNewsList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
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
