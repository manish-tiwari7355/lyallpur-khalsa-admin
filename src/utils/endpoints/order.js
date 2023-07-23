const { defaults } = require('./defaults');

export const order = {
  orderList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/orders',
    },
  },
  getorder: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/orders/:id',
    },
  },
  getUserOrders: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/orders/user/:id',
    },
  },
  addOrders: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/orders/create/:id',
    },
  },
  existingCustomer: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/fetchUser',
    },
  },
  createUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/user/admin/createUser',
    },
  },
  getSingleOrderDetail: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/orders/:id',
    },
  },
  updateOrderStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/orders/:id',
    },
  },
  deleteOrders: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/orders/:id',
    },
  },
  addShippingFee: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/orders/addShippingFee/:id',
    },
  },
  updateShipping: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/orders/updateShipping/:id',
    },
  },
  updateIndividualOrder: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/orders/individualOrder/:id',
    },
  },
  deleteIndividualOrder: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/orders/individualOrder/:id',
    },
  },
  addOrderItems: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/orders/addProduct/:orderId/user/:userId',
    },
  },
};
