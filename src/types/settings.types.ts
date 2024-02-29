export interface ISettingsCloudProviders {
  aws: boolean;
  gcp: boolean;
  azure: boolean;
}

export interface ISettings {
  path: boolean;
  children: ISetting[];
}
export interface ISetting {
  id?: number;
  key?: string;
  value?: string;
  type?: string;
  category?: string;
  description?: string;
  children?: ISetting[];
}

export interface IParams {
  limit?: number;
  skip?: number;
  select?: string;
}
