import { TimelineLayout } from "widgets/timeline-layout";
import { createTime } from "shared/utils/time";
import { createSignal } from "solid-js";
import type {
  EventItem,
  ResponseDataItem,
  TrackElement,
} from "shared/api/types";

const UNKNOWN_WIDTH = -1;

const MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export type Scale = {
  start: Date; //PropTypes.instanceOf(Date)
  end: Date; //PropTypes.instanceOf(Date)
  zoom: number;
  zoomMin: number;
  zoomMax: number;
  minWidth?: number;
  viewportWidth?: number;
};

interface Props {
  eventList: any;
}

export interface HandleLayoutChange {
  timelineViewportWidth: number;
  sidebarWidth: number;
  callback?: any;
}

const now = new Date();

function createTask(eventList: ResponseDataItem<EventItem>[]) {
  return [...new Set(eventList.map((event) => event.attributes.type))].map(
    (item, index) => ({
      id: `track-${index + 1}`,
      title: item,
      elements: eventList
        .filter((s) => s.attributes.type === item)
        .map((t, ind) => ({
          id: `t-${index + 1}-el-${ind + 1}`,
          title: t.attributes.name,
          start: new Date(t.attributes.start_date),
          end: new Date(t.attributes.end_date),
          style: {
            "background-color": t.attributes.color,
            "border-radius": "13px",
            "box-shadow": "1px 1px 0px rgba(0, 0, 0, 0.25)",
            color: "#000000",
            "text-transform": "capitalize",
          },
          image: t.attributes.image.data?.attributes,
          link: t.attributes.link,
        })),
      isOpen: false,
    }),
  );
}

const currentDate = new Date();

const zoom = 30;
const MIN_ZOOM = 2;
const MAX_ZOOM = 50;

const clickElement = (element: TrackElement) => {
  alert(element);
};

export const Timeline = ({ eventList }: Props) => {
  const startDate = subtractMonths(currentDate, 3);
  const endDate = subtractMonths(currentDate, -3);
  const firstDayOfMonth = getFirstDayOfMonth(subtractMonths(currentDate, 3));
  const lastDayOfMonth = getLastDayOfMonth(subtractMonths(currentDate, -3));
  const dateRange = getDatesInRange(firstDayOfMonth, lastDayOfMonth);
  const daysRange = getDaysInRange(firstDayOfMonth, getLastDayOfMonth(endDate));

  console.log(getLastDayOfMonth(endDate));

  const scale = {
    start: startDate,
    end: endDate,
    zoom,
    zoomMin: MIN_ZOOM,
    zoomMax: MAX_ZOOM,
  };

  const [timelineViewportWidth, setTimelineViewportWidth] =
    createSignal(UNKNOWN_WIDTH);
  const [tracks, setTracks] = createSignal(createTask(eventList));
  const [sidebarWidth, setSidebarWidth] = createSignal(UNKNOWN_WIDTH);
  const [time, setTime] = createSignal(
    createTime({ ...scale, viewportWidth: timelineViewportWidth() }),
  );

  function handleLayoutChange({
    timelineViewportWidth,
    sidebarWidth,
    callback,
  }: HandleLayoutChange) {
    const time = createTime({ ...scale, viewportWidth: timelineViewportWidth });
    setTime(time);
    setTimelineViewportWidth(timelineViewportWidth);
    setSidebarWidth(sidebarWidth);
    callback();
  }

  const buildTimebar = () => [
    {
      id: "months",
      title: "Months",
      cells: buildMonthsCells(dateRange),
      useAsGrid: false,
      style: {},
    },
    {
      id: "days",
      title: "Days",
      cells: buildDaysCells(daysRange),
      useAsGrid: true,
      style: {},
    },
  ];

  return (
    <div class="relative z-[1] text-four-from">
      <TimelineLayout
        onLayoutChange={handleLayoutChange}
        now={now}
        time={time()}
        timelineViewportWidth={timelineViewportWidth()}
        sidebarWidth={sidebarWidth()}
        scrollToNow
        enableSticky
        tracks={tracks() as any}
        clickElement={clickElement}
        timebar={buildTimebar()}
      />
    </div>
  );
};

function buildMonthsCells(dateRange: Date[]) {
  return dateRange.map((date, index) => ({
    id: `m${index}`,
    title: MONTH_NAMES[date.getMonth() % 12],
    start: getFirstDayOfMonth(date),
    end: getMonthDate(date.getFullYear(), date.getMonth() + 1),
  }));
}

const buildDaysCells = (dateRange: Date[]) => {
  return dateRange.map((item, index) => {
    return {
      id: `d${item.getMonth()}${index}`,
      title: item.getDate(),
      start: item,
      end: new Date(item.getFullYear(), item.getMonth(), item.getDate() + 1, 0),
    };
  });
};

function getMonthDate(year: number, month: number) {
  return new Date(year, month);
}

function subtractMonths(currentDate: Date, month: number) {
  const newDate = new Date(currentDate);
  newDate.setMonth(newDate.getMonth() - month);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function getFirstDayOfMonth(date: Date) {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth(), 1);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function getLastDayOfMonth(date: Date) {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1, 0);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function getDatesInRange(startDate: Date, endDate: Date) {
  const date = new Date(startDate.getTime());

  const datesList = [];

  while (date <= endDate) {
    // datesList.push(new Date(date));
    const dateObject = {
      year: new Date(date).getFullYear(),
      month: new Date(date).getMonth(),
    };
    datesList.push(dateObject);
    date.setDate(date.getDate() + 1);
  }

  return datesList
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.year === value.year && t.month === value.month),
    )
    .map((item) => new Date(item.year, item.month));
}

function getDaysInRange(startDate: Date, endDate: Date) {
  const date = new Date(startDate.getTime());
  const datesList = [];

  while (date <= endDate) {
    datesList.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return datesList;
}
