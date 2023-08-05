import type { Accessor, JSX, Setter } from "solid-js";

export type CreateTimeReturn = {
  timelineWidth: number;
  timelineWidthStyle: string;
  // start: Date;
  start: any;
  // end: Date;
  end: any;
  zoom: number;
  toX: (num: Date) => number;
  toStyleLeft: (num: number) => { left: string };
  toStyleLeftAndWidth: (
    from: Date,
    to: Date,
  ) => { left: string; width: string };
  fromX: (num: number) => Date;
};

export interface TimeBarItem {
  id: string | number;
  title: JSX.Element;
  useAsGrid?: boolean;
  cells: TimeBarCell[];
  style: JSX.CSSProperties;
}

export interface TimeBarCell {
  id: string | number;
  title: JSX.Element;
  start: Date;
  end: Date;
}

export interface StickyObject {
  isSticky: Accessor<boolean>;
  headerHeight: Accessor<number>;
  sidebarWidth?: number;
  viewportWidth: number;
  handleHeaderScrollY: (num: number) => void;
  scrollLeft: Accessor<number>;
  setHeaderHeight: Setter<number>;
}

export interface TrackItem {
  id: string | number;
  start: Date;
  end: Date;
  title: JSX.Element;
  isOpen?: boolean;
  elements: TrackItem[];
  style: JSX.CSSProperties;
  tooltip?: string;
  dataSet?: JSX.HTMLAttributes<HTMLDivElement>;
  tracks?: TrackItem[];
}
