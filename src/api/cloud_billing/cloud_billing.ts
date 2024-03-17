import {
  ICloudBilling,
  ICloudBillingForChart,
} from "@/types/cloud_billing.types";
import { $axios } from "@/plugins/axios";


export const fetchCloudBilling = (provider: string, project_id: number, year: number, month: number) => {
  return $axios.get<unknown, ICloudBilling>(`${import.meta.env.VITE_APP_BASE_URL}/billing/${provider}/projects/${project_id}?year=${year}&month=${month}`);
}

export const fetchCloudBillingByProjectForChart = (project_id: string, start_year: number, start_month: number, end_year: number, end_month: number) => {
  return $axios.get<unknown, ICloudBillingForChart>(`${import.meta.env.VITE_APP_BASE_URL}/billing/aws/projects/${project_id}/chart?start_year=${start_year}&start_month=${start_month}&end_year=${end_year}&end_month=${end_month}`);
}

export const fetchCloudBillingForChart = (start_year: number, start_month: number, end_year: number, end_month: number) => {
  return $axios.get<unknown, ICloudBillingForChart>(`${import.meta.env.VITE_APP_BASE_URL}/billing/all/projects/chart?start_year=${start_year}&start_month=${start_month}&end_year=${end_year}&end_month=${end_month}`);
}
export const fetchCloudBillingByProviderForChart = (providerName: string, start_year: number, start_month: number, end_year: number, end_month: number) => {
  return $axios.get<unknown, ICloudBillingForChart>(`${import.meta.env.VITE_APP_BASE_URL}/billing/${providerName}/projects/chart?start_year=${start_year}&start_month=${start_month}&end_year=${end_year}&end_month=${end_month}`);
}
