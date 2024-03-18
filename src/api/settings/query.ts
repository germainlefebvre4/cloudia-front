import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query"
import {
  fetchSettings,
  fetchSettingById,
  fetchSettingByName,
  updateSetting,
} from "./settings";
import { IParams } from "@/types/settings.types";
import { provide } from "vue";


export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });
};

export const useSettingByName = (settingName: string) => {
  return useQuery({
    queryKey: ["settings", settingName],
    queryFn: () => fetchSettingByName(settingName),
  });
};

export const useSettingById = (settingId: number) => {
  // return useQuery({
  //   queryKey: ["settings", settingId],
  //   queryFn: () => fetchSettingById(settingId),
  // });
  return fetchSettingById(settingId);
};

export const setSetting = (settingId: number, value: any) => {
  delete value.id;
  return updateSetting(settingId, value);
}
