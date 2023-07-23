const { defaults } = require("./defaults");

export const brand = {
  getBrandList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/brand/category/:id",
    },
  },
  getAllBrandList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/brand",
    },
  },
  getSingleBrandList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/brand/:id",
    },
  },
  getParentDetail: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/brand/:id",
    },
  },
  addBrand: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/brand",
    },
  },

  updateBrand: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/brand/:id",
    },
  },
  deleteBrand: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/brand/:id",
    },
  },
};
