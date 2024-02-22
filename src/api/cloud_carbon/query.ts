import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query"
import {
  fetchCloudCarbonFootprint,
} from "./cloud_carbon";


export const useCloudCarbonFootprint = (provider: string, project_id: number, year: number, month: number) => {
  return useQuery({
    queryKey: ['cloud_project_carbon', provider, project_id, year, month],
    queryFn: () => fetchCloudCarbonFootprint(provider, project_id, year, month),
  });
};
