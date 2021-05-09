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
  console.log(characterAttributes[label.toLowerCase()]);
  console.log(characterAttributes);
  return (
    <Div>
      <AttributeValue>
        {characterAttributes[label.toLowerCase()]}
      </AttributeValue>
      <AttributeFooter>{label}</AttributeFooter>
    </Div>
  );
}
