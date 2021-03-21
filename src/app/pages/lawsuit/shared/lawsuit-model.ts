import { Company } from "src/app/common/services/authentication/auth.models";
import { Client } from "../../clients/shared/clients-model";
import { Locker } from "../../lockers/shared/locker.model";

export interface LawSuitPost {
  id?: number;
  created_at?: string;
  updated_at?: string;
  district: string;
  court: Court;
  code_number: string;
  descriptor: string;
  observation: string;
  identifier: string;
  client: number;
  locker: number;
  company: number;
  status: string;
  type: string;
}

export interface LawSuit {
  id?: number;
  created_at?: string;
  updated_at?: string;
  district: string;
  court: Court;
  code_number: string;
  descriptor: string;
  observation: string;
  identifier: string;
  client: Client;
  locker: Locker;
  company: Company;
  status: string;
  type: string;
}
export interface SelectView {
  label: string;
  value: string;
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
export interface DistrictGroup {
  state: string;
  districts: string[];
}
export const LAWSUITMASK = "0000000-00.0000.0.00.0000"