import {
  Button,
  ButtonGroup,
  Collapse,
  Grid,
  InputAdornment,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import { Currency } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import useToggle from "../../../hooks/useToggle";
import EquipmentAccordion from "../../Atoms/EquipmentAccordion/EquipmentAccordion";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { Item } from "../../CreateCharacterSheetPageTypes";
import useEquipment from "../../hooks/useEquipment";
export type Props = {
  sample: string;
};

export default function PickEquipmentView() {
  const [filter, setFilter] = useState("All");
  const { open: addItemOpen, toggleOpen: toggleAddItemOpen } = useToggle();
  const { open: inventoryOpen, toggleOpen: toggleInventoryOpen } = useToggle();

  const { items, currency, setCurrency } = useCharacterBuilderContext();
  const { data: itemList, isLoading } = useEquipment();

  const currencyArray = ["bits", "copper", "silver", "gold"];
  const abbreviationObject: any = {
    bits: "b",
    copper: "cp",
    silver: "ss",
    gold: "gc",
  };

  if (isLoading) {
    return <div>...Is Loading</div>;
  }

  return (
    <Grid>
      <Grid item>
        <Button onClick={() => toggleInventoryOpen()}>
          <Typography variant="h6">{`Inventory(${items.length})`}</Typography>
          {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Collapse in={!inventoryOpen} timeout="auto" unmountOnExit>
          <List>
            {items.map((item: Item, i: number) => (
              <EquipmentAccordion item={item} inInventory={true} key={i} />
            ))}
          </List>
        </Collapse>
      </Grid>
      <Grid item>
        <Button onClick={() => toggleAddItemOpen()}>
          <Typography variant="h6">{`Add Item`}</Typography>
          {addItemOpen ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Collapse in={addItemOpen} timeout="auto" unmountOnExit>
          <ButtonGroup fullWidth>
            <Button
              color={filter === "All" ? "secondary" : "primary"}
              onClick={() => setFilter("All")}
            >
              All
            </Button>
            <Button
              color={filter === "Weapon" ? "secondary" : "primary"}
              onClick={() => setFilter("Weapon")}
            >
              Weapon
            </Button>
            <Button
              color={filter === "Armor" ? "secondary" : "primary"}
              onClick={() => setFilter("Armor")}
            >
              Armor
            </Button>
            <Button
              color={filter === "Other" ? "secondary" : "primary"}
              onClick={() => setFilter("Other")}
            >
              Other
            </Button>
          </ButtonGroup>
          <List>
            {itemList
              .filter(({ itemType }: Item) =>
                filter === "All" ? itemType : itemType === filter.toLowerCase()
              )
              .map((item: Item, i: number) => (
                <EquipmentAccordion item={item} inInventory={false} key={i} />
              ))}
          </List>
        </Collapse>
      </Grid>
      <Grid item>Currency</Grid>
      <Grid container justifyContent="center">
        {currencyArray.map((currencyName, i) => (
          <Grid item>
            <TextField
              label={currencyName}
              id="standard-start-adornment"
              size="small"
              defaultValue={currency[currencyName]}
              type="number"
              onChange={(e) => {
                setCurrency((prev: Currency) => ({
                  ...prev,
                  ...{ [currencyName]: e.target.value },
                }));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {abbreviationObject[currencyName]}
                  </InputAdornment>
                ),
              }}
              key={i}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

