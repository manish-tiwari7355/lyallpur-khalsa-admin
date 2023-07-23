import { callApi } from "@/utils/apiUtils";
import { brand } from "@/utils/endpoints/brand";

export const getBrandList = ({ pathParams }) =>
  callApi({ uriEndPoint: brand.getBrandList.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const getAllBrandList = ({ query }) =>
  callApi({ uriEndPoint: brand.getAllBrandList.v1, query })
    .then((res) => res)
    .catch((err) => err);
export const getSingleBrandList = ({ pathParams }) =>
  callApi({ uriEndPoint: brand.getSingleBrandList.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const getParentDetail = ({ pathParams }) =>
  callApi({ uriEndPoint: brand.getParentDetail.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const addBrand = ({ pathParams, body }) =>
  callApi({ uriEndPoint: brand.addBrand.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const updateBrand = ({ pathParams, body }) =>
  callApi({ uriEndPoint: brand.updateBrand.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const deleteBrand = ({ pathParams }) =>
  callApi({ uriEndPoint: brand.deleteBrand.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const allBrand = ({ pathParams, body }) =>
  callApi({ uriEndPoint: brand.allBrand.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);
