export interface ISettings {
  path: boolean;
}
export interface ISetting {
  id: number;
  path?: string;
  key?: string;
  value?: any;
  type?: string;
  description?: string;
}

export interface ISettingSet {
  id: number;
  value: any;
}

export interface ISettingSetPayload {
  value: any;
}

export interface IParams {
  limit?: number;
  skip?: number;
  select?: string;
}
