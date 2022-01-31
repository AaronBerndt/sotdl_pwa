import { MenuItem, Select } from "@mui/material";
import React from "react";

type Props = {
  selectFormType: Function;
  formType: string;
};
export default function FormTypeSelector({ selectFormType, formType }: Props) {
  const onChange = (e: any) => selectFormType(e.target.value);

  return (
    <Select value={formType} onChange={onChange} style={{ width: 120 }}>
      {["Ancestry", "Path", "Spell", "Item", "Monster"].map((formType, i) => (
        <MenuItem value={formType.toLowerCase()} key={i}>
          {formType}
        </MenuItem>
      ))}
    </Select>
  );
}


