import type {
  CreateTimeReturn,
  TimeBarCell,
  TrackItem,
} from "widgets/timeline/types";
import { TimelineElement } from "widgets/timeline/timeline-element";

interface TimelineBodyProps {
  time: CreateTimeReturn;
  tracks: TrackItem[];
  grid?: TimeBarCell[];
  clickElement?: (any: any) => void;
}

export const TimelineBody = ({
  time,
  grid,
  tracks,
  clickElement,
}: TimelineBodyProps) => {
  return (
    <div class="relative bg-white">
      {grid && <Grid time={time} grid={grid} />}
      <Tracks time={time} tracks={tracks} clickElement={clickElement} />
    </div>
  );
};

type GridProps = {
  time: CreateTimeReturn;
  grid: TimeBarCell[];
};

export const Grid = ({ time, grid }: GridProps) => {
  return (
    <div class="timeline_grid">
      {grid.map(({ id, start, end }) => (
        <div
          class="timeline_grid__cell z-[3] flex justify-center"
          style={time.toStyleLeftAndWidth(start, end)}
        ></div>
      ))}
    </div>
  );
};

interface TracksProps {
  tracks: TrackItem[];
  time: CreateTimeReturn;
  clickElement?: (any: any) => void;
}

export const Tracks = ({ time, tracks, clickElement }: TracksProps) => (
  <div>
    {tracks.map(({ id, elements, isOpen, tracks: children }) => (
      <Track
        time={time}
        elements={elements}
        isOpen={isOpen}
        tracks={children}
        clickElement={clickElement}
      />
    ))}
  </div>
);

interface TrackProps {
  time: CreateTimeReturn;
  tracks?: TrackItem[];
  clickElement?: (any: any) => void;
  elements: TrackItem[];
  isOpen?: boolean;
}

export const Track = ({
  time,
  elements,
  isOpen,
  tracks,
  clickElement,
}: TrackProps) => {
  return (
    <div>
      <div class="relative h-[70px] bg-blue-950">
        {elements
          .filter(({ start, end }) => end > start)
          .map((element) => (
            <TimelineElement
              time={time}
              clickElement={clickElement}
              {...element}
            />
          ))}
      </div>
      {isOpen && tracks && tracks.length > 0 && (
        <Tracks time={time} tracks={tracks} clickElement={clickElement} />
      )}
    </div>
  );
};
