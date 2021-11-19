import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useRollDice from "../../hooks/useRollDice";
import BBModal from "../../Molecules/BBModal/BBModal";
import Button from "../../Shared/CustomButton";
export type Props = {
  rollReason: string;
  attributeToUse: string;
  attackRoll: string;
  totalBB: string;
};

export default function RollAttackButton({
  rollReason,
  attributeToUse,
  attackRoll,
  totalBB,
}: Props) {
  const { open, toggleOpen } = useToggle();
  const characterAttributes = useCharacterAttributes();
  const attributeScore = characterAttributes[attributeToUse.toLowerCase()];

  const regex = /(.*) ([+|-]*) (.*)/;
  const result = attackRoll.match(regex);
  const modifier = result ? result![1] : "";
  const operator = result ? result![2] : null;
  const boonOrBane = result ? result![3] : null;

  const { rollChallengeRoll } = useRollDice();
  const longPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      toggleOpen();
    },
    () => rollChallengeRoll(Number(modifier), rollReason, "Attack", 0, 0),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  const isNegative = totalBB.includes("-") ? "red" : "green";

  console.log(modifier);
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        {...longPressEvent}
        style={{
          color: "white",
        }}
      >
        <p>
          {`${attackRoll}`}
          {totalBB !== "" && (
            <span style={{ color: isNegative }}>{`${totalBB}B`}</span>
          )}
        </p>
      </Button>
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
