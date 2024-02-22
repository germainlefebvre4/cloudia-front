export interface ISettingsCloudProviders {
  aws: boolean;
  gcp: boolean;
  azure: boolean;
}

export interface ISettings {
  // cloud_providers: ISettingsCloudProviders[];
  aws: boolean;
  gcp: boolean;
  azure?: boolean;
}

export interface IParams {
  limit?: number;
  skip?: number;
  select?: string;
}
