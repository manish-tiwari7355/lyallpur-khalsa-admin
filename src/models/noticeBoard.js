import {
  getAllNoticeBoardList,
  getSingleNoticeBoard,
  addNoticeBoard,
  updateNoticeBoard,
  deleteNoticeBoard,
} from '@/services/noticeBoard';

const Model = {
  namespace: 'noticeBoard',
  state: {
    allNoticeBoardList: null,
  },
  effects: {
    *getAllNoticeBoardList({ payload }, { call, put }) {
      const res = yield call(getAllNoticeBoardList, payload);

      yield put({
        type: 'setStates',
        payload: { data: res?.data, totalCount: res?.totalCount },
        key: 'allNoticeBoardList',
      });
    },

    *getSingleNoticeBoard({ payload }, { call }) {
      const res = yield call(getSingleNoticeBoard, payload);
      return res;
    },
    *addNoticeBoard({ payload }, { call }) {
      const response = yield call(addNoticeBoard, payload);
      return response;
    },
    *updateNoticeBoard({ payload }, { call }) {
      const response = yield call(updateNoticeBoard, payload);
      return response;
    },
    *deleteNoticeBoard({ payload }, { call }) {
      const response = yield call(deleteNoticeBoard, payload);
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
