import { getPaidTaxData, getReports, updateReportPayment } from '@/services/reports';

const Model = {
  namespace: 'reports',
  state: {
    getReports: null,
    getPaidtax: null,
  },
  effects: {
    *getReportsData({ payload }, { call, put }) {
      const res = yield call(getReports, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getReports',
      });
    },
    *updateReportPayment({ payload }, { call }) {
      const res = yield call(updateReportPayment, payload);
      return res;
    },
    *getPaidTaxDetails({ payload }, { call, put }) {
      const res = yield call(getPaidTaxData, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getPaidtax',
      });
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
