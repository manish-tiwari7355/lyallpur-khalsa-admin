// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },

        {
          name: 'signup',
          path: '/user/signup',
          component: './user/signup',
        },
        {
          name: 'inviteUser',
          path: '/user/forgotpassword',
          component: './user/ForgotPassword',
        },
        {
          name: 'resetPassword',
          path: '/user/resetPassword',
          component: './user/ResetPassword',
        },
        {
          name: 'inviteUser',
          path: '/user/invitation',
          component: './user/acceptInvitation',
        },
      ],
    },

    // {
    //   path: '/privacy-policy',
    //   name: 'privacyPolicy',
    //   component: './Policy',
    // },
    // {
    //   name: 'registration',
    //   path: '/register',
    //   component: './Event/Register',
    //   hideInMenu: true,
    // },
    // {
    //   name: 'user-profile',
    //   path: '/register',
    //   component: './Event/Register',
    //   hideInMenu: true,
    // },
    // {
    //   name: 'membership-plans',
    //   path: '/membership-plans',
    //   component: './MemberShipList',
    //   hideInMenu: true,
    // },
    // {
    //   name: 'add-exhibitor',
    //   path: 'exhibitor/add',
    //   component: './Event/Register',
    //   hideInMenu: true,
    // },
    {
      path: '/',
      component: '../layouts/UserLayout',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },

            {
              path: '/dashboard',
              name: 'Dashboard',
              icon: 'dashboard',
              component: './Dashboard',
            },

            // {
            //   path: "/category",
            //   name: "category",
            //   icon: "ContainerOutlined",
            //   component: "./category",
            // },

            {
              path: '/noticeboard',
              name: 'NoticeBoard',
              icon: 'CarryOutOutlined',

              routes: [
                {
                  path: '/noticeboard',
                  component: './NoticeBoard',
                  hideInMenu: true,
                },
                {
                  path: '/noticeboard/add',
                  component: './NoticeBoard/AddNoticeBoard',
                  hideInMenu: true,
                },
                {
                  path: '/noticeboard/edit/:recordId',
                  component: './NoticeBoard/AddNoticeBoard',
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/event',
              name: 'Events',
              icon: 'SkinOutlined',
              routes: [
                { path: '/event', redirect: '/event/all' },
                {
                  path: '/event/:tabName',
                  component: './Event',
                  hideInMenu: 'true',
                },
                {
                  path: '/event/new/add',
                  component: './Event/AddEditEventForm',
                  hideInMenu: 'true',
                },
                {
                  path: '/event/edit/:recordId',
                  component: './Event/AddEditEventForm',
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/media',
              name: 'Media Coverage',
              icon: 'SkinOutlined',
              routes: [
                {
                  path: '/media',
                  redirect: '/media/all',
                },
                {
                  path: '/media/:tabName',
                  component: './Media',
                  hideInMenu: true,
                },
                {
                  path: '/media/new/add',
                  component: './Media/AddMediaBoard',
                  hideInMenu: true,
                },
                {
                  path: '/media/edit/:recordId',
                  component: './Media/AddMediaBoard',
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/news',
              name: 'News Gallery',
              icon: 'SkinOutlined',
              routes: [
                {
                  path: '/news',
                  redirect: '/news/all',
                },
                {
                  path: '/news/:tabName',
                  component: './News',
                  hideInMenu: true,
                },
                {
                  path: '/news/new/add',
                  component: './News/AddNews',
                  hideInMenu: true,
                },
                {
                  path: '/news/edit/:recordId',
                  component: './News/AddNews',
                  hideInMenu: true,
                },
              ],
            },
            {
              name: 'Enquiry Form',
              path: '/enquiry-form',
              component: './EnquiryForm',
              icon: 'question-circle',
            },
            {
              name: 'Contact',
              path: '/contact',
              component: './Contact',
              icon: 'ContactsOutlined',
            },
            // {
            //   path: "/orders",
            //   name: "orders",
            //   icon: "SkinOutlined",
            //   routes: [
            //     {
            //       path: "/orders",
            //       redirect: "/orders/all",
            //     },
            //     {
            //       path: "/orders/:orderId/detail",
            //       name: "order-detail",
            //       component: "./Orders/SingleOrderDetail",
            //       hideInMenu: true,
            //     },
            //     {
            //       path: "/orders/add",
            //       name: "add-orders",
            //       component: "./Orders/AddOrders",
            //       hideInMenu: true,
            //     },
            //     {
            //       path: "/orders/:tab",
            //       name: "orders",
            //       component: "./Orders",
            //       hideInMenu: true,
            //       routes: [
            //         {
            //           path: "/orders/all",
            //           name: "orders",
            //           component: "./Orders/OrderTable",
            //           hideInMenu: true,
            //         },
            //         {
            //           path: "/orders/cash-carry",
            //           name: "orders",
            //           component: "./Orders/OrderTable",
            //           hideInMenu: true,
            //         },
            //         {
            //           path: "/orders/online",
            //           name: "orders",
            //           component: "./Orders/OrderTable",
            //           hideInMenu: true,
            //         },
            //       ],
            //     },
            //   ],
            // },
            // {
            //   path: "/users",
            //   name: "Users",
            //   icon: "SkinOutlined",
            //   routes: [
            //     {
            //       path: "/users",
            //       redirect: "/users/all",
            //     },
            //     {
            //       path: "/users/all",

            //       component: "./Users",
            //       hideInMenu: true,
            //     },
            //     {
            //       path: "/users/addPayments",

            //       component: "./Users/AddPayments",
            //       hideInMenu: true,
            //     },
            //     {
            //       path: "/users/:userId/orders",

            //       component: "./Users/Orders",
            //       hideInMenu: true,
            //     },
            //   ],
            // },
            // {
            //   path: "/reports",
            //   name: "Reports",
            //   icon: "SkinOutlined",
            //   routes: [
            //     {
            //       path: "/reports",
            //       redirect: "/reports/all",
            //     },
            //     {
            //       path: "/reports/all",

            //       component: "./Reports",
            //       hideInMenu: true,
            //     },
            //     {
            //       path: "/reports/taxpaid",

            //       component: "./Reports/TaxPaid",
            //       hideInMenu: true,
            //     },
            //   ],
            // },

            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
