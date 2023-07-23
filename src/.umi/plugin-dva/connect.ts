// @ts-nocheck
import { IRoute } from '@umijs/core';
import { AnyAction } from 'redux';
import React from 'react';
import { EffectsCommandMap, SubscriptionAPI } from 'dva';
import { match } from 'react-router-dom';
import { Location, LocationState, History } from 'history';

export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/attribute';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/brand';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/category';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/common';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/contact';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/enquiryForm';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/event';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/forms';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/global';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/login';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/media';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/news';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/noticeBoard';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/order';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/payment';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/prospectUsers';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/reports';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/serviceUser';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/setting';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/staff';
export * from '/Users/manishtiwari/Desktop/lyallpur-khalsa-college-admin/src/models/user';

export interface Action<T = any> {
  type: T
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ImmerReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => void;

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap,
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export type Subscription = (api: SubscriptionAPI, done: Function) => void | Function;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    [key: string]: any;
  };
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
> {
  dispatch?: Dispatch;
  // https://github.com/umijs/umi/pull/2194
  match?: match<P>;
  location: Location<S> & { query: T };
  history: History;
  route: IRoute;
}

export type RequiredConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
  > = Required<ConnectProps<P, S, T>>

/**
 * @type T: React props
 * @type U: match props types
 */
export type ConnectRC<
  T = {},
  U = {},
  S = {},
  Q = {}
> = React.ForwardRefRenderFunction<any, T & RequiredConnectProps<U, S, Q>>;

