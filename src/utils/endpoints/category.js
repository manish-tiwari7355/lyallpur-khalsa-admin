const { defaults } = require("./defaults");

export const category = {
  getCategoryList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/category",
    },
  },
    getAllCategoryList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/category/list",
    },
  },
  getSingleCategoryList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/category/subCategory/:id",
    },
  },
  getParentDetail: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/category/:id",
    },
  },
  addCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/category",
    },
  },

  updateCategory: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/category/:id",
    },
  },
  deleteCategory: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/category/:id",
    },
  },

  allCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/product/category/all",
    },
  },
};
