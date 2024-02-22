import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query"
import {
  fetchCloudProjectsAll,
  fetchCloudProjectsDummy,
  fetchCloudProjectsAWS,
  fetchCloudProjectsGCP,
  fetchCloudProjectByIdProvider,
} from "./cloud_projects";
import { IParams } from "@/types/cloud_projects.types";


export const useCloudProjectsAll = () => {
  return useQuery({
    queryKey: ["cloud_projects_all"],
    queryFn: fetchCloudProjectsAll,
  });
};

export const useCloudProjectsDummy = () => {
  return useQuery({
    queryKey: ["cloud_projects_dummy"],
    queryFn: fetchCloudProjectsDummy,
  });
};

export const useCloudProjectsAWS = () => {
  return useQuery({
    queryKey: ["cloud_projects_aws"],
    queryFn: fetchCloudProjectsAWS,
  });
};

export const useCloudProjectsGCP = () => {
  return useQuery({
    queryKey: ["cloud_projects_gcp"],
    queryFn: fetchCloudProjectsGCP,
  });
};

export const useCloudProjectDetailsByIdProvider = (provider: string, project_id: number) => {
  return useQuery({
    queryKey: ['cloud_project', provider, project_id],
    queryFn: () => fetchCloudProjectByIdProvider(provider, project_id),
  });
};
