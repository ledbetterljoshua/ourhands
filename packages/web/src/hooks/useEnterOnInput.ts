import { useEffect } from "react";

export const useEnterOnInput = (input: any, submit: any) => {
  useEffect(() => {
    const onSubmit = async (e: any) => {
      if (e.key === "Enter") {
        submit(e);
      }
    };
    if (input.current) {
      (input!.current as any).onkeyup = onSubmit;
    }
  }, [input, submit]);
};

export const ENTER = "Enter";
export const BACKSPACE = "Backspace";

export const useEventOnInput = (input: any, { onBackspace, onEnter }: any) => {
  useEffect(() => {
    const onSubmit = async (e: any) => {
      if (e.key === BACKSPACE) {
        onBackspace && onBackspace(e);
      }
      if (e.key === ENTER) {
        onEnter && onEnter(e);
      }
    };
    if (input.current) {
      const current = input!.current as any;
      current.onkeyup = onSubmit;
    }
  }, [input, onEnter, onBackspace]);
};
