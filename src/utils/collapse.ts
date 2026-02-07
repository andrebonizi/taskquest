import type { SizeProp, collapseStyle } from '../interfaces/panel';

import { collapseStyleFactory } from './factories';

function isVisible(style: collapseStyle): boolean {
  return style.opacity !== '0';
}

function getStyle(
  container?: HTMLDivElement,
  style?: collapseStyle,
  targetHeight?: SizeProp,
  targetPadding?: SizeProp
): collapseStyle {
  if (!container) {
    return isVisible(style)
      ? collapseStyleFactory()
      : { opacity: 1, height: targetHeight, padding: targetPadding };
  }

  const { height, padding } = container.style;
  return { opacity: 1, height, padding } as collapseStyle;
}

export function initialCollapse(container: HTMLDivElement): void {
  Object.assign(container.style, getStyle(container));
}

export function collapse(event: CustomEvent): void {
  const {
    div: { style },
    height,
    padding,
  } = event.detail;

  Object.assign(style, getStyle(null, style, height, padding));
}
