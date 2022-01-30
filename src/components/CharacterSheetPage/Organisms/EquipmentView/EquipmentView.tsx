import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import InventoryListItem from "../../Atoms/InventoryListItem/InventoryListItem";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import CurrencyView from "../CurrencyView/CurrencyView";

export default function EquipmentView(): JSX.Element {
  const navigate = useNavigate();
  const { items, strength, _id } = useCharacterAttributes();
  const inventory = [...items.weapons, ...items.armor, ...items.otherItems];
  const gear = [...items.weapons, ...items.armor];

  return (
    <Grid>
      <Grid container>
        <ListItem>
          <ListItemText
            primary={`
 Items carried: ${inventory.length}
          `}
            secondary={
              inventory.length > strength * 2 ? "Encumbered" : "Unencumbered"
            }
          />

          <Grid item>
            <Button onClick={() => navigate(`/edit_character/${_id}/items`)}>
              Manage Equipment
            </Button>
          </Grid>
        </ListItem>
      </Grid>

      <Grid item>Money</Grid>
      <CurrencyView />
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

