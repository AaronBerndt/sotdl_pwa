// @ts-ignore
import { last } from "lodash";
import React from "react";
import styled from "styled-components";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useAddOverride from "../../hooks/useAddOverride";
import useDeleteOverride from "../../hooks/useDeleteOverride";
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
  color: ${(props) => props.color};
`;
const AttributeFooter = styled.div`
  font-size: 12px;
  color: red;
`;

const AttributeHeader = styled.div`
  font-size: 12px;
`;

export default function AttributeBox({ label }: Props) {
  const characterAttributes = useCharacterAttributes();
  const { afflictions, temporaryEffects } = characterAttributes;

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

  const isClickableIncreaseAttribute = ["Corruption", "Insanity"].includes(
    label
  );

  const modifier = attributeScore - (isCoreAttribute ? 10 : 0);

  const { rollChallengeRoll } = useRollDice();
  const { open, toggleOpen } = useToggle();
  const { mutate: addOverride } = useAddOverride();
  const { mutate: deleteOveride } = useDeleteOverride();

  const lastValue: any = last(
    characterAttributes.overrides.filter(({ name }) => name === label)
  );

  const longPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      toggleOpen();
    },
    () => rollChallengeRoll(modifier, label, "Challenge", 0, 0),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  const increaseAttributeLongPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      deleteOveride({
        overrideToDelete: lastValue,
      });
    },

    () => {
      addOverride({ overrideType: label, overrideValue: 1 });
    },
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  const color =
    label === "Speed"
      ? afflictions
          .map(({ name }) => name)
          .some((affliction) =>
            ["Blinded", "Immobilized", "Slowed"].includes(affliction)
          )
        ? "red"
        : ""
      : "";

  return (
    <>
      {isClickable ? (
        <>
          <Div>
            <AttributeHeader>{`${label}`}</AttributeHeader>
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
      ) : isClickableIncreaseAttribute ? (
        <Div>
          <AttributeHeader>{`${label}`}</AttributeHeader>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            {...increaseAttributeLongPressEvent}
            style={{
              color: "white",
            }}
          >
            <AttributeValue>{attributeScore}</AttributeValue>
          </Button>
        </Div>
      ) : (
        <Div>
          <AttributeHeader>{label}</AttributeHeader>
          <AttributeValue color={color}>{attributeScore}</AttributeValue>
        </Div>
      )}
    </>
  );
}
