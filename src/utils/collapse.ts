import type { SizeProp, collapseStyle } from "../interfaces/panel";

import { isMobile } from "./device";

function isExpanded(style: collapseStyle): boolean {
  return style.opacity !== "0";
}

function collapseStyleFactory() {
  return { opacity: 0, height: "0px", padding: 0 };
}

function getStyle(
  container: HTMLDivElement,
  style?: collapseStyle,
  targetHeight?: SizeProp,
  targetPadding?: SizeProp
): collapseStyle {
  if (!container) {
    return isExpanded(style)
      ? collapseStyleFactory()
      : { opacity: 1, height: targetHeight, padding: targetPadding };
  }

  const { height, padding } = container.style;
  return isMobile() ? collapseStyleFactory() : { opacity: 1, height, padding };
}

export function initialCollapse(container): void {
  Object.assign(container.style, getStyle(container));
}

export function collapse(event) {
  const {
    div: { style },
    height,
    padding,
  } = event.detail;

  Object.assign(style, getStyle(null, style, height, padding));
}
