import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useStore } from '../../store';

interface RootAtomProps extends BoxProps {}

export const RootAtom = (props: RootAtomProps) => {
  const isEditorMode = useStore<boolean>('config.editMode');

  return (
    <Box
      _empty={
        isEditorMode
          ? {
              '&:before': {
                content: '"Root"',
                color: 'gray.400',
                height: 'calc(100%)',
              },
            }
          : null
      }
      {...props}
    />
  );
};
