import { MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import tranditionList from "../../../CharacterSheetPage/Shared/Tranditions";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
export default function TranditionSelect() {
  const [choices, setChoices] = useState<string[]>([]);
  const { setTranditions } = useCharacterBuilderContext();

  const choiceLimit = 10;
  const onChoiceSelect = (e: any) => {
    const values = e.target.value;
    if (values.length !== 0) {
      setChoices(values);
      setTranditions((prev: any) => [...prev, ...values]);
    }
  };

  return (
    <Select
      multiple
      value={choices}
      onChange={onChoiceSelect}
      renderValue={(selected: any) =>
        selected.length >= 3
          ? `${selected[0]},${selected[1]}, ...${selected.length - 2} more`
          : selected.join(", ")
      }
    >
      {tranditionList.map((name) => (
        <MenuItem
          key={name}
          value={name}
          disabled={choices.length === choiceLimit && !choices.includes(name)}
        >
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}
