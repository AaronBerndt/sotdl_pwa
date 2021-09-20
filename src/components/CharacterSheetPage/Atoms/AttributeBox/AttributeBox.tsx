// @ts-ignore
import React from "react";
import styled from "styled-components";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useRollDice from "../../hooks/useRollDice";
import BBModal from "../../Molecules/BBModal/BBModal";
import Button from "../../Shared/CustomButton";

type Props = {
  label: string;
};

const Div = styled.div`
  position: relative;
  cursor: pointer;
  text-align: center;
  margin-right: 10px;
`;

const AttributeValue = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 27px;
`;
const AttributeFooter = styled.div`
  font-size: 12px;
`;

export default function AttributeBox({ label }: Props) {
  const characterAttributes = useCharacterAttributes();

  const attributeScore = characterAttributes[label.toLowerCase()];

  const isCoreAttribute = [
    "Strength",
    "Agility",
    "Will",
    "Intellect",
    "Perception",
  ].includes(label);

  const isClickable = [
    "Strength",
    "Agility",
    "Will",
    "Intellect",
    "Perception",
  ].includes(label);

  const modifier = attributeScore - (isCoreAttribute ? 10 : 0);

  const { rollChallengeRoll } = useRollDice();
  const { open, toggleOpen } = useToggle();

  const longPressEvent = useLongPress(
    () => toggleOpen(),
    () => rollChallengeRoll(modifier, label, "Challenge", 0, 0),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  return (
    <>
      {isClickable ? (
        <>
          <Div>
            <AttributeFooter>{`${label}`}</AttributeFooter>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              {...longPressEvent}
              style={{
                color: "white",
              }}
            >
              <AttributeValue>
                {Math.sign(modifier) === 1 ? `+${modifier}` : modifier}
              </AttributeValue>
            </Button>
            <AttributeFooter>{`${attributeScore}`}</AttributeFooter>
          </Div>
          <BBModal
            rollType="Challenge"
            rollReason={label}
            modifier={modifier}
            open={open}
            toggleOpen={() => toggleOpen()}
          />
        </>
      ) : (
        <Div>
          <AttributeFooter>{label}</AttributeFooter>
          <AttributeValue>{attributeScore}</AttributeValue>
        </Div>
      )}
    </>
  );
}
