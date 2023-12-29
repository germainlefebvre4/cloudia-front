import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query"
import {
  fetchSettings,
} from "./settings";
import { IParams } from "@/types/settings.types";


export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });
};
