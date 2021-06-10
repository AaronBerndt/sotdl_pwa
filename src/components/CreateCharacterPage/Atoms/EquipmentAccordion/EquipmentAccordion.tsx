import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import useToggle from "../../../hooks/useToggle";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { Item } from "../../CreateCharacterSheetPageTypes";
export type Props = {
  item: Item;
  inInventory: boolean;
};

export default function EquipmentAccordion({ item, inInventory }: Props) {
  const { setInventory } = useCharacterBuilderContext();
  const { open, toggleOpen } = useToggle();

  const onAddToInventoryButtonClick = (e: any) => {
    setInventory((prev: Item[]) => [...prev, item]);
  };

  const onEquipButtonClick = (e: any) => {
    setInventory((prev: Item[]) =>
      prev.map((itemInInventory) => {
        if (item.name === itemInInventory.name) {
          const { equiped, ...itemInInventoryRest } = itemInInventory;
          return {
            ...itemInInventoryRest,
            equiped: !equiped,
          };
        }
        return itemInInventory;
      })
    );
  };

  const onRemoveFromInventoryButtonClick = (e: any) => {
    setInventory((prev: Item[]) =>
      prev.filter(({ name, id }) => name !== item.name)
    );
  };

  return (
    <>
      <ListItem button onClick={() => toggleOpen()}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText primary={item.name} secondary={item.itemType} />
        <ListItemSecondaryAction>
          {inInventory ? (
            <>
              {item.itemType !== "basic" && (
                <Button onClick={onEquipButtonClick}>
                  {item.equiped ? "UnEquip" : "Equip"}
                </Button>
              )}
              <Button onClick={onRemoveFromInventoryButtonClick}>Remove</Button>
            </>
          ) : (
            <Button onClick={onAddToInventoryButtonClick}>Add Item</Button>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.itemType === "weapon" ? (
            <>
              <ListItem>
                <ListItemText primary={`Damage: ${item.damage}`} />
              </ListItem>

              <ListItem>
                <ListItemText primary={`Hands: ${item.hands}`} />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={`Properties: ${
                    item.properties ? item.properties.join(",") : ""
                  }`}
                />
              </ListItem>
            </>
          ) : item.itemType === "armor" ? (
            <>
              <ListItem>
                <ListItemText
                  primary={`Value: ${
                    item.value && item.value < 10
                      ? `Agility + ${item.value}`
                      : item.value
                  }`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Properties: ${
                    item.properties ? item.properties.join(",") : ""
                  }`}
                />
              </ListItem>
            </>
          ) : null}

          <ListItem>
            <ListItemText primary={`Price: ${item.price}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Availability: ${item.availability}`} />
          </ListItem>

          <ListItem>
            <ListItemText primary={item.description} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
