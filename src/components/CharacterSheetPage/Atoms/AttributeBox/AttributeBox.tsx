import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import useLongPress from "../../../hooks/useLongPress";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useRollDice from "../../hooks/useRollDice";

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
  font-size: 26px;
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

  const longPressEvent = useLongPress(
    rollChallengeRoll(modifier, label, "Challenge", 0, 0),
    rollChallengeRoll(modifier, label, "Attack", 10, 0),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  return (
    <>
      {isClickable ? (
        <Button size="small" {...longPressEvent}>
          <Div>
            <AttributeValue>
              {Math.sign(modifier) ? `+${modifier}` : modifier}
            </AttributeValue>
            <AttributeFooter>{`${label}`}</AttributeFooter>
            <AttributeFooter>{`${attributeScore}`}</AttributeFooter>
          </Div>
        </Button>
      ) : (
        <Div>
          <AttributeValue>{attributeScore}</AttributeValue>
          <AttributeFooter>{label}</AttributeFooter>
        </Div>
      )}
    </>
  );
}
