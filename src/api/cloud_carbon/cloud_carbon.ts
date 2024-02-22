import {
  ICloudCarbonFootprint,
} from "@/types/cloud_carbon.types";
import { $axios } from "@/plugins/axios";


export const fetchCloudCarbonFootprint = (provider: string, project_id: number, year: number, month: number) => {
  return $axios.get<unknown, ICloudCarbonFootprint>(`${import.meta.env.VITE_APP_BASE_URL}/carbon/${provider}/projects/${project_id}?year=${year}&month=${month}`);
}
