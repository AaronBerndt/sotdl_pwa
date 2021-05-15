import { Button } from "@material-ui/core";
import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { Weapon } from "../../CharacterSheetPageTypes";
import useRollDice from "../../hooks/useRollDice";
export type Props = {
  weapon: Weapon;
};
export default function RollDamageButton({ weapon }: Props) {
  const { open, toggleOpen } = useToggle();
  const { rollDamageRoll } = useRollDice();

  const { name, damage } = weapon;
  const longPressEvent = useLongPress(
    () => toggleOpen(),
    () => rollDamageRoll(name, damage, 0),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  return (
    <>
      <Button {...longPressEvent}>{damage}</Button>
    </>
  );
}
