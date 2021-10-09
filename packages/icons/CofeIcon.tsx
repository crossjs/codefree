import { ComponentProps } from 'react';

export const CofeIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M 2,2 V 22 H 22 C 22,16 22,8 22,2 Z m 3,3 h 6 v 6 H 5 Z m 8,3e-7 h 6 V 11 H 13 Z M 5,13 h 14 v 6 H 5 Z"
    />
  </svg>
);
