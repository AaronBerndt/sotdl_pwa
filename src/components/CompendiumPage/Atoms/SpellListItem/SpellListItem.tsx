import { Collapse, Grid, ListItem, ListItemText } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Property,
  Spell,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import useToggle from "../../../hooks/useToggle";
export type Props = {
  spell: Spell;
  style: any;
};
export default function CompendiumSpellListItem({ spell, style }: Props) {
  const { open, toggleOpen } = useToggle();
  return (
    <>
      <ListItem button onClick={() => toggleOpen()} style={style}>
        <ListItemText
          primary={spell.name}
          secondary={`${spell.level} ${spell.tradition} ${spell.type}`}
        />
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

