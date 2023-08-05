import type { TimeBarItem } from "widgets/timeline/types";

export const getGrid = (timebar: TimeBarItem[]) =>
  (timebar.find((row) => row.useAsGrid) || {}).cells;
