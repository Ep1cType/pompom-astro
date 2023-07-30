export interface MetaDataResponse {
  pagination: PaginationDataResponse;
}

export interface LocaleParams {
  locale?: string;
}

export interface PaginationDataResponse {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface ResponseDataItem<T> {
  id: number;
  attributes: T;
}

export interface ApiCollectionResponse<Y> {
  data: ResponseDataItem<Y>[];
  meta: MetaDataResponse;
}

export interface ApiSingleResponse<Y> {
  data: ResponseDataItem<Y>;
  meta: {};
}

export interface CreateBody<T> {
  data: T;
}

export interface ImageDataResponse {
  name: string;
  alternativeText: string;
  caption: null;
  width: number;
  height: number;
  formats: ImageFormatList;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

export type ImageFormatList = {
  large: ThumbnailFormat;
  medium: ThumbnailFormat;
  small: ThumbnailFormat;
  thumbnail: ThumbnailFormat;
};

export interface ThumbnailFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
}
