const {
  getMediaList,
  getSingleMediaList,
  updateMediaList,
  deleteMediaList,
  addMediaList,
} = require('@/services/media');

const Model = {
  namespace: 'media',
  state: {
    allMediaList: null,
    updateMediaList: null,
    singleMediaList: null,
    deleteMediaList: null,
    addMediaList: null,
  },
  effects: {
    *getMediaList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(getMediaList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'allMediaList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *getSingleMediaList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(getSingleMediaList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'singleMediaList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *updateMediaList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(updateMediaList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'updateMediaList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *deleteMediaList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(deleteMediaList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'deleteMediaList',
        });
      } catch (error) {
        err = error;
      }
      if (err) {
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *addMediaList({ payload: { body } }, { call, put }) {
      let apiResponse;
      console.log('body', body);
      let err;
      try {
        apiResponse = yield call(addMediaList, { body });
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'addMediaList',
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
