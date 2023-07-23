const { defaults } = require('./defaults');

export const prospectUsers = {
  getProspectUsers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/prospectusers',
    },
  },
  getAllUsers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/fetchAllUsers',
    },
  },
  updateUser: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/update/:id',
    },
  },
  rejectProspectUsers: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/auth/updateProspect/:token',
    },
  },
  acceptProspectUsers: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/auth/updateProspect/:token',
    },
  },
};
