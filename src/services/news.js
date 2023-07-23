import { callApi } from '@/utils/apiUtils';
import { news } from '@/utils/endpoints/news';

export const getNewsList = () => callApi({ uriEndPoint: news.getNewsList.v1 });
export const getSingleNewsList = ({ pathParams }) =>
  callApi({ uriEndPoint: news.getSingleNewsList.v1, pathParams });
export const addNewsList = ({ body }) => callApi({ uriEndPoint: news.addNews.v1, body });
export const updateNewsList = ({ pathParams, body }) =>
  callApi({ uriEndPoint: news.updateNews.v1, pathParams, body });
export const deleteNewsList = ({ pathParams, body }) =>
  callApi({ uriEndPoint: news.deleteNews.v1, pathParams, body });
//
