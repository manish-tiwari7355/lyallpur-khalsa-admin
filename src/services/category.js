import { callApi } from '@/utils/apiUtils';
import { category } from '@/utils/endpoints/category';

export const getCategoryList = ({ query }) =>
  callApi({ uriEndPoint: category.getCategoryList.v1, query })
    .then((res) => res)
    .catch((err) => err);
export const getAllCategoryList = ({ query }) =>
  callApi({ uriEndPoint: category.getAllCategoryList.v1, query })
    .then((res) => res)
    .catch((err) => err);
export const getSingleCategoryList = ({ pathParams }) =>
  callApi({ uriEndPoint: category.getSingleCategoryList.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const getParentDetail = ({ pathParams }) =>
  callApi({ uriEndPoint: category.getParentDetail.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const addCategory = ({ pathParams, body }) =>
  callApi({ uriEndPoint: category.addCategory.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const updateCategory = ({ pathParams, body }) =>
  callApi({ uriEndPoint: category.updateCategory.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const deleteCategory = ({ pathParams }) =>
  callApi({ uriEndPoint: category.deleteCategory.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

    export const allCategory = ({ pathParams, body }) =>
  callApi({ uriEndPoint: category.allCategory.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);