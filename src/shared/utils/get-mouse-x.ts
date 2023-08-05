import type { JSX } from "solid-js";

export const getMouseX = (event: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>) => {
  const target = event.currentTarget;
  const bounds = target.getBoundingClientRect();
  return event.clientX - bounds.left;
};
