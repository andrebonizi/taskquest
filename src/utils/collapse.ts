import { isMobile } from "./device";

export function initialCollapse(container) {
  Object.assign(
    container.style,
    isMobile()
      ? { opacity: 0, height: "0px", padding: "0" }
      : { opacity: 1, height: container.style.height, padding: container.style.padding }
  );
}

export function collapse(event) {
  const {
    div: { style },
    height,
    padding
  } = event.detail;

  Object.assign(
    style,
    style.opacity === "0"
      ? { opacity: "1", height: height, padding: padding }
      : { opacity: "0", height: "0px", padding: "0px" }
  );
}