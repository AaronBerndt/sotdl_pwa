import { Button, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import InventoryListItem from "../../Atoms/InventoryListItem/InventoryListItem";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function EquipmentView(): JSX.Element {
  const { items, strength } = useCharacterAttributes();

  console.log(items);
  const inventory = [...items.weapons, ...items.armor, ...items.otherItems];
  const gear = [...items.weapons, ...items.armor];

  const history = useHistory();
  return (
    <Grid>
      <Grid container>
        <ListItem>
          <Button onClick={() => history.push("/currency")}>Money</Button>
          <ListItemText
            primary={`
 Items carried: ${inventory.length}
          `}
            secondary={
              inventory.length > strength * 2 ? "Encumbered" : "Unencumbered"
            }
          />
        </ListItem>
      </Grid>

      <Grid item>Money</Grid>
      <Grid item>Gear</Grid>
      <List>
        {gear.map((item, i) => (
          <InventoryListItem item={item} key={i} />
        ))}
      </List>
      <Grid item>Other Items</Grid>
      <List>
        {items.otherItems.map((item, i) => (
          <InventoryListItem item={item} key={i} />
        ))}
      </List>
    </Grid>
  );
}
