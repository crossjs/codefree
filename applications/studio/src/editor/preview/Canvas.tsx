import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Renderer } from '@cofe/core';
import { CofeTree } from '@cofe/types';

interface NodeRendererProps extends CofeTree {}

export const NodeRenderer = ({
  type,
  id,
  properties,
  children,
}: NodeRendererProps) => {
  const R = Renderer.get(type);

  if (R) {
    return (
      <R key={id} id={id} {...properties}>
        {children?.map(NodeRenderer)}
      </R>
    );
  }

  return (
    <Box key={id} id={id}>
      未知节点
    </Box>
  );
};

interface PreviewCanvasProps extends BoxProps {
  tree: CofeTree;
}

export const PreviewCanvas = ({ tree, ...props }: PreviewCanvasProps) => {
  return (
    <Box {...props}>
      <NodeRenderer {...tree} />
    </Box>
  );
};

if (process.env.NODE_ENV === 'development') {
  PreviewCanvas.displayName = 'PreviewCanvas';
}
