import { MenuItem, Select } from "@material-ui/core";
import React from "react";

type Props = {
  selectFormType: Function;
};
export default function FormTypeSelector({ selectFormType }: Props) {
  const onChange = (e: any) => selectFormType(e.target.value);

  return (
    <Select defaultValue="Ancestry" onChange={onChange} style={{ width: 120 }}>
      {["Ancestry", "Path", "Spell", "Item"].map((formType, i) => (
        <MenuItem value={formType.toLowerCase()} key={i}>
          {formType}
        </MenuItem>
      ))}
    </Select>
  );
}
