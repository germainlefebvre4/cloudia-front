import {
  ISettings,
  ISettingsCloudProviders,
} from "@/types/settings.types";
import { $axios } from "@/plugins/axios";


export const fetchSettings = () => {
  return $axios.get<unknown, ISettings[]>(`${import.meta.env.VITE_APP_BASE_URL}/settings/`);
};
