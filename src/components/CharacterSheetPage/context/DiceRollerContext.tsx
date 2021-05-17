import { createContext, useContext, useState } from "react";
import { DiceRoll } from "../CharacterSheetPageTypes";

type DiceRoller = {
  diceRollResult: DiceRoll | null;
  updateDiceResult: Function;
  clearDiceResult: Function;
};

const DiceRollerContext = createContext<DiceRoller>({
  diceRollResult: null,
  updateDiceResult: Function,
  clearDiceResult: Function,
});

export function DiceRollerProvider({ children }: any) {
  const [diceRollResult, setDiceRollResult] = useState<DiceRoll | null>(null);

  const updateDiceResult = (result: DiceRoll) => {
    setDiceRollResult(result);
  };

  const clearDiceResult = () => setDiceRollResult(null);

  return (
    <DiceRollerContext.Provider
      value={{
        diceRollResult,
        updateDiceResult,
        clearDiceResult,
      }}
    >
      {children}
    </DiceRollerContext.Provider>
  );
}

export function useDiceRollerContext() {
  return useContext(DiceRollerContext);
}
