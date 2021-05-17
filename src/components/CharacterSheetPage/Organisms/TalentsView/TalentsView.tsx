import React from "react";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
export default function TalentsView() {
  const { talents } = useCharacterAttributes();
  return (
    <div>
      {talents.map((talent: Talent, i) => (
        <>
          <p>{talent.name}</p>
          <p>{talent.description}</p>
        </>
      ))}
    </div>
  );
}
