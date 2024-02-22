import {
  ICloudBilling,
} from "@/types/cloud_billing.types";
import { $axios } from "@/plugins/axios";


export const fetchCloudBilling = (provider: string, project_id: number, year: number, month: number) => {
  return $axios.get<unknown, ICloudBilling>(`${import.meta.env.VITE_APP_BASE_URL}/billing/${provider}/projects/${project_id}?year=${year}&month=${month}`);
}
