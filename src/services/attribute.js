import { callApi } from "@/utils/apiUtils";
import { attribute } from "@/utils/endpoints/attribute";

export const getAttributeList = ({ pathParams}) =>
  callApi({ uriEndPoint: attribute.getAttributeList.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const getAllAttributeList = ({ query }) =>
  callApi({ uriEndPoint: attribute.getAllAttributeList.v1, query })
    .then((res) => res)
    .catch((err) => err);
export const getSingleAttributeList = ({ pathParams }) =>
  callApi({ uriEndPoint: attribute.getSingleAttributeList.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const getParentDetail = ({ pathParams }) =>
  callApi({ uriEndPoint: attribute.getParentDetail.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const addAttribute = ({ pathParams, body }) =>
  callApi({ uriEndPoint: attribute.addAttribute.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const updateAttribute = ({ pathParams, body }) =>
  callApi({ uriEndPoint: attribute.updateAttribute.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const deleteAttribute = ({ pathParams }) =>
  callApi({ uriEndPoint: attribute.deleteAttribute.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const allAttribute = ({ pathParams, body }) =>
  callApi({ uriEndPoint: attribute.allAttribute.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);
