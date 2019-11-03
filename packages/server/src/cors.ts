console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.FRONTEND_HOST", process.env.FRONTEND_HOST);

export const cors = {
  credentials: true,
  origin:
    process.env.NODE_ENV === "test"
      ? "*"
      : (process.env.FRONTEND_HOST as string)
};
