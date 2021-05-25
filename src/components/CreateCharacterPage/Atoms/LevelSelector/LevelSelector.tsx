import { FormControl, InputLabel, NativeSelect } from "@material-ui/core";
import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

export default function LevelSelector() {
  const { setLevel } = useCharacterBuilderContext();
  return (
    <FormControl>
      <InputLabel htmlFor="age-native-simple">Level</InputLabel>
      <NativeSelect
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
