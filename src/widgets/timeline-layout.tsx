import { createEffect, createSignal, onCleanup } from "solid-js";
import { raf } from "shared/utils/raf";
import type { HandleLayoutChange } from "widgets/timeline";
import { getNumericPropertyValue } from "shared/utils/get-numeric-property-value";
import type {
  CreateTimeReturn,
  TimeBarItem,
  TrackItem,
} from "widgets/timeline/types";
import { TimelineMain } from "widgets/timeline/timeline-main";

interface Props {
  enableSticky: boolean;
  scrollToNow?: boolean;
  onLayoutChange: (props: HandleLayoutChange) => void;
  time: CreateTimeReturn;
  now: Date;
  sidebarWidth?: number;
  timelineViewportWidth: number;
  timebar: TimeBarItem[];
  tracks: TrackItem[];
  clickElement?: (any: any) => void;
}

export const TimelineLayout = ({
  enableSticky,
  scrollToNow,
  onLayoutChange,
  time,
  now,
  sidebarWidth,
  timelineViewportWidth,
  timebar,
  tracks,
  clickElement,
}: Props) => {
  let layoutRef: HTMLDivElement | undefined;
  let timelineRef: HTMLDivElement | undefined;
  let sidebarRef: HTMLDivElement | undefined;

  const [isSticky, setIsSticky] = createSignal(false);
  const [headerHeight, setHeaderHeight] = createSignal(0);
  const [scrollLeft, setScrollLeft] = createSignal(0);

  function updateTimelineHeaderScroll() {
    if (!timelineRef) return;
    const { scrollLeft } = timelineRef;
    setScrollLeft(scrollLeft);
  }

  function handleHeaderScrollY(scrollLeft: number) {
    raf(() => {
      setScrollLeft(scrollLeft);
    });
  }

  function updateTimelineBodyScroll() {
    if (!timelineRef) return;

    timelineRef.scrollLeft = scrollLeft();
  }

  function handleScrollX() {
    raf(updateTimelineHeaderScroll);
  }

  function handleScrollY() {
    raf(() => {
      const markerHeight = 0;
      if (!timelineRef) return;
      const { top, bottom } = timelineRef.getBoundingClientRect();
      const isSticky = top <= -markerHeight && bottom >= headerHeight();
      setIsSticky(isSticky);
    });
  }

  function wheelEvent(event: WheelEvent) {
    event.preventDefault();
    if (!timelineRef) return;
    timelineRef.scrollBy({
      left: event.deltaY < 0 ? -50 : 50,
    });
  }

  function calculateSidebarWidth() {
    if (!sidebarRef) return;
    if (!layoutRef) return;
    return (
      sidebarRef.offsetWidth + getNumericPropertyValue(layoutRef, "margin-left")
    );
  }

  function calculateTimelineViewportWidth() {
    if (!timelineRef) return;
    return timelineRef.offsetWidth;
  }

  function handleScrollToNow() {
    if (scrollToNow) {
      if (!timelineRef) return;
      timelineRef.scrollLeft = time.toX(now) - time.toX(now) / 6;
    }
  }

  function handleLayoutChange() {
    if (!timelineRef) return;
    const nextSidebarWidth = calculateSidebarWidth();
    const nextTimelineViewportWidth = calculateTimelineViewportWidth();
    if (
      nextSidebarWidth !== sidebarWidth ||
      nextTimelineViewportWidth !== timelineViewportWidth
    ) {
      onLayoutChange({
        sidebarWidth: calculateSidebarWidth() as number,
        timelineViewportWidth: calculateTimelineViewportWidth() as number,
      });
    }
  }

  createEffect(() => {
    if (enableSticky) {
      window.addEventListener("scroll", handleScrollY);
      updateTimelineHeaderScroll();
      updateTimelineBodyScroll();
    }
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScrollY);
  });

  createEffect(() => {
    if (!timelineRef) return;
    timelineRef.addEventListener("wheel", wheelEvent);
  });

  onCleanup(() => {
    if (!timelineRef) return;
    timelineRef.removeEventListener("wheel", wheelEvent);
  });

  createEffect(() => {
    window.addEventListener("resize", handleLayoutChange);
    handleScrollToNow();
  });

  onCleanup(() => {
    window.removeEventListener("resize", handleLayoutChange);
  });

  return (
    <div ref={layoutRef}>
      <div class="inline-block w-full align-top">
        <div
          class="scrollBar overflow-x-auto"
          ref={timelineRef}
          onScroll={isSticky() ? handleScrollX : undefined}
        >
          <TimelineMain
            now={now}
            time={time}
            timebar={timebar}
            tracks={tracks}
            sticky={{
              isSticky,
              setHeaderHeight: setHeaderHeight,
              viewportWidth: timelineViewportWidth,
              handleHeaderScrollY: handleHeaderScrollY,
              headerHeight,
              scrollLeft,
            }}
            clickElement={clickElement}
          />
        </div>
      </div>
    </div>
  );
};
