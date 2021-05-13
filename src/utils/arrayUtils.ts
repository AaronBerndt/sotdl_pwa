export const sumArray = (array: any[]) => {
  return array.reduce(
    (previousValue: number, currentValue: number) =>
      currentValue + previousValue,
    0
  );
};

export function filterAndSum(
  array: any[],
  filterBy: string,
  filterKey: string
) {
  return array
    .filter((row) => row[filterKey] === filterBy)
    .map(({ value }) => value)
    .reduce(
      (previousValue: number, currentValue: number) =>
        currentValue + previousValue,
      0
    );
}
