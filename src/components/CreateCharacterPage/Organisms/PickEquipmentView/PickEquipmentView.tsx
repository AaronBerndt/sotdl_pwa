import { Button, Collapse, Grid, List, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
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

  const { inventory } = useCharacterBuilderContext();
  const { data: itemList, isLoading } = useEquipment();

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
          {inventory
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
        <Typography variant="h6">{`Inventory(${inventory.length})`}</Typography>
        {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
      </Button>
      <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
        <List>
          {inventory.map((item: Item, i: number) => (
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
    </Grid>
  );
}
