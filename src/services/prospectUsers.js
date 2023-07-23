import { hostname, callApi } from '@/utils/apiUtils';
import { prospectUsers } from '@/utils/endpoints/prospectUser';

export const getProspectUsersList = ({ query }) =>
  callApi({ uriEndPoint: prospectUsers.getProspectUsers.v1, query })
    .then((res) => res)
    .catch((err) => err);
export const getAllUsers = ({ query }) =>
  callApi({ uriEndPoint: prospectUsers.getAllUsers.v1, query })
    .then((res) => res)
    .catch((err) => err);

export const rejectProspectUsers = ({ pathParams, body }) =>
  callApi({ uriEndPoint: prospectUsers.rejectProspectUsers.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const updateUser = ({ pathParams, body }) =>
  callApi({ uriEndPoint: prospectUsers.updateUser.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const acceptProspectUsers = ({ pathParams, body }) =>
  callApi({ uriEndPoint: prospectUsers.acceptProspectUsers.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);
