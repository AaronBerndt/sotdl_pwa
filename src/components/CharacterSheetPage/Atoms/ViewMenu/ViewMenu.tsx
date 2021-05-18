import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
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
  let { url, path } = useRouteMatch();
  const { open, toggleOpen } = useToggle();
  const history = useHistory();
  const onOpen = () => toggleOpen();
  const onClose = () => toggleOpen();

  console.log(url, path);
  useEffect(() => {
    history.push(`${url}/${menu[currentState].toLowerCase()}`);
  }, [currentState, url, menu, history]);

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
                history.push(`${url}/${view.toLowerCase()}`);
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
