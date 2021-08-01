import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { Ancestry, DetailChoices } from "../../CreateCharacterSheetPageTypes";
import useAncestries from "../../hooks/useAncestries";
import AncestryContent from "../AncestryContent/AncestryContent";

type Props = {
  toggleClose: Function;
};
export default function AncestryList({ toggleClose }: Props) {
  const [selectedAncestry, setSelectedAncestry] = useState(0);
  const { open, toggleOpen } = useToggle();
  const { data: ancestries, isLoading } = useAncestries();
  const {
    ancestry: chosenAncestry,
    setAncestry,
    setDetailChoices,
  } = useCharacterBuilderContext();

  if (isLoading) {
    return <div>Is loading</div>;
  }

  const onListItemClick = (index: number) => {
    setSelectedAncestry(index);
    toggleOpen();
  };

  const onPickAncestryButtonClick = () => {
    setAncestry(ancestries[selectedAncestry].name);
    setDetailChoices((prev: DetailChoices) => [
      ...prev.filter(({ origin }) => origin === "Ancestry"),
      ...ancestries[selectedAncestry].detailChoices,
    ]);
    toggleOpen();

    toggleClose();
  };

  return (
    <>
      <List>
        {ancestries.map((ancestry: Ancestry, i: number) => (
          <ListItem
            button
            disabled={ancestry.name === chosenAncestry}
            onClick={() => onListItemClick(i)}
            key={i}
          >
            <ListItemText primary={ancestry.name} />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={() => toggleOpen()} fullScreen>
        <DialogTitle>
          <Toolbar>
            <Typography variant="h6">
              {chosenAncestry ? "Confirm Change Ancestry" : "Confirm Ancestry"}
            </Typography>{" "}
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => toggleOpen()}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </DialogTitle>
        <DialogContent>
          <AncestryContent ancestryName={ancestries[selectedAncestry].name} />
        </DialogContent>
        <DialogActions>
          <Grid container direction="row">
            <Grid item xs={8}>
              <Button
                variant="contained"
                autoFocus
                onClick={onPickAncestryButtonClick}
                color="primary"
              >
                {chosenAncestry ? "Change Ancestry" : "Pick Ancestry"}
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button autoFocus onClick={() => toggleOpen()} color="primary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
