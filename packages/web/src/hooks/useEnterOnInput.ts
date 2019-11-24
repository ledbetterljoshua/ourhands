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
