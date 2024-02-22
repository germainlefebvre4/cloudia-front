import { ICloudProvider } from "./cloud_provider.types";

export interface ICloudProjects {
  provider: ICloudProvider,
  projects: ICloudProject[],
  count: number,
}

export interface ICloudProject {
  name: string;
  id?: number;
  state?: string;
  labels?: any;
  email?: string;
  parent?: string;
  tags?: any;
  created_at?: string;
}

export interface IParams {
  limit?: number;
  skip?: number;
  select?: string;
}
