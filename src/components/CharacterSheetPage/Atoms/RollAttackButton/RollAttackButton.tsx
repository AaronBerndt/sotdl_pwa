import { Button } from "@material-ui/core";
import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useRollDice from "../../hooks/useRollDice";
import BBModal from "../../Molecules/BBModal/BBModal";
export type Props = {
  rollReason: string;
  attributeToUse: string;
};

export default function RollAttackButton({
  rollReason,
  attributeToUse,
}: Props) {
  const { open, toggleOpen } = useToggle();
  const characterAttributes = useCharacterAttributes();
  const attributeScore = characterAttributes[attributeToUse.toLowerCase()];
  const modifier = attributeScore - 10;

  const { rollChallengeRoll } = useRollDice();
  const longPressEvent = useLongPress(
    () => toggleOpen(),
    () => rollChallengeRoll(modifier, rollReason, "Attack", 0, 0),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  return (
    <>
      <Button {...longPressEvent}>{modifier}</Button>
      <BBModal
        rollType="Attack"
        rollReason={rollReason}
        modifier={modifier}
        open={open}
        toggleOpen={() => toggleOpen()}
      />
    </>
  );
}
