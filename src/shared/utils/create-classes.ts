export const createClasses = (
  base: string,
  additional: string | string[] | undefined,
) => {
  if (!additional) {
    return base;
  }
  if (typeof additional === "string") {
    return `${base} ${additional}`;
  }
  return `${base} ${additional.join(" ")}`;
};
