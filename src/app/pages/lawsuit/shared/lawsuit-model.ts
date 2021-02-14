export interface ILawSuit {
  district: string;
  court: Court;
  observation: string;
  code_number: number;
  client: string;
  descriptor: string;
  identifier: string;
  locker: number;
}
export interface DataLawSuit {
  next: string;
  previous: string;
  count: number;
  resultus: ILawSuit[];
}
export enum Court {
  IN = 'IN',
  FA = 'FA',
  CI = 'CI',
  FM = 'FM',
  CR = 'CR',
  ER = 'ER',
  AU = 'AU',
  EC = 'EC',
  UN = 'UN',
}
