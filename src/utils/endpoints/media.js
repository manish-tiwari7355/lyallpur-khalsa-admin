const { defaults } = require('./defaults');

export const media = {
  getMediaList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/media',
    },
  },
  getSingleMediaList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/media/:id',
    },
  },
  addMedia: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/media/add',
    },
  },
  updateMedia: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/media/:id',
    },
  },
  deleteMedia: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/media/:id',
    },
  },
};
