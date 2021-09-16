export interface CofeTreeNodeProperties extends Record<string, any> {}
export interface CofeTreeNodeActions extends Record<string, any> {}
export interface CofeTreeNodeEvents extends Record<string, any> {}

export interface CofeTree {
  id: string;
  type: string;
  title?: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
  properties?: CofeTreeNodeProperties;
  actions?: CofeTreeNodeActions;
  events?: CofeTreeNodeEvents;
  children?: CofeTree[];
}
