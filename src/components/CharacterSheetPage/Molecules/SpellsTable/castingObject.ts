export const castings = {
  0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  1: [0, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3],
  2: [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3],
  3: [0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3],
  4: [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 3],
  5: [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2],
  6: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  7: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  8: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
};

const createCastingObject = (power: number) => {
  return Object.assign(
    {},
    ...Object.entries(castings).map((entry) => {
      const [key, value] = entry;

      return key === "0"
        ? { [key]: value[power === 0 ? 0 : power] }
        : { [key]: value[power] };
    })
  );
};

export default createCastingObject;


