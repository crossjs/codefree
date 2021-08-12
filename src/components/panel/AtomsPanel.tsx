import React from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Flex,
  List,
  ListIcon,
  ListItem,
  Tag,
  TagProps,
} from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { useDrag } from '../../hooks/useDrag';
import { models } from '../../models';
import { Pane } from '../layout/Pane';

interface AtomDragProps extends TagProps {
  type: string;
}

const AtomDrag = ({
  type,
  children = capitalize(type),
  ...props
}: AtomDragProps) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    effectAllowed: 'copy',
  });

  return (
    <ListItem>
      <ListIcon as={ArrowForwardIcon} />
      <Tag ref={drag} cursor="move" opacity={isDragging ? 0.5 : 1} {...props}>
        {children}
      </Tag>
    </ListItem>
  );
};

export const AtomsPanel = () => {
  return (
    <Pane heading="Atoms">
      <List as={Flex} flexDirection="column" gridGap={2}>
        {Object.keys(models).map((type) => {
          return <AtomDrag key={type} type={type} />;
        })}
      </List>
    </Pane>
  );
};
