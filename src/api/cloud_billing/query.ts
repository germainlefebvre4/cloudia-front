import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query"
import {
  fetchCloudBilling,
} from "./cloud_billing";


export const useCloudBilling = (provider: string, project_id: number, year: number, month: number) => {
  return useQuery({
    queryKey: ['cloud_project_billing', provider, project_id, year, month],
    queryFn: () => fetchCloudBilling(provider, project_id, year, month),
  });
};
