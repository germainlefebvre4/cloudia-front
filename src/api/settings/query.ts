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
  updateSettingCloudProvider,
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
  return useQuery({
    queryKey: ["settings", settingId],
    queryFn: () => fetchSettingById(settingId),
  });
};

export const setSettingCloudProvider = (provider: string, value: any) => {
  const settingId: number = useSettingByName(provider).data.id;
  return updateSettingCloudProvider(settingId, value);
}
