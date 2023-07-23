const { defaults } = require('./defaults');

export const payment = {
  addPayment: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/payment/add/:id',
    },
  },
  getPayment: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/payment/:id',
    },
  },
  addMultiplePayment: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/payment/addMultiple/:id',
    },
  },
  updatePayment: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/payment/update/:id',
    },
  },
  getPendingPaymentDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/payment/getPendingPaymentDetails',
    },
  },
  getAllPendingPaymentAmountDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/payment/getAllPendingPaymentAmountDetails',
    },
  },
};
