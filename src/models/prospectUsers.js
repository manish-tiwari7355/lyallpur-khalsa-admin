import {
  getProspectUsersList,
  rejectProspectUsers,
  acceptProspectUsers,
  updateUser,
  getAllUsers,
} from '@/services/prospectUsers';

const Model = {
  namespace: 'prospect',
  state: {
    prospectUsersList: null,
    getAllUsers: null,
  },
  effects: {
    *getProspectUsersList({ payload }, { call, put }) {
      const res = yield call(getProspectUsersList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'prospectUsersList',
      });
    },
    *getAllUsers({ payload }, { call, put }) {
      const res = yield call(getAllUsers, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getAllUsers',
      });
    },
    *rejectProspectUsers({ payload }, { call, put }) {
      const response = yield call(rejectProspectUsers, payload);
      return response;
    },
    *updateUserDetails({ payload }, { call, put }) {
      const response = yield call(updateUser, payload);
      return response;
    },
    *acceptProspectUsers({ payload }, { call, put }) {
      const response = yield call(acceptProspectUsers, payload);
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
