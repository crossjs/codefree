import { CofeTree } from '../tree';

export interface CofeDbTemplate {
  id: number;
  user_id: string;
  type: string;
  template: CofeTree;
  description?: string;
  created_at: string;
  updated_at: string;
}
