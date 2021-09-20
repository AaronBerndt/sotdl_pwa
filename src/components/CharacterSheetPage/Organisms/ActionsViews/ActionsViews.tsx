import { Grid, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import WeaponTable from "../../Molecules/WeaponTable/WeaponTable";
import { actionObject } from "./ActionObject";
export default function ActionsView() {
  const { talents } = useCharacterAttributes();
  const talentActionList = [
    ...actionObject,
    ...talents.filter(({ description }: Talent) =>
      description.includes("action")
    ),
  ];

  return (
    <Grid>
      <Grid item>Weapon</Grid>
      <WeaponTable />

      <Grid item>Attack Action</Grid>
      {talentActionList
        .filter(({ description }: any) => description.includes("attack"))
        .filter(({ description }: any) => !description.includes("triggered"))
        .filter(({ description }: any) => description.includes("make"))
        .map((action: any) => (
          <ListItem>
            <ListItemText
              primary={action.name}
              secondary={action.description}
            />
          </ListItem>
        ))}

      <Grid item>Movement/Healing Action</Grid>
      {talentActionList
        .filter(({ description }: any) => !description.includes("make"))
        .map((action: any) => (
          <ListItem>
            <ListItemText
              primary={action.name}
              secondary={action.description}
            />
          </ListItem>
        ))}

      <Grid item>Triggered</Grid>
      {talentActionList
        .filter(({ description }: any) => description.includes("triggered"))
        .map((action: any) => (
          <ListItem>
            <ListItemText
              primary={action.name}
              secondary={action.description}
            />
          </ListItem>
        ))}
    </Grid>
  );
}
