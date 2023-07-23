import { callApi } from '@/utils/apiUtils';
import { leads } from '@/utils/endpoints/leads';

export const getLeadsList = ({ query }) => callApi({ uriEndPoint: leads.getLeadsList.v1, query });
