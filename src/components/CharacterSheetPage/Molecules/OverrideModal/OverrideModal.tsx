import {
  Select,
  Grid,
  Dialog,
  Toolbar,
  IconButton,
  DialogTitle,
  List,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { Override } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useAddOverride from "../../hooks/useAddOverride";
import useDeleteOverride from "../../hooks/useDeleteOverride";
export default function OverrideModal() {
  const { open, toggleOpen } = useToggle();

  const [overrideType, setOverideType] = useState("Health");
  const [overrideValue, setOverrideValue] = useState(0);

  const overrideTypeList = [
    "Health",
    "Strength",
    "Agility",
    "Will",
    "Intellect",
    "Perception",
    "Defense",
    "Speed",
    "Corruption",
    "Insanity",
  ];
  const { overrides } = useCharacterAttributes();

  const { mutate: deleteOveride } = useDeleteOverride();
  const { mutate: addOveride } = useAddOverride();

  return (
    <>
      <Dialog open={open} fullScreen>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => toggleOpen()}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <DialogTitle>Override</DialogTitle>
        </Toolbar>
        <List>
          {overrides.map((override: Override, i) => (
            <ListItem key={i}>
              <ListItemText primary={`${override.name}: ${override.value}`} />
              <ListItemSecondaryAction>
                <Button
                  onClick={() => deleteOveride({ overrideToDelete: override })}
                >
                  X
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel>Override</InputLabel>
              <Select
                value={overrideType}
                onChange={(e: any) => setOverideType(e.target.value)}
              >
                {overrideTypeList.map((overrideTypeItem) => (
                  <MenuItem value={overrideTypeItem}>
                    {overrideTypeItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>{" "}
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              defaultValue={0}
              onChange={(e) => setOverrideValue(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={4}>
            <Button onClick={() => addOveride({ overrideType, overrideValue })}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <Button onClick={() => toggleOpen()}>Overrides</Button>
    </>
  );
}

