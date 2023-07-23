const { defaults } = require('./defaults');

export const event = {
  resendEmail: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/visitor/resend-email/:id',
    },
  },
  getStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/visitor/count/stats',
    },
  },
  getLeadStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/lead/stats',
    },
  },
  register: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/visitor/create',
    },
  },
  registerExhibitor: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/visitor/create-exhibitor',
    },
  },
  // submitEventDetails: {
  //   v1: {
  //     ...defaults.methods.POST,
  //     ...defaults.versions.v1,
  //     uri: '/event/addEventDetails',
  //   },
  // },
  updateEventDetails: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/events/:id',
    },
  },
  getEventDetail: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/events',
    },
  },
  addEventDetails: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/events/create',
    },
  },
  getSingleEventDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/events/:id',
    },
  },
  deleteEventDetails: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/events/:id',
    },
  },
  updateRegistration: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/visitor/:id',
    },
  },
  getVisitors: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/visitor/list',
    },
  },
  getExhibitors: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/visitor/list/:type',
    },
  },
  getSingleRegistration: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/visitor/:id',
    },
  },
  deleteRegistration: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/visitor/:id',
    },
  },
  getQrCode: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/event/qr',
    },
  },
  getVendors: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/list',
    },
  },
  getDashboardStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/dashboard/stats',
    },
  },
  getLeadScanners: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/subcription/active',
    },
  },

  getIdCardPdfDoc: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/event/getIdCardPdfDoc',
    },
  },
  checkUniqueVisitor: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/visitor/unique/:email',
    },
  },
  addLeadScanner: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/user/scanner',
    },
  },
  removeLeadScanner: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/user/scanner',
    },
  },
};
