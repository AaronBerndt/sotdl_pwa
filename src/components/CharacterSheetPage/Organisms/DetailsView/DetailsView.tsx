import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Detail, Profession } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function DetailsView() {
  const {
    ancestry,
    professions,
    details,
    level,
    novicePath,
    expertPath,
    masterPath,
  } = useCharacterAttributes();
  return (
    <div>
      <Grid>
        <Typography variant="h5">Full Path</Typography>
        <p>
          {`${ancestry} ${novicePath ? novicePath : ""} ${
            expertPath ? `${expertPath}` : ""
          } ${masterPath ? `${masterPath}` : ""} ${level}`}
        </p>
        <Typography variant="h5">Professions</Typography>
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
        <Typography variant="h5">Characteristics</Typography>
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
