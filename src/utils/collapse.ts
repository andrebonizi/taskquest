import { isMobile } from "./device";

export function initialCollapse(container) {
  Object.assign(
    container.style,
    isMobile()
      ? { opacity: 0, height: "0px", padding: "0px" }
      : { opacity: 1, height: "200px", padding: "20px" }
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