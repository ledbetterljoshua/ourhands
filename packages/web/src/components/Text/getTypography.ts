export type colorType =
  | "dark"
  | "body"
  | "light"
  | "active"
  | "white"
  | "danger";
export type weightType = "regular" | "medium" | "bold";
export type textType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "subtitle2"
  | "button-text"
  | "link"
  | "caption"
  | "overline"
  | "p"
  | "document"
  | "body";

export const colors = {
  dark: "#1c1e21",
  body: "#5E5E5E",
  light: "#969696",
  active: "#2078f4",
  white: "#fff",
  danger: "#ce1126"
};

export const weights = {
  regular: 400,
  medium: 500,
  bold: 700
};

type FontType = "serif" | "sans-serif";
type family = FontType;

const base = (fontFamily: FontType) => {
  return `
    font-smoothing: antialiased;
    font-family: ${
      fontFamily === "serif"
        ? 'Merriweather,Georgia,Cambria,"Times New Roman",Times,serif'
        : "Roboto"
    }, 'Helvetica Neue Light', 'HelveticaNeue-Light', 'Helvetica Neue', Helvetica, Arial, Sans-Serif;
    margin: 0;
    `;
};

const initBase = (
  fontFamily: FontType = "sans-serif",
  color: colorType = "body",
  weight: weightType = "regular"
) => (size: number, spacing: number) => {
  return `
    ${base(fontFamily)}
    font-size: ${size}rem;
    letter-spacing: ${spacing / size}rem;
    line-height: 150%;
    color: ${colors[color]};
    font-weight: ${weights[weight]};
  `;
};

export const getTypography = (
  family: FontType,
  size: textType = "body",
  color: colorType = "dark",
  weight: weightType = "regular"
) => {
  const getSize = initBase(family, color, weight);

  switch (size) {
    case "h1": {
      return getSize(9.6, -1.5);
    }
    case "h2": {
      return getSize(6, -0.5);
    }
    case "h3": {
      return getSize(4.8, 0);
    }
    case "h4": {
      return getSize(3.4, 0.25);
    }
    case "h5": {
      return getSize(2.4, 0);
    }
    case "h6": {
      return getSize(2, 0.15);
    }
    case "subtitle": {
      return getSize(1.6, 0);
    }
    case "subtitle2": {
      return getSize(1.4, 0.1);
    }
    case "button-text": {
      return `${getSize(1.6, 0.1)} 
      text-align: center; 
      font-weight: bold;
      `;
    }
    case "link": {
      return getSize(1.4, 0.1);
    }
    case "caption": {
      return getSize(1.2, 0.1);
    }
    case "overline": {
      return getSize(1, 0);
    }
    case "document": {
      return getSize(2.2, 0);
    }
    case "p":
    case "body":
    default:
      return getSize(1.6, 0);
  }
};
