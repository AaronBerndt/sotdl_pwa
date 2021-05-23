import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { Path } from "../../CreateCharacterSheetPageTypes";
import usePaths from "../../hooks/usePaths";
export default function PathsList() {
  const { data: paths, isLoading } = usePaths();
  const { novicePath, expertPath, masterPath } = useCharacterBuilderContext();

  if (isLoading) {
    return <div>Is loading</div>;
  }

  return (
    <List>
      {paths.map((path: Path, i: number) => (
        <ListItem
          button
          disabled={path.name === (novicePath | expertPath | masterPath)}
          key={i}
        >
          <ListItemText primary={path.name} />
        </ListItem>
      ))}
    </List>
  );
}
