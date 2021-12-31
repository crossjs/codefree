import { CofeAtom } from '@cofe/types';
import { FragmentRenderer } from './renderers/Fragment';

export const fragment: CofeAtom = {
  type: 'fragment',
  accept: ['*'],
  icon: 'M 3.9921875,6 C 3.4426967,6 3,6.4374357 3,6.9804688 V 11.5 h 1 v -4 C 4,7.223 4.223,7 4.5,7 h 7 V 6 Z M 12.5,6 v 1 h 7 C 19.777,7 20,7.223 20,7.5 v 4 h 1 V 6.9804688 C 21,6.4374357 20.557303,6 20.007812,6 Z M 3,12.5 v 4.519531 C 3,17.562564 3.4426967,18 3.9921875,18 H 11.5 v -1 h -7 C 4.223,17 4,16.777 4,16.5 v -4 z m 17,0 v 4 c 0,0.277 -0.223,0.5 -0.5,0.5 h -7 v 1 h 7.507812 C 20.557303,18 21,17.562564 21,17.019531 V 12.5 Z',
  renderer: FragmentRenderer,
};
