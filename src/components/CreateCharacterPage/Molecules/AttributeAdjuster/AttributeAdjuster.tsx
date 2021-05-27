import { find } from "lodash";
import React from "react";
import styled from "styled-components";
import Button from "../../../CharacterSheetPage/Shared/CustomButton";
import useLongPress from "../../../hooks/useLongPress";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import useAncestries from "../../hooks/useAncestries";
import usePaths from "../../hooks/usePaths";
export type Props = {
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

export default function AttributeAdjuster({ label }: Props) {
  const {
    level,
    novicePath,
    expertPath,
    masterPath,
    ancestry: selectedAncestry,
  } = useCharacterBuilderContext();
  const { data: ancestries, isLoading: ancestryLoading } = useAncestries();
  const { data: paths, isLoading: pathsLoading } = usePaths();

  const longPressEvent = useLongPress(
    () => {},
    () => {},
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  if (ancestryLoading || pathsLoading) {
    return <div>Is loading</div>;
  }

  const { characteristics: ancestryCharacteristics } = find(ancestries, {
    name: selectedAncestry,
  });

  const { value: ancestryValue } = find(ancestryCharacteristics, {
    name: label,
  });

  const pathData = [novicePath, expertPath, masterPath].map((path) =>
    find(paths, { name: path })
  );

  return (
    <Button size="small" {...longPressEvent}>
      <Div>
        <AttributeFooter>{`${label}`}</AttributeFooter>
        <AttributeFooter>{ancestryValue}</AttributeFooter>
      </Div>
    </Button>
  );
}
