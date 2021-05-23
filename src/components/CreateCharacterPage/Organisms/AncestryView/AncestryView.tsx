import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import AncestryList from "../../Molecules/AncestryList/AncestryList";
export default function AncestryView() {
  const { ancestry } = useCharacterBuilderContext();
  return <>{ancestry === "" ? <AncestryList /> : <p>{ancestry}</p>}</>;
}
