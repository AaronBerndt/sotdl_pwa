import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import useEquipGear from "../../hooks/useEquipGear";
export type Props = {
  item: any;
};
export default function InventoryListItem({ item }: Props) {
  const { mutate: editEquipStatus } = useEquipGear();
  const onEquipChange = () => editEquipStatus({ itemToEdit: item });

  return (
    <ListItem>
      {item.itemType !== "basic" ? (
        <ListItemIcon>
          <Checkbox checked={item?.equipped} onChange={onEquipChange} />
        </ListItemIcon>
      ) : null}
      <ListItemText primary={item.name} secondary={item.itemType} />
    </ListItem>
  );
}


