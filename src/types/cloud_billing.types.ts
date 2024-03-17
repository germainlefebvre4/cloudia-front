export interface ICloudBilling {
  project_id: number;
  year: number;
  month: number;
  cost_total: number;
  cost_unit: string;
}

export interface IChartDataPoint {
  x: string;
  y: number;
}

export interface ICloudBillingForChart {
  label: string;
  data: IChartDataPoint[];
}
