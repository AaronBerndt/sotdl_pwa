import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { Ancestry } from "../../CreateCharacterSheetPageTypes";
import useAncestries from "../../hooks/useAncestries";

export default function AncestryList() {
  const { data: ancestries, isLoading } = useAncestries();
  const { ancestry: chosenAncestry } = useCharacterBuilderContext();

  if (isLoading) {
    return <div>Is loading</div>;
  }

  return (
    <List>
      {ancestries.map((ancestry: Ancestry) => (
        <ListItem
          button
          disabled={ancestry.name === chosenAncestry}
          onClick={() => {}}
        >
          <ListItemText primary={ancestry.name} />
        </ListItem>
      ))}
    </List>
  );
}
