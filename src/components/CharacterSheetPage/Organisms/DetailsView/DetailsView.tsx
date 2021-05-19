import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Detail, Profession } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function DetailsView() {
  const { professions, details } = useCharacterAttributes();
  return (
    <div>
      <Grid>
        <h3>Profressions</h3>
        <List>
          {professions.map((profession: Profession, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={profession.name}
                secondary={profession.type}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid>
        <h3>Characteristics</h3>
        <List>
          {details.map((detail: Detail, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={detail.name}
                secondary={detail.description}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </div>
  );
}
