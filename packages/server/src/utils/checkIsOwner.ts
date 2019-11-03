export const checkIsOwner = (el: any, _: any, { viewer }: any) => {
  if (!viewer || !el) return false;
  if (!el.owner) return false;
  const isOwner = el.owner.id === viewer.id;
  return isOwner;
};
