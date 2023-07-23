// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelAttribute0 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/attribute.js';
import ModelBrand1 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/brand.js';
import ModelCategory2 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/category.js';
import ModelCommon3 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/common.js';
import ModelContact4 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/contact.js';
import ModelEnquiryForm5 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/enquiryForm.js';
import ModelEvent6 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/event.js';
import ModelForms7 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/forms.js';
import ModelGlobal8 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/global.js';
import ModelLogin9 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/login.js';
import ModelMedia10 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/media.js';
import ModelNews11 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/news.js';
import ModelNoticeBoard12 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/noticeBoard.js';
import ModelOrder13 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/order.js';
import ModelPayment14 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/payment.js';
import ModelProspectUsers15 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/prospectUsers.js';
import ModelReports16 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/reports.js';
import ModelServiceUser17 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/serviceUser.js';
import ModelSetting18 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/setting.js';
import ModelStaff19 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/staff.js';
import ModelUser20 from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/user.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'attribute', ...ModelAttribute0 });
app.model({ namespace: 'brand', ...ModelBrand1 });
app.model({ namespace: 'category', ...ModelCategory2 });
app.model({ namespace: 'common', ...ModelCommon3 });
app.model({ namespace: 'contact', ...ModelContact4 });
app.model({ namespace: 'enquiryForm', ...ModelEnquiryForm5 });
app.model({ namespace: 'event', ...ModelEvent6 });
app.model({ namespace: 'forms', ...ModelForms7 });
app.model({ namespace: 'global', ...ModelGlobal8 });
app.model({ namespace: 'login', ...ModelLogin9 });
app.model({ namespace: 'media', ...ModelMedia10 });
app.model({ namespace: 'news', ...ModelNews11 });
app.model({ namespace: 'noticeBoard', ...ModelNoticeBoard12 });
app.model({ namespace: 'order', ...ModelOrder13 });
app.model({ namespace: 'payment', ...ModelPayment14 });
app.model({ namespace: 'prospectUsers', ...ModelProspectUsers15 });
app.model({ namespace: 'reports', ...ModelReports16 });
app.model({ namespace: 'serviceUser', ...ModelServiceUser17 });
app.model({ namespace: 'setting', ...ModelSetting18 });
app.model({ namespace: 'staff', ...ModelStaff19 });
app.model({ namespace: 'user', ...ModelUser20 });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
