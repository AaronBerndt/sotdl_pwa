import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Collapse,
  Grid,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Property } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import createCastingObject from "../../../CharacterSheetPage/Molecules/SpellsTable/castingObject";
import useToggle from "../../../hooks/useToggle";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

export type Props = {
  spell: any;
  style: any;
  power: number;
};

export default function PickSpellItem({
  spell,
  style,
  power,
}: Props): JSX.Element {
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

  const canCast: any = createCastingObject(power)[spell.level] !== 0;

  return (
    <>
      <ListItem button onClick={() => toggleOpen()} style={style}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText
          style={{ color: !canCast ? "red" : "" }}
          primary={spell.name}
          secondary={`${spell.tradition} ${spell.type} ${spell.level}`}
        />
        <ListItemSecondaryAction>
          {
            <Button onClick={onButtonClick} disabled={!canCast}>
              {knowsSpell ? "Remove" : canCast ? "Learn" : "Cant Learn"}
            </Button>
          }
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container alignItems="center" direction="column">
          <Grid item>{spell.name}</Grid>
          <Grid item>{`${spell.tradition} ${spell.level} ${spell.type}`}</Grid>
          {spell.properties
            .filter((property: Property) =>
              ["Range", "Area", "Duration", "Target"].includes(property.name)
            )
            .map((property: Property, i: number) => (
              <Grid key={i} item style={{ padding: 20 }}>
                <ReactMarkdown
                  children={`${property.name}: ${property.description}`}
                />
              </Grid>
            ))}

          <Grid item style={{ padding: 20 }}>
            <ReactMarkdown children={spell.description} />
          </Grid>
          {spell.properties
            .filter(
              (property: Property) =>
                !["Range", "Area", "Duration", "Target"].includes(property.name)
            )
            .map((property: Property, i: number) => (
              <Grid
                key={i}
                item
                style={{ padding: 20 }}
              >{`${property.name}: ${property.description}`}</Grid>
            ))}
        </Grid>
      </Collapse>
    </>
  );
}
