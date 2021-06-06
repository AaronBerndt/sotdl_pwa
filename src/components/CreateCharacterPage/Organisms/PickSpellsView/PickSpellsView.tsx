import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
export default function PickSpellsView() {
  const { spells } = useCharacterBuilderContext();
  return <div>{sample}</div>;
}
