export type TypographyState = {
  text: string;
  style: Partial<{
    fontSize: number;
    fontStyle: string;
    fontFamily: string;
    align: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
  }>;
};

export type TypographyAction =
  | { type: "SET_STYLE"; style: TypographyState["style"] }
  | { type: "SET_TEXT"; text: TypographyState["text"] };
