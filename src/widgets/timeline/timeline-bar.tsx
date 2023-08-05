import type {
  CreateTimeReturn,
  TimeBarCell,
  TimeBarItem,
} from "widgets/timeline/types";
import type { JSX } from "solid-js";

interface TimebarProps {
  rows: TimeBarItem[];
  time: CreateTimeReturn;
}

export const TimelineBar = ({ time, rows }: TimebarProps) => (
  <div class="bg-transparent">
    {rows.map(({ id, title, cells, style }) => (
      <Row time={time} cells={cells} style={style} />
    ))}
  </div>
);

interface RowProps {
  time: CreateTimeReturn;
  cells: TimeBarCell[];
  style: JSX.CSSProperties;
}

const Row = ({ time, cells, style }: RowProps) => {
  return (
    // <div className="relative overflow-hidden h-[25px] rt-timebar__row" style={style}>
    <div class="relative h-[25px]" style={style}>
      {cells.map((cell) => (
        <Cell time={time} {...cell} />
      ))}
    </div>
  );
};

interface CellProps extends TimeBarCell {
  time: CreateTimeReturn;
}

const Cell = ({ time, ...props }: CellProps) => {
  if (props.id.toString().includes("m")) {
    return (
      <div
        class="absolute border-l px-2.5 text-white"
        style={time.toStyleLeftAndWidth(props.start, props.end)}
      >
        <span class="sticky left-2.5">{props.title}</span>
      </div>
    );
  }

  return (
    <div
      class="absolute border-l border-l-transparent text-center text-white"
      style={time.toStyleLeftAndWidth(props.start, props.end)}
    >
      <span class="sticky left-0">{props.title}</span>
    </div>
  );
};
