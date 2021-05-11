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
  const onClose = () => toggleOpen();

  return (
    <>
      <Button fullWidth>{pickedOption}</Button>
      <Dialog fullScreen open={open} onClose={onClose}>
        <List>
          <ListItem button>
            <ListItemText primary="Attributes" />
          </ListItem>
        </List>
      </Dialog>
      {/* <Menu> */}
      {/*   <MenuItem>Attributes</MenuItem> */}
      {/*   <MenuItem>Actions</MenuItem> */}
      {/*   <MenuItem>Spells</MenuItem> */}
      {/*   <MenuItem>Attributes</MenuItem> */}
      {/*   <MenuItem>Features</MenuItem> */}
      {/* </Menu> */}
    </>
  );
}
