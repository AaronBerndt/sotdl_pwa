import { Button } from "@material-ui/core";
import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import useRollDice from "../../hooks/useRollDice";
import AddDamageModal from "../../Molecules/AddDamageModal/AddDamageModal";
export type Props = {
  rollReason: string;
  damage: string;
};
export default function RollDamageButton({ rollReason, damage }: Props) {
  const { open, toggleOpen } = useToggle();
  const { rollDamageRoll } = useRollDice();

  const longPressEvent = useLongPress(
    () => toggleOpen(),
    () => rollDamageRoll(rollReason, damage, 0, 0),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  return (
    <>
      <Button {...longPressEvent}>{damage}</Button>
      <AddDamageModal
        open={open}
        rollReason={rollReason}
        damage={damage}
        toggleOpen={toggleOpen}
      />
    </>
  );
}
