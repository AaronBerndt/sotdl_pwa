import React from "react";
import { filterByLevel } from "../../../../utils/arrayUtils";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
export default function TalentsView() {
  const { talents } = useCharacterAttributes();
  return (
    <div>
      {filterByLevel(talents, level).map((talent: Talent, i) => (
        <>
          <p>{talent.name}</p>
          <p>{talent.description}</p>
        </>
      ))}
    </div>
  );
}
