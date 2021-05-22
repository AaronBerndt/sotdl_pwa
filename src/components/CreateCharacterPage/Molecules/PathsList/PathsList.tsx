import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Path } from "../../CreateCharacterSheetPageTypes";
import usePaths from "../../hooks/usePaths";
export default function PathsList() {
  const { data: paths, isLoading } = usePaths();

  if (isLoading) {
    return <div>Is loading</div>;
  }

  return (
    <List>
      {paths.map((path: Path) => (
        <ListItem button>
          <ListItemText primary={path.name} />
        </ListItem>
      ))}
    </List>
  );
}
