import { callApi } from '@/utils/apiUtils';
import { media } from '@/utils/endpoints/media';

export const getMediaList = ({ query }) => callApi({ uriEndPoint: media.getMediaList.v1, query });
export const getSingleMediaList = ({ pathParams }) =>
  callApi({ uriEndPoint: media.getSingleMediaList.v1, pathParams });
export const addMediaList = ({ body }) => callApi({ uriEndPoint: media.addMedia.v1, body });
export const updateMediaList = ({ pathParams, body }) =>
  callApi({ uriEndPoint: media.updateMedia.v1, pathParams, body });
export const deleteMediaList = ({ pathParams, body }) =>
  callApi({ uriEndPoint: media.deleteMedia.v1, pathParams, body });
