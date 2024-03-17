import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query"
import {
  fetchCloudBilling,
  fetchCloudBillingForChart,
  fetchCloudBillingByProjectForChart,
  fetchCloudBillingByProviderForChart,
} from "./cloud_billing";


export const useCloudBilling = (provider: string, project_id: number, year: number, month: number) => {
  return useQuery({
    queryKey: ['cloud_project_billing', provider, project_id, year, month],
    queryFn: () => fetchCloudBilling(provider, project_id, year, month),
  });
};

export const useCloudBillingByProjectForChart = (project_id: string, start_year: number, start_month: number, end_year: number, end_month: number) => {
  return useQuery({
    queryKey: ['cloud_project_billing_chart', project_id, start_year, start_month, end_year, end_month],
    queryFn: () => fetchCloudBillingByProjectForChart(project_id, start_year, start_month, end_year, end_month),
  });
};

export const useCloudBillingForChart = (start_year: number, start_month: number, end_year: number, end_month: number) => {
  return useQuery({
    queryKey: ['cloud_project_billing_chart', start_year, start_month, end_year, end_month],
    queryFn: () => fetchCloudBillingForChart(start_year, start_month, end_year, end_month),
  });
};

export const useCloudBillingByProviderForChart = (providerName: string, start_year: number, start_month: number, end_year: number, end_month: number) => {
  return useQuery({
    queryKey: ['cloud_project_billing_chart', providerName, start_year, start_month, end_year, end_month],
    queryFn: () => fetchCloudBillingByProviderForChart(providerName, start_year, start_month, end_year, end_month),
  });
};
