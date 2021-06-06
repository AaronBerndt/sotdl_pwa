import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Collapse,
  List,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

export type Props = {
  spell: any;
};

export default function PickSpellItem({ spell }: Props): JSX.Element {
  const { spells, setSpells } = useCharacterBuilderContext();
  const { open, toggleOpen } = useToggle();

  const knowsSpell = spells.includes(spell.name);

  const onButtonClick = () => {
    !knowsSpell
      ? setSpells((prev: string[]) => [...prev, spell.name])
      : setSpells((prev: string[]) =>
          prev.filter((name: string) => name !== spell.name)
        );
  };
  return (
    <>
      <ListItem button onClick={() => toggleOpen()}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText primary={spell.name} />
        <ListItemSecondaryAction>
          {
            <Button onClick={onButtonClick}>
              {knowsSpell ? "Remove" : "Learn"}
            </Button>
          }
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemText primary={spell.range} />
          </ListItem>

          <ListItem>
            <ListItemText primary={spell.duration} />
          </ListItem>

          <ListItem>
            <ListItemText primary={spell.description} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
