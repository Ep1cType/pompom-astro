import type { Scale } from "widgets/timeline";

const MILLIS_IN_A_DAY = 24 * 60 * 60 * 1000;

type Props = {
  start: number;
  end: number;
  zoom: number;
  viewportWidth: number;
  minWidth?: number;
};

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

export const createTime = ({
  start,
  end,
  zoom,
  viewportWidth = 0,
  minWidth = 0,
}: Scale): CreateTimeReturn => {
  // @ts-ignore
  const duration = end - start;

  const days = duration / MILLIS_IN_A_DAY;
  const daysZoomWidth = days * zoom;

  let timelineWidth: any;

  if (daysZoomWidth > viewportWidth) {
    timelineWidth = daysZoomWidth;
  } else {
    timelineWidth = viewportWidth;
  }

  if (timelineWidth < minWidth) {
    timelineWidth = minWidth;
  }

  const timelineWidthStyle = `${timelineWidth}px`;

  const toX = (from: any) => {
    // @ts-ignore
    const value = (from - start) / duration;
    return Math.round(value * timelineWidth);
  };
  // @ts-ignore
  const toStyleLeft = (from) => ({
    left: `${toX(from)}px`,
  });

  const toStyleLeftAndWidth = (from: Date, to: Date) => {
    const left = toX(from);
    return {
      left: `${left}px`,
      width: `${toX(to) - left}px`,
    };
  };
  // @ts-ignore
  const fromX = (x) =>
    new Date(start.getTime() + (x / timelineWidth) * duration);

  return {
    timelineWidth,
    timelineWidthStyle,
    start,
    end,
    zoom,
    toX,
    toStyleLeft,
    toStyleLeftAndWidth,
    fromX,
  };
};
