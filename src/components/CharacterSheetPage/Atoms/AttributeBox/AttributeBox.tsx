import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

type Props = {
  label: string;
  clickable?: boolean;
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

export default function AttributeBox({ label, clickable }: Props) {
  const characterAttributes = useCharacterAttributes();

  const attributeScore = characterAttributes[label.toLowerCase()];

  const isCoreAttribute =
    label ===
    ("Strength" || "Agility" || "Will" || "Intellect" || "Perception");

  const modifier = attributeScore - (isCoreAttribute ? 10 : 0);

  return (
    <>
      {clickable ? (
        <Button>
          <Div>
            <AttributeValue>
              {Math.sign(modifier) ? `+${modifier}` : modifier}
            </AttributeValue>
            <AttributeFooter>{label}</AttributeFooter>
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
