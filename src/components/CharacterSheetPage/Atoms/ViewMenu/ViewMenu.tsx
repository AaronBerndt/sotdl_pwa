import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";

export default function ViewMenu() {
  const [pickedOption, setPickedOption] = useState("Attributes");
  const { open, toggleOpen } = useToggle();
  const history = useHistory();
  const onOpen = () => toggleOpen();
  const onClose = () => toggleOpen();

  history.push(`/${pickedOption.toLowerCase()}`);
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
                  history.push(`/${view.toLowerCase()}`);
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
