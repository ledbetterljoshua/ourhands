export type colorType = "dark" | "body" | "light" | "active" | "white";
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
  | "body";

export const colors = {
  dark: "#1c1e21",
  body: "#5E5E5E",
  light: "#969696",
  active: "#2078f4",
  white: "#fff"
};

export const weights = {
  regular: 400,
  medium: 500,
  bold: 700
};

const base = () => {
  return `
    font-smoothing: antialiased;
    font-family: 'Roboto', 'Helvetica Neue Light', 'HelveticaNeue-Light', 'Helvetica Neue', Helvetica, Arial, Sans-Serif;
    margin: 0;
    `;
};

const getSize = (
  size: number,
  spacing: number,
  color: colorType = "body",
  weight: weightType = "regular"
) => {
  return `
    ${base()}
    font-size: ${size}rem;
    letter-spacing: ${spacing / size}rem;
    color: ${colors[color]};
    font-weight: ${weights[weight]};
  `;
};

export const getTypography = (
  size: textType = "body",
  color: colorType = "body",
  weight: weightType = "regular"
) => {
  switch (size) {
    case "h1": {
      return getSize(9.6, -1.5, color, weight);
    }
    case "h2": {
      return getSize(6, -0.5, color, weight);
    }
    case "h3": {
      return getSize(4.8, 0, color, weight);
    }
    case "h4": {
      return getSize(3.4, 0.25, color, weight);
    }
    case "h5": {
      return getSize(2.4, 0, color, weight);
    }
    case "h6": {
      return getSize(2, 0.15, color, weight);
    }
    case "subtitle": {
      return getSize(1.6, 0.15, color, weight);
    }
    case "subtitle2": {
      return getSize(1.4, 0.1, color, weight);
    }
    case "button-text": {
      return `${getSize(
        1.4,
        0.1
      )} text-align: center; font-weight: bold;, color`;
    }
    case "link": {
      return getSize(1.4, 0.1, color, weight);
    }
    case "caption": {
      return getSize(1.2, 0.1, color, weight);
    }
    case "overline": {
      return getSize(1, 0, color, weight);
    }
    case "p":
    case "body":
    default:
      return getSize(1.6, 0, color, weight);
  }
};
