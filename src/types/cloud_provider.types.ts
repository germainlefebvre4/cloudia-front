export interface ICloudProvider {
  slug: string,
  title_full: string,
  title_short: string,
}

export interface IParams {
  limit?: number;
  skip?: number;
  select?: string;
}
