import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import {
  DiceRollerProvider,
  useDiceRollerContext,
} from "../context/DiceRollerContext";
import useRollDice from "./useRollDice";

const wrapper = ({ children }: any) => (
  <DiceRollerProvider>{children}</DiceRollerProvider>
);

describe("useUpdateHealth test", () => {
  it(`Make Challenge Roll`, async () => {
    const { result } = renderHook(() => useRollDice(), { wrapper });

    act(() => {
      result.current.rollChallengeRoll("Test", 0, 0);
    });

    const { diceRollHistory } = useDiceRollerContext();

    expect(diceRollHistory).toBe([]);
  });
  it(`Make Attack Roll`, async () => {
    const { result } = renderHook(() => useRollDice(), { wrapper });

    act(() => {
      result.current.rollAttackRoll("Test", 10);
    });

    const { diceRollHistory } = useDiceRollerContext();

    expect(diceRollHistory).toBe([]);
  });
  it(`Make Fate Roll`, async () => {
    const { result } = renderHook(() => useRollDice(), { wrapper });

    act(() => {
      result.current.rollAttackRoll("Test", 10);
    });

    const { diceRollHistory } = useDiceRollerContext();

    expect(diceRollHistory).toBe([]);
  });
});
