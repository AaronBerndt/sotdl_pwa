import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import { Detail, Profession } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function DetailsView() {
  const navigate = useNavigate();
  const {
    ancestry,
    professions,
    details,
    level,
    novicePath,
    expertPath,
    masterPath,
    _id,
  } = useCharacterAttributes();

  return (
    <div>
      <Grid>
        <Grid item>
          <Button onClick={() => navigate(`/edit_character/${_id}/details`)}>
            Manage Details
          </Button>
        </Grid>
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


