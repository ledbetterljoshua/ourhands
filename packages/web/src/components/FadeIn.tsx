import posed from "react-pose";

export const FadeIn = posed.div({
  enter: {
    opacity: 1
  },
  exit: { opacity: 0 }
});
