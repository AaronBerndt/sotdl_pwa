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

type Props = {
  currentState: number;
  menu: string[];
  updateCurrentChoice: Function;
};
export default function ViewMenu({
  currentState,
  menu,
  updateCurrentChoice,
}: Props) {
  /* const [pickedOption, setPickedOption] = useState(currentState); */
  const { open, toggleOpen } = useToggle();
  const history = useHistory();
  const onOpen = () => toggleOpen();
  const onClose = () => toggleOpen();

  history.push(`/${menu[currentState].toLowerCase()}`);
  return (
    <>
      <Button fullWidth onClick={onOpen}>
        {menu[currentState]}
      </Button>
      <Dialog fullScreen open={open} onClose={onClose}>
        <List>
          {menu.map((view, i) => (
            <ListItem
              button
              key={i}
              onClick={() => {
                /* setPickedOption(i); */
                toggleOpen();
                updateCurrentChoice(i);
                history.push(`/${view.toLowerCase()}`);
              }}
            >
              <ListItemText primary={view} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
