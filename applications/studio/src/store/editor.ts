import { Tree } from '@cofe/core';
import { AnyAction } from '@cofe/store';
import { CofeDndPayload, CofeEditor, CofeTree } from '@cofe/types';
import { cloneDeep } from 'lodash';
import { filter } from 'unist-util-filter';
import { EXIT, visit } from 'unist-util-visit';

export interface EditorState extends CofeEditor {}

export const initialState: EditorState = {
  app_id: 0,
  page_id: 0,
  stack: [],
  cursor: 0,
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'EDIT':
      return {
        ...payload,
        cursor: 0,
      };

    case 'UNDO':
      if (state.cursor >= state.stack.length - 1) {
        return state;
      }

      return {
        ...state,
        cursor: state.cursor + 1,
      };

    case 'REDO':
      if (state.cursor <= 0) {
        return state;
      }

      return {
        ...state,
        cursor: state.cursor - 1,
      };

    case 'PUSH':
      return {
        ...state,
        stack: [payload].concat(state.stack),
        cursor: 0,
      };

    case 'DROPPING_NODE':
      return {
        ...state,
        stack: [
          insertOrMoveNodeByDnd(state.stack[state.cursor], payload),
        ].concat(state.stack.slice(state.cursor)),
        cursor: 0,
      };

    case 'DELETE_NODE':
      return {
        ...state,
        stack: [removeNodeById(state.stack[state.cursor], payload.id)].concat(
          state.stack.slice(state.cursor),
        ),
        cursor: 0,
      };

    case 'UPDATE_NODE':
      return {
        ...state,
        stack: [updateNode(state.stack[state.cursor], payload)].concat(
          state.stack.slice(state.cursor),
        ),
        cursor: 0,
      };

    default:
      return state;
  }
};

function removeNodeById(tree: CofeTree, id: string) {
  return Tree.create(
    filter(tree, { cascade: false }, (node: any) => id !== node.id) ??
      'fragment',
  );
}

function insertOrMoveNodeByDnd(
  tree: CofeTree,
  { dragging, container, reference, adjacent }: CofeDndPayload,
) {
  tree = cloneDeep(tree);

  let child: CofeTree;

  // 从现有树中拖动
  if (typeof dragging === 'string') {
    visit(tree, { id: dragging }, (node, index, parent: any) => {
      [child] = parent.children.splice(index, 1) as [CofeTree];

      return EXIT;
    });
  } else {
    child = dragging;
  }

  // 前插或后插
  if (adjacent && reference) {
    visit(tree, { id: reference }, (node, index, parent: any) => {
      parent.children.splice(
        adjacent === 'INSERT_BEFORE' ? index : index + 1,
        0,
        child,
      );

      return EXIT;
    });
  } else {
    visit(tree, { id: container }, (node, index, parent) => {
      if (!node.children) {
        node.children = [];
      }

      node.children = [...node.children, child];

      return EXIT;
    });
  }

  return Tree.create(tree);
}

function updateNode(tree: CofeTree, payload: Partial<CofeTree>) {
  tree = cloneDeep(tree);

  visit(tree, { id: payload.id }, (node, index, parent) => {
    ['properties', 'actions', 'events'].forEach((key) => {
      if (key in payload) {
        node[key] = { ...node[key], ...payload[key] };
      }
    });

    return EXIT;
  });

  return Tree.create(tree);
}
