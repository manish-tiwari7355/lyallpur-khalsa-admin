import apiEndPoints from '@/utils/apiEndPoints';
import { callApi } from '@/utils/apiUtils';

export const getContactList = ({ query }) => {
  return callApi({ uriEndPoint: apiEndPoints.contact.getContactList.v1, query })
    .then((res) => res)
    .catch((err) => err);
};
