import { computedStyle } from "shared/utils/computed-style";

export const getNumericPropertyValue = (node: HTMLDivElement, prop: string) =>
  parseInt(computedStyle(node).getPropertyValue(prop), 10);
