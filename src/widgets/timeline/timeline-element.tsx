import type { CreateTimeReturn, TrackItem } from "widgets/timeline/types";
import type { JSX } from "solid-js";
import type { ImageDataResponse } from "shared/api/types";
import { createClasses } from "shared/utils/create-classes";

interface Props extends TrackItem {
  time: CreateTimeReturn;
  clickElement?: (any: any) => void;
  tooltip?: string;
  classes?: string[];
  dataSet?: JSX.HTMLAttributes<HTMLDivElement>;
  image?: ImageDataResponse;
  link?: string;
}

export const TimelineElement = (props: Props) => {
  const {
    time,
    style,
    title,
    start,
    end,
    classes,
    dataSet,
    tooltip,
    clickElement,
    image,
    link,
  } = props;
  const handleClick = () => {
    if (clickElement) {
      clickElement(props);
    }
  };

  const elementStyle = {
    ...time.toStyleLeftAndWidth(start, end),
    ...(clickElement ? { cursor: "pointer" } : {}),
  };

  return (
    <div
      class="absolute top-[10px] z-10 h-[40px] cursor-pointer"
      style={elementStyle}
      onClick={clickElement ? handleClick : undefined}
    >
      <BasicElement
        title={title}
        start={start}
        end={end}
        style={style}
        classes={classes}
        dataSet={dataSet}
        tooltip={tooltip}
        image={image}
        link={link}
      />
    </div>
  );
};

const buildDataAttributes = (
  attributes: JSX.HTMLAttributes<HTMLDivElement> = {},
) => {
  const value: JSX.HTMLAttributes<HTMLDivElement> = {};
  Object.keys(attributes).forEach((name) => {
    // @ts-ignore
    value[`data-${name}`] = attributes[name];
  });
  return value;
};

interface BasicElementProps {
  title: JSX.Element;
  start: Date;
  end: Date;
  style: JSX.CSSProperties;
  classes?: string[];
  dataSet?: JSX.HTMLAttributes<HTMLDivElement>;
  tooltip?: string;
  image?: ImageDataResponse;
  link?: string;
}

export const BasicElement = ({
  title,
  start,
  end,
  style,
  classes,
  dataSet,
  tooltip,
  image,
  link,
}: BasicElementProps) => {
  return (
    <div
      class={createClasses(
        "rt-element group relative h-[40px] bg-orange-500 text-center leading-[40px] text-white",
        classes,
      )}
      style={{ ...style }}
      {...buildDataAttributes(dataSet)}
    >
      <div
        class="text-ellipsis whitespace-nowrap px-[10px] text-start"
        aria-hidden="true"
      >
        <span
          style={{
            "text-shadow": `${style?.[
              "background-color"
            ]} -1px -1px 4px,${style?.["background-color"]} 1px -1px 4px,${
              style?.["background-color"] as string
            } -1px 1px 4px,${
              style?.["background-color"] as string
            } 1px 1px 4px,${style?.["background-color"] as string} 0 0 10px`,
          }}
          class="sticky left-[10px] z-10 whitespace-nowrap text-base font-bold md:text-lg"
        >
          {title}
        </span>
      </div>
      <div class="timeline_cell__image absolute bottom-0 right-0 top-0 w-[30%] max-w-[20%] overflow-hidden rounded-r-[13px]">
        {image && (
          <img
            class="h-full w-full scale-150 object-cover"
            src={`https://api.pom-pom.pro${image?.url}`}
            width={image?.width}
            height={image?.height}
            alt={image?.name}
          />
        )}
      </div>
    </div>
  );
};
