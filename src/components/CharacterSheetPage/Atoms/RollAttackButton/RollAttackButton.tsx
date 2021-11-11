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
};

export default function RollAttackButton({
  rollReason,
  attributeToUse,
  attackRoll,
}: Props) {
  const { open, toggleOpen } = useToggle();
  const characterAttributes = useCharacterAttributes();
  const attributeScore = characterAttributes[attributeToUse.toLowerCase()];

  const regex = /(.*) ([+|-]*) (.*)/;
  const result = attackRoll.match(regex);
  const modifier = result![1];
  const operator = result![2];
  const boonOrBane = result![3];

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

  const isNegative = operator === "-" ? "red" : "green";

  console.log({ operator, boonOrBane, modifier, result });
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
          {`${modifier} `} <span style={{ color: isNegative }}>{operator}</span>
          <span style={{ color: isNegative }}>{boonOrBane}</span>
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
