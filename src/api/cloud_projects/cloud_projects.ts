import {
  IParams,
  ICloudProjects,
  ICloudProject,
} from "@/types/cloud_projects.types";
import { $axios } from "@/plugins/axios";


export const fetchCloudProjectsAll = () => {
  return $axios.get<unknown, ICloudProjects>(`${import.meta.env.VITE_APP_BASE_URL}/cloud/providers/projects`);
};

export const fetchCloudProjectsDummy = () => {
  return $axios.get<unknown, ICloudProjects>(`${import.meta.env.VITE_APP_BASE_URL}/cloud/providers/dummy/projects`);
};

export const fetchCloudProjectsAWS = () => {
  return $axios.get<unknown, ICloudProjects>(`${import.meta.env.VITE_APP_BASE_URL}/cloud/providers/aws/projects`);
};

export const fetchCloudProjectsGCP = () => {
  return $axios.get<unknown, ICloudProjects>(`${import.meta.env.VITE_APP_BASE_URL}/cloud/providers/gcp/projects`);
};

export const fetchCloudProjectByIdProvider = (provider: string, project_id: number) => {
  return $axios.get<unknown, ICloudProject>(`${import.meta.env.VITE_APP_BASE_URL}/cloud/providers/${provider}/projects/${project_id}`);
}
