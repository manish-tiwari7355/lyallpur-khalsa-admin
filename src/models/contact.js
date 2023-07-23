import { getContactList } from '@/services/contact';

const Model = {
  namespace: 'contact',
  state: {
    contactList: null,
  },
  effects: {
    *getContactList({ payload }, { call, put }) {
      try {
        const apiResponse = yield call(getContactList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'contactList',
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
