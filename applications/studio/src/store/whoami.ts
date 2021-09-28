import { AnyAction } from '@cofe/store';
import { CofeWhoami } from '@cofe/types';

export const initialState: Partial<CofeWhoami> = {
  config: {
    editMode: true,
  },
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'CLEAR_LOGIN':
      return {
        config: {},
      };

    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        config: {
          ...state.config,
          editMode: !state.config.editMode,
        },
      };

    default:
      return state;
  }
};
