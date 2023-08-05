import type {
  CreateTimeReturn,
  StickyObject,
  TimeBarItem,
} from "widgets/timeline/types";
import type { JSX } from "solid-js";
import { createEffect, onMount, on } from "solid-js";
import { TimelineBar } from "widgets/timeline/timeline-bar";

interface Props {
  time: CreateTimeReturn;
  timebar: TimeBarItem[];
  width: string;
  sticky: StickyObject;
}

export const TimelineHeader = ({ timebar, sticky, width, time }: Props) => {
  let scrollRef: HTMLDivElement | undefined;
  let timebarRef: HTMLDivElement | undefined;

  const {
    isSticky,
    headerHeight,
    viewportWidth,
    handleHeaderScrollY,
    sidebarWidth,
    scrollLeft,
    setHeaderHeight,
  } = sticky;

  function handleScroll() {
    if (!scrollRef) return;
    handleHeaderScrollY(scrollRef.scrollLeft);
  }

  onMount(() => {
    if (!timebarRef) return;
    setHeaderHeight(timebarRef.offsetHeight);
  });

  onMount(() => {
    if (!scrollRef) return;
    if (isSticky()) {
      scrollRef.scrollLeft = scrollLeft();
    }
  });

  createEffect(() => {
    on([isSticky, scrollLeft], () => {
      if (!scrollRef) return;
      scrollRef.scrollLeft = scrollLeft();
    });
  });

  return (
    <div style={isSticky() ? { "padding-top": `${headerHeight()}px` } : {}}>
      <div
        style={
          isSticky()
            ? { width: `${viewportWidth}px`, height: `${headerHeight}px` }
            : {}
        }
      >
        <div ref={scrollRef} onScroll={isSticky() ? handleScroll : undefined}>
          <div ref={timebarRef} style={isSticky() ? { width } : {}}>
            <TimelineBar time={time} rows={timebar} />
          </div>
        </div>
      </div>
    </div>
  );
};
