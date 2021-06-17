import React from "react";
import useAncestries from "../../../CreateCharacterPage/hooks/useAncestries";

export default function AncestryForm() {
  const { data: ancestries } = useAncestries();
  return <div>Stuff</div>;
}
