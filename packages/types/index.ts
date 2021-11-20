import { JSONSchema4, JSONSchema7 } from 'json-schema';

export interface CofeTreeProperties extends Record<string, any> {}

export interface CofeTreeActions
  extends Array<{
    type: string;
    action: string;
    params?: string[];
  }> {}

export interface CofeTree {
  type: string;
  id: string;
  properties?: CofeTreeProperties;
  actions?: CofeTreeActions;
  parent?: CofeTree;
  children?: CofeTree[];
  createdAt?: number;
  updatedAt?: number;
}

export interface CofePage {
  id: string;
  title: string;
  description?: string;
  keywords?: string[];
  tree?: CofeTree;
  pages?: Record<CofePage['id'], CofePage>;
  state: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface CofeApp {
  id: string;
  title: string;
  description?: string;
  pages?: Record<CofePage['id'], CofePage>;
  state: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface CofeTemplate {
  id: string;
  type: string;
  template: CofeTree;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface CofeSchema {
  type: string;
  extends?: string[];
  isInline?: boolean;
  accept?: string[];
  properties?: JSONSchema4 & JSONSchema7;
  actions?: JSONSchema4 & JSONSchema7;
  children?: CofeSchema[];
  template?: CofeSchema;
}

export type CofeDndAdjacent = 'INSERT_BEFORE' | 'INSERT_AFTER';

export interface CofeDndIdentity {
  type: string;
  id?: string;
}

export interface CofeDndPayload {
  dragging: CofeDndIdentity['id'] | CofeTree;
  reference?: CofeDndIdentity['id'];
  container?: CofeDndIdentity['id'];
  adjacent: CofeDndAdjacent;
}
export interface CofeEditor {
  id?: string;
  stack?: CofeTree[];
  cursor?: number;
  mode?: 1 | 2 | 3;
}

export interface CofeRendererProps {
  isDesign?: boolean;
}

export interface CofeRenderer {
  (props: CofeRendererProps & Record<string, any>): JSX.Element;
}
