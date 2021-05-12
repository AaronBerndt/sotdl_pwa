import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";

export default function ViewMenu() {
  const [pickedOption, setPickedOption] = useState("Attributes");
  const { open, toggleOpen } = useToggle();
  const onOpen = () => toggleOpen();
  const onClose = () => toggleOpen();

  return (
    <>
      <Button fullWidth onClick={onOpen}>
        {pickedOption}
      </Button>
      <Dialog fullScreen open={open} onClose={onClose}>
        <List>
          {["Attributes", "Actions", "Magic", "Talents", "Professsions"].map(
            (view, i) => (
              <ListItem
                button
                key={i}
                onClick={() => {
                  setPickedOption(view);
                  toggleOpen();
                }}
              >
                <ListItemText primary={view} />
              </ListItem>
            )
          )}
        </List>
      </Dialog>
    </>
  );
}
