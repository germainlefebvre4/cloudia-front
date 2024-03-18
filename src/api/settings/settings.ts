import {
  ISetting,
  ISettings,
  ISettingSet,
  ISettingSetPayload,
} from "@/types/settings.types";
import { $axios } from "@/plugins/axios";


export const fetchSettings = () => {
  return $axios.get<unknown, ISettings>(`${import.meta.env.VITE_APP_BASE_URL}/settings/`);
};

export const updateSetting = (settingId: number, value: ISettingSetPayload) => {
  return $axios.put<unknown, ISettingSetPayload>(`${import.meta.env.VITE_APP_BASE_URL}/settings/${settingId}`, { value });
}

export const fetchSettingByName = (settingName: string) => {
  return $axios.get<unknown, ISetting>(`${import.meta.env.VITE_APP_BASE_URL}/settings/search/${settingName}`);
}

export const fetchSettingById = (settingId: number) => {
  return $axios.get<unknown, ISetting>(`${import.meta.env.VITE_APP_BASE_URL}/settings/${settingId}`);
}
