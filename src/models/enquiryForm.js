import { getEnquiryList } from '@/services/enquiryForm';

const Model = {
  namespace: 'enquiryForm',
  state: {
    enquiryList: null,
  },
  effects: {
    *getEnquiryList({ payload }, { call, put }) {
      try {
        const apiResponse = yield call(getEnquiryList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'enquiryList',
        });
        return apiResponse;
      } catch (error) {
        return Promise.reject(error);
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
