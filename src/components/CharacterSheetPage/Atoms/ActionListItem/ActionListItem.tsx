import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";
import { find } from "lodash";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useUpdateExpendedList from "../../hooks/useUpdateExpendedList";
export type Props = {
  action: Talent;
};
export default function ActionListItem({ action }: Props): JSX.Element {
  const { expended } = useCharacterAttributes();
  const checked = find(expended, { name: action.name }) ? true : false;
  const { mutate: updateExpendedList } = useUpdateExpendedList();

  const onCheckBoxChange = (whatToExpend: string, action: "add" | "remove") => {
    updateExpendedList({
      whatToExpend,
      action,
    });
  };

  return (
    <ListItem>
      <ListItemText primary={action.name} secondary={action.description} />

      {action.description.includes("complete a rest") && (
        <ListItemSecondaryAction>
          <Checkbox
            onClick={() =>
              onCheckBoxChange(action.name, checked ? "remove" : "add")
            }
            defaultChecked={checked}
          />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}
