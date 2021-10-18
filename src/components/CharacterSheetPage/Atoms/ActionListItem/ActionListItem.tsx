import {
  Switch,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";
import { find } from "lodash";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useAddOverride from "../../hooks/useAddOverride";
import useDeleteOverride from "../../hooks/useDeleteOverride";
import useUpdateExpendedList from "../../hooks/useUpdateExpendedList";
export type Props = {
  talent: any;
};
export default function ActionListItem({ talent }: Props): JSX.Element {
  const { expended } = useCharacterAttributes();
  const checked = find(expended, { name: talent.name }) ? true : false;
  const { mutate: updateExpendedList } = useUpdateExpendedList();
  const { mutate: deleteOveride } = useDeleteOverride();
  const { mutate: addOveride } = useAddOverride();

  const onCheckBoxChange = (whatToExpend: string, action: "add" | "remove") => {
    updateExpendedList({
      whatToExpend,
      action,
    });
  };

  const onToggleChange = (action: "add" | "remove") => {
    action === "add"
      ? addOveride(talent?.overrides)
      : deleteOveride(talent?.overrides);
  };

  return (
    <ListItem>
      <ListItemText primary={talent.name} secondary={talent.description} />

      {talent.uiType === "daily" && (
        <ListItemSecondaryAction>
          <Checkbox
            onClick={() =>
              onCheckBoxChange(talent.name, checked ? "remove" : "add")
            }
            defaultChecked={checked}
          />
        </ListItemSecondaryAction>
      )}
      {talent.uiType === "toggle" && (
        <ListItemSecondaryAction>
          <Switch
            defaultChecked={checked}
            onClick={() => onToggleChange(checked ? "remove" : "add")}
          />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}
