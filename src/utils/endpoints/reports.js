const { defaults } = require('./defaults');

export const reports = {
  getReports: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/reports',
    },
  },
  payTax: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/reports/payTax',
    },
  },
  getPaidTaxData: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/reports/getPaidTaxDetails',
    },
  },
};
