import type { ImageFormatList } from "shared/api/types";

export const checkImageFormat = (formats: ImageFormatList) => {
  const keys = Object.keys(formats);

  if (keys.includes('large')) return 'large';
  if (keys.includes('medium')) return 'medium';
  if (keys.includes('small')) return 'small';
  else return 'thumbnail';
};