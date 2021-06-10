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
};

export default function EquipmentAccordion({ item }: Props) {
  const { setInventory } = useCharacterBuilderContext();
  const { open, toggleOpen } = useToggle();

  const onButtonClick = (e: any) => {
    setInventory((prev: Item[]) => [...prev, item]);
  };
  return (
    <>
      <ListItem button onClick={() => toggleOpen()}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText primary={item.name} secondary={item.itemType} />
        <ListItemSecondaryAction>
          {<Button onClick={onButtonClick}>Add Item</Button>}
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
