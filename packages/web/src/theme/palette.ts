import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

//   dark: "#1c1e21",
//   body: "#5E5E5E",
//   light: "#969696",
//   active: "#2078f4",
//   white: "#fff",
//   danger: "#ce1126"

export default {
  black,
  white,
  primary: {
    contrastText: white,
    main: "#2078f4"
  },
  secondary: {
    contrastText: white,
    main: black
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: white,
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
