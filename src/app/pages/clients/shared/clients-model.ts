import { LawSuit } from '../../lawsuit/shared/lawsuit-model';

export interface Client {
  id?: number;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  social_number: string;
  observation?: string;
  company?: number;
  lawsuits?: LawSuit[];
}
