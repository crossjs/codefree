import { ComponentProps } from 'react';

export const CofeIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M 0,3e-7 V 20 h 20 c -2e-6,-6 0,-14 0,-20 z M 3,3 H 9 V 9 H 3 Z m 8,3e-7 h 6 v 6 l -6,-2e-7 z M 3,11 h 14 v 6 H 3 Z"
    />
  </svg>
);
