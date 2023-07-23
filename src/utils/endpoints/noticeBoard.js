const { defaults } = require('./defaults');

export const noticeBoard = {
  getAllNoticeBoardList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/noticeboard/',
    },
  },
  addNoticeBoard: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/noticeboard/create',
    },
  },
  getSingleNoticeBoard: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/noticeboard/:id',
    },
  },
  updateNoticeBoard: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/noticeboard/:id',
    },
  },
  deleteNoticeBoard: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/noticeboard/:id',
    },
  },
};
