import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Ancestry } from "../../CreateCharacterSheetPageTypes";
import useAncestries from "../../hooks/useAncestries";

export default function AncestryList() {
  const { data: ancestries, isLoading } = useAncestries();

  if (isLoading) {
    return <div>Is loading</div>;
  }

  return (
    <List>
      {ancestries.map((ancestry: Ancestry) => (
        <ListItem button>
          <ListItemText primary={ancestry.name} />
        </ListItem>
      ))}
    </List>
  );
}
