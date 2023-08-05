import type { CreateTimeReturn } from "widgets/timeline/types";
import type { JSX } from "solid-js";
import { getDayMonth } from "shared/utils/format-date";

interface TimelineMarkerProps {
  time: CreateTimeReturn;
  now: Date;
  visible: boolean;
}

export const TimelineMarker = ({ visible, now, time }: TimelineMarkerProps) => {
  return (
    <Marker modifier="now" x={time.toX(now)} visible={visible}>
      <div>
        <div>Сегодня</div>
        <strong>{getDayMonth(now as unknown as Date)}</strong>
      </div>
    </Marker>
  );
};

interface MarkerProps {
  children: JSX.Element;
  modifier: "now" | "pointer";
  x: number;
  visible: boolean;
}

const Marker = ({ x, modifier, children, visible }: MarkerProps) => (
  <div
    classList={{
      timeline_marker__visible: visible,
    }}
    class={`timeline_marker rt-marker--${modifier}`}
    style={{ left: `${x}px` }}
  >
    <div class="timeline_marker__label">
      <div class="timeline_marker__content">{children}</div>
    </div>
  </div>
);
