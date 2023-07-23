import apiEndPoints from '@/utils/apiEndPoints';
import { callApi } from '@/utils/apiUtils';

export const getEnquiryList = ({ query }) => {
  return callApi({ uriEndPoint: apiEndPoints.enquiryForm.getEnquiryList.v1, query })
    .then((res) => res)
    .catch((err) => err);
};
