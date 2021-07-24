import { Grid, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import WeaponTable from "../../Molecules/WeaponTable/WeaponTable";
export default function ActionsView() {
  const { talents } = useCharacterAttributes();
  return (
    <Grid>
      <WeaponTable />
      {talents
        .filter(({ description }: Talent) => description.includes("action"))
        .map((talent: Talent) => (
          <ListItem>
            <ListItemText
              primary={talent.name}
              secondary={talent.description}
            />
          </ListItem>
        ))}
    </Grid>
  );
}
