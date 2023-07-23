import { callApi } from '@/utils/apiUtils';
import { reports } from '@/utils/endpoints/reports';

export const getReports = ({ query }) => callApi({ uriEndPoint: reports.getReports.v1, query });
export const updateReportPayment = ({ body }) => callApi({ uriEndPoint: reports.payTax.v1, body });
export const getPaidTaxData = ({ body }) =>
  callApi({ uriEndPoint: reports.getPaidTaxData.v1, body });
