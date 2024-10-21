import { collapseStyle } from '../interfaces/panel';
import { EXPAND_HEIGHT, EXPAND_PADDING } from './constants';

export const taskFactory = () => ({ code: 0, text: '', done: false, level: 1 });

export const expandStyleFactory = (div: HTMLDivElement) => ({
  div,
  height: EXPAND_HEIGHT,
  padding: EXPAND_PADDING,
});

export function collapseStyleFactory(): collapseStyle {
  return { opacity: 0, height: '0px', padding: 0 };
}
