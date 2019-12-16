export const checkIsOwner = (el: any, _: any, { viewer }: any) => {
  if (!viewer || !el) return false;
  if (!el.owner && !el.ownerId) return false;
  const ownerId = (el.owner && el.owner.id) || el.ownerId;
  const isOwner = ownerId === viewer.id;
  return isOwner;
};
