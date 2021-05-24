import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import AncestryContent from "../../Molecules/AncestryContent/AncestryContent";
import AncestryList from "../../Molecules/AncestryList/AncestryList";
export default function AncestryView() {
  const { ancestry } = useCharacterBuilderContext();

  return (
    <>
      {ancestry === "" ? (
        <AncestryList />
      ) : (
        <AncestryContent ancestryName={ancestry} />
      )}
    </>
  );
}
