const { defaults } = require("./defaults");

export const attribute = {
  getAttributeList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/attributes/category/:id",
    },
  },
  getAllAttributeList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/attributes",
    },
  },
  getSingleAttributeList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/attributes/:id",
    },
  },
  getParentDetail: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/attributes/:id",
    },
  },
  addAttribute: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/attributes",
    },
  },

  updateAttribute: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/attributes/:id",
    },
  },
  deleteAttribute: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/attributes/:id",
    },
  },
};
