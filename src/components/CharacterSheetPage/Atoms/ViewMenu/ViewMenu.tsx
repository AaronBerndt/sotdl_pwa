import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
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
  const { open, toggleOpen } = useToggle();
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


