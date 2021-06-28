import {
  Button,
  Collapse,
  Grid,
  InputAdornment,
  List,
  TextField,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
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
  const { open: addItemOpen, toggleOpen: toggleAddItemOpen } = useToggle();
  const { open: inventoryOpen, toggleOpen: toggleInventoryOpen } = useToggle();
  const { open: equippedGear, toggleOpen: toggleEquippedGear } = useToggle();

  const {
    items,
    setItems,
    currency,
    setCurrency,
  } = useCharacterBuilderContext();
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
      <Grid item>Starting Gear</Grid>
      <Button onClick={() => toggleEquippedGear()}>
        <Typography variant="h6">{"Equipped Gear"}</Typography>
        {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
      </Button>
      <Collapse in={equippedGear} timeout="auto" unmountOnExit>
        <List>
          {items
            .filter(
              ({ itemType, equiped }: Item) =>
                (itemType === "armor" || "weapon") && equiped
            )
            .map((item: any, i: number) => (
              <EquipmentAccordion item={item} inInventory={true} key={i} />
            ))}
        </List>
      </Collapse>

      <Button onClick={() => toggleInventoryOpen()}>
        <Typography variant="h6">{`Inventory(${items.length})`}</Typography>
        {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
      </Button>
      <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
        <List>
          {items.map((item: Item, i: number) => (
            <EquipmentAccordion item={item} inInventory={true} key={i} />
          ))}
        </List>
      </Collapse>

      <Button onClick={() => toggleAddItemOpen()}>
        <Typography variant="h6">{`Add Item`}</Typography>
        {addItemOpen ? <ExpandLess /> : <ExpandMore />}
      </Button>
      <Collapse in={addItemOpen} timeout="auto" unmountOnExit>
        <List>
          {itemList.map((item: Item, i: number) => (
            <EquipmentAccordion item={item} inInventory={false} key={i} />
          ))}
        </List>
      </Collapse>
      <Grid item>Currency</Grid>
      <Grid container justify="center">
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
