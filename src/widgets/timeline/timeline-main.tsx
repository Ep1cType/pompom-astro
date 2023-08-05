import type {
  CreateTimeReturn,
  StickyObject,
  TimeBarItem,
  TrackItem,
} from "widgets/timeline/types";
import { TimelineMarker } from "widgets/timeline/timeline-marker";
import { TimelineHeader } from "widgets/timeline/timeline-header";
import { getGrid } from "shared/utils/get-grid";
import { TimelineBody } from "widgets/timeline/timeline-body";

interface Props {
  now: Date;
  time: CreateTimeReturn;
  timebar: TimeBarItem[];
  tracks: TrackItem[];
  sticky: StickyObject;
  clickElement?: (any: any) => void;
}

export const TimelineMain = ({
  now,
  time,
  sticky,
  tracks,
  clickElement,
  timebar,
}: Props) => {
  const grid = getGrid(timebar);

  return (
    <div class="relative" style={{ width: time.timelineWidthStyle }}>
      {now && <TimelineMarker now={now} visible time={time} />}
      <TimelineHeader
        time={time}
        timebar={timebar}
        width={time.timelineWidthStyle}
        sticky={sticky}
      />
      <TimelineBody
        time={time}
        grid={grid}
        tracks={tracks}
        clickElement={clickElement}
      />
    </div>
  );
};
