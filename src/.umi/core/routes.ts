// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/layouts/UserLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "name": "login",
        "path": "/user/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/user/login'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "name": "signup",
        "path": "/user/signup",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__signup' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/user/signup'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "name": "inviteUser",
        "path": "/user/forgotpassword",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__ForgotPassword' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/user/ForgotPassword'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "name": "resetPassword",
        "path": "/user/resetPassword",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__ResetPassword' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/user/ResetPassword'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "name": "inviteUser",
        "path": "/user/invitation",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__acceptInvitation' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/user/acceptInvitation'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/layouts/SecurityLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/layouts/BasicLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "redirect": "/dashboard",
            "exact": true
          },
          {
            "path": "/dashboard",
            "name": "Dashboard",
            "icon": "dashboard",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Dashboard' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/Dashboard'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/noticeboard",
            "name": "NoticeBoard",
            "icon": "CarryOutOutlined",
            "routes": [
              {
                "path": "/noticeboard",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__NoticeBoard' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/NoticeBoard'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              },
              {
                "path": "/noticeboard/add",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__NoticeBoard__AddNoticeBoard' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/NoticeBoard/AddNoticeBoard'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              },
              {
                "path": "/noticeboard/edit/:recordId",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__NoticeBoard__AddNoticeBoard' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/NoticeBoard/AddNoticeBoard'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              }
            ]
          },
          {
            "path": "/event",
            "name": "Events",
            "icon": "SkinOutlined",
            "routes": [
              {
                "path": "/event",
                "redirect": "/event/all",
                "exact": true
              },
              {
                "path": "/event/:tabName",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Event' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/Event'), loading: LoadingComponent}),
                "hideInMenu": "true",
                "exact": true
              },
              {
                "path": "/event/new/add",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Event__AddEditEventForm' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/Event/AddEditEventForm'), loading: LoadingComponent}),
                "hideInMenu": "true",
                "exact": true
              },
              {
                "path": "/event/edit/:recordId",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Event__AddEditEventForm' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/Event/AddEditEventForm'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              }
            ]
          },
          {
            "path": "/media",
            "name": "Media Coverage",
            "icon": "SkinOutlined",
            "routes": [
              {
                "path": "/media",
                "redirect": "/media/all",
                "exact": true
              },
              {
                "path": "/media/:tabName",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Media' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/Media'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              },
              {
                "path": "/media/new/add",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Media__AddMediaBoard' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/Media/AddMediaBoard'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              },
              {
                "path": "/media/edit/:recordId",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Media__AddMediaBoard' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/Media/AddMediaBoard'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              }
            ]
          },
          {
            "path": "/news",
            "name": "News Gallery",
            "icon": "SkinOutlined",
            "routes": [
              {
                "path": "/news",
                "redirect": "/news/all",
                "exact": true
              },
              {
                "path": "/news/:tabName",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__News' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/News'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              },
              {
                "path": "/news/new/add",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__News__AddNews' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/News/AddNews'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              },
              {
                "path": "/news/edit/:recordId",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__News__AddNews' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/News/AddNews'), loading: LoadingComponent}),
                "hideInMenu": true,
                "exact": true
              }
            ]
          },
          {
            "name": "Enquiry Form",
            "path": "/enquiry-form",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__EnquiryForm' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/EnquiryForm'), loading: LoadingComponent}),
            "icon": "question-circle",
            "exact": true
          },
          {
            "name": "Contact",
            "path": "/contact",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Contact' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/Contact'), loading: LoadingComponent}),
            "icon": "ContactsOutlined",
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
