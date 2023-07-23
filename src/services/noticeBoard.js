import { callApi } from '@/utils/apiUtils';
import { noticeBoard } from '@/utils/endpoints/noticeBoard';

export const getAllNoticeBoardList = ({ query }) => {
  return callApi({ uriEndPoint: noticeBoard.getAllNoticeBoardList.v1, query })
    .then((res) => res)
    .catch((err) => err);
};
export const getSingleNoticeBoard = ({ pathParams }) =>
  callApi({ uriEndPoint: noticeBoard.getSingleNoticeBoard.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const addNoticeBoard = ({ body }) => {
  console.log('sad', body);
  return callApi({ uriEndPoint: noticeBoard.addNoticeBoard.v1, body })
    .then((res) => res)
    .catch((err) => err);
};

export const updateNoticeBoard = ({ pathParams, body }) =>
  callApi({ uriEndPoint: noticeBoard.updateNoticeBoard.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);

export const deleteNoticeBoard = ({ pathParams, body }) =>
  callApi({ uriEndPoint: noticeBoard.deleteNoticeBoard.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);
