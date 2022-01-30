import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

export default function LevelSelector() {
  const { setLevel, level } = useCharacterBuilderContext();
  return (
    <FormControl>
      <InputLabel htmlFor="age-native-simple">Level</InputLabel>
      <NativeSelect
        value={level}
        onChange={(e) => {
          setLevel(e.target.value);
        }}
      >
        {[...Array(11).keys()].map(
          (number, key): JSX.Element => (
            <option value={number} key={key}>
              {key}
            </option>
          )
        )}
      </NativeSelect>
    </FormControl>
  );
}

