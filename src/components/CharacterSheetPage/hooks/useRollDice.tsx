export default function useRollDice() {
  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1;
    return result;
  };

  /* const rollMutipleDice = (type: string, amount: number) => */
  /*   [...Array(amount).keys()].map(() => rollDice(type === "d6" ? 6 : 3)); */

  return {
    rollDice,
  };
}
