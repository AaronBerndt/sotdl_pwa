import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
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
  let { url } = useRouteMatch();

  const { open, toggleOpen } = useToggle();
  const history = useHistory();
  const onOpen = () => toggleOpen();
  const onClose = () => toggleOpen();

  return (
    <>
      <Button fullWidth onClick={onOpen} variant="contained">
        <>
          <Menu />
          {menu[currentState]}
        </>
      </Button>
      <Dialog fullScreen open={open} onClose={onClose}>
        <List>
          {menu.map((view, i) => (
            <ListItem
              button
              key={i}
              onClick={() => {
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
