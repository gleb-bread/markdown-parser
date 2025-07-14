import { AHandler } from "./SimbolHandlers/AHandler";

export type MarkdownElementTypes =
  | "font"
  | "headers"
  | "code"
  | "table"
  | "link"
  | "skip"
  | "unknown"
  | "img"
  | "numbered_list"
  | "bulleted_list";

export type MarkdownElementTargets =
  | "link_text"
  | "link_href"
  | "img_title"
  | "img_alt"
  | "img_href";

export type BasicMarkdownElement = {
  specSimbol: string;
  typeElement: MarkdownElementTypes;
  ignoreSpecSimbols: boolean;
  singlComponent: boolean;
  target?: MarkdownElementTargets;
  tag?: string;
  handlerWhenAllNull?: MarkdownElementTypes;
  endSimbol: string | null;
  class?: string;
  tagItem?: string;
};

export type BasicListMarkdownElement = {
  tag: string;
  endSimbol: string | null;
  class: string;
};

export type NumberedListMarkdownElement = BasicListMarkdownElement & {
  value: number;
};

export type MapBasicMarkdownElement = {
  [key: string]: BasicMarkdownElement;
};

export type MarkdownSpecsimbols = {
  [key: string]: MarkdownSpecsimbol;
};

export type MarkdownSpecsimbol = {
  isFullSpecsimbol: boolean;
  isEndSimbol: boolean;
  type: MarkdownElementTypes;
};

export type MapMarkdownSimbolHandlers = {
  [key: string]: AHandler;
};

export type HandlerResultText = {
  isEnd: number;
  text: string;
};
