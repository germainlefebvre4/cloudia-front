import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query"
import {
  fetchCloudProjectsDummy,
  fetchCloudProjectsAWS,
  fetchCloudProjectsGCP,
//   fetchCloudProjectDetails,
} from "./cloud_projects";
import { IParams } from "@/types/cloud_projects.types";


export const useCloudProjectsDummy = () => {
  return useQuery({
    queryKey: ["cloud_projects_dummy"],
    queryFn: fetchCloudProjectsDummy,
  });
};

export const useCloudProjectsAWS = () => {
  return useQuery({
    queryKey: ["cloud_projects_aws"],
    // queryKey: ["cloud_projects_dummy"],
    queryFn: fetchCloudProjectsAWS,
  });
};

export const useCloudProjectsGCP = () => {
  return useQuery({
    queryKey: ["cloud_projects_gcp"],
    // queryKey: ["cloud_projects_dummy"],
    queryFn: fetchCloudProjectsGCP,
  });
};
