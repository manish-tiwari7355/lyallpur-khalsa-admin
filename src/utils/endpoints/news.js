const { defaults } = require('./defaults');

export const news = {
  getNewsList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/news',
    },
  },
  getSingleNewsList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/news/:id',
    },
  },
  addNews: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/news/add',
    },
  },
  updateNews: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/news/:id',
    },
  },
  deleteNews: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/news/:id',
    },
  },
};
