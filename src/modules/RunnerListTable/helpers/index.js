export const getRemMultiplier = (width) => {
  if (width >= 768 && width < 1400) {
    return 15;
  } else if (width >= 1400 && width < 1600) {
    return 16;
  } else if (width >= 1600 && width < 2000) {
    return 18;
  } else if (width >= 2000) {
    return 20;
  }
  return 14;
};
