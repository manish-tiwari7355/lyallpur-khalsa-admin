import { callApi } from '@/utils/apiUtils';
import { event } from '@/utils/endpoints/event';

export const getStats = () => callApi({ uriEndPoint: event.getStats.v1 });
export const getLeadStats = () => callApi({ uriEndPoint: event.getLeadStats.v1 });

export const register = ({ body }) => callApi({ uriEndPoint: event.register.v1, body });
export const resendUserEmail = ({ pathParams }) =>
  callApi({ uriEndPoint: event.resendEmail.v1, pathParams });
export const registerExhibitor = ({ body }) =>
  callApi({ uriEndPoint: event.registerExhibitor.v1, body });
export const submitEventDetails = ({ body }) =>
  callApi({ uriEndPoint: event.submitEventDetails.v1, body });
export const updateEventDetails = ({ pathParams, body }) =>
  callApi({ uriEndPoint: event.updateEventDetails.v1, pathParams, body });

export const updateRegistration = ({ pathParams, body }) =>
  callApi({ uriEndPoint: event.updateRegistration.v1, pathParams, body });

export const getVisitors = ({ query }) => callApi({ uriEndPoint: event.getVisitors.v1, query });
export const getExhibitors = ({ query, pathParams }) =>
  callApi({ uriEndPoint: event.getExhibitors.v1, query, pathParams });
export const getSingleRegistration = ({ pathParams }) =>
  callApi({ uriEndPoint: event.getSingleRegistration.v1, pathParams });
export const deleteRegistration = ({ pathParams }) =>
  callApi({ uriEndPoint: event.deleteRegistration.v1, pathParams });
export const getEventDetail = ({ query }) =>
  callApi({ uriEndPoint: event.getEventDetail.v1, query });
export const getQrCode = ({ body }) => {
  return callApi({ uriEndPoint: event.getQrCode.v1, body });
};
export const addEventDetail = ({ body }) => {
  return callApi({ uriEndPoint: event.addEventDetails.v1, body });
};
export const getSingleEventDetail = ({ pathParams }) => {
  return callApi({ uriEndPoint: event.getSingleEventDetails.v1, pathParams });
};
export const deleteEventDetail = ({ pathParams }) => {
  return callApi({ uriEndPoint: event.deleteEventDetails.v1, pathParams });
};
export const updateEventDetail = ({ pathParams, body }) => {
  return callApi({ uriEndPoint: event.updateEventDetails.v1, pathParams, body });
};
export const getVendors = ({ query }) => {
  return callApi({ uriEndPoint: event.getVendors.v1, query });
};
export const getDashboardStats = ({ query }) => {
  return callApi({ uriEndPoint: event.getDashboardStats.v1, query });
};
export const getLeadScanners = ({ query }) => {
  return callApi({ uriEndPoint: event.getLeadScanners.v1, query });
};

export const getIdCardPdfDoc = ({ body }) => {
  return callApi({ uriEndPoint: event.getIdCardPdfDoc.v1, body });
};

export const checkUniqueVisitor = ({ pathParams }) =>
  callApi({ uriEndPoint: event.checkUniqueVisitor.v1, pathParams });

export const addLeadScanner = ({ body }) => callApi({ uriEndPoint: event.addLeadScanner.v1, body });

export const removeLeadScanner = ({ body }) =>
  callApi({ uriEndPoint: event.removeLeadScanner.v1, body });
