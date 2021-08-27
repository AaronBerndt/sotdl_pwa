import React from "react";
import { filterByLevel } from "../../../../utils/arrayUtils";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import ReactMarkdown from "react-markdown";

export default function TalentsView() {
  const { talents, level } = useCharacterAttributes();
  return (
    <div>
      {filterByLevel(talents, level)
        .filter(({ name }: Talent) => !name.includes("Attributes Increase"))
        .filter(
          ({ name }: Talent) => !name.includes("Languages and Professions")
        )
        .map((talent: Talent, i) => (
          <>
            <p>{talent.name}</p>
            <ReactMarkdown children={talent.description} />
          </>
        ))}
    </div>
  );
}
