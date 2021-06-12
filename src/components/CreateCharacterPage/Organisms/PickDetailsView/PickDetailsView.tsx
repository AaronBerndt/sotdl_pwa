import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { DetailChoice } from "../../CreateCharacterSheetPageTypes";

const useStyles = makeStyles(() => ({
  root: {
    whiteSpace: "unset",
    wordBreak: "break-all",
  },
}));

export default function PickDetailsView() {
  const classes = useStyles();
  const { name, setName, detailChoices } = useCharacterBuilderContext();
  const onNameTextFieldChange = (e: any) => {
    setName(e.target.name);
  };

  const onInterestingThingTextFieldChange = (e: any) => {
    setName(e.target.name);
  };

  return (
    <Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          defaultValue={name}
          onChange={onNameTextFieldChange}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="One Unquie Thing"
          variant="outlined"
          defaultValue={name}
          onChange={onInterestingThingTextFieldChange}
        />
      </Grid>
      {detailChoices.map(({ name, choices }: DetailChoice) => (
        <Grid item>
          <FormControl>
            <InputLabel>{name}</InputLabel>

            <Select classes={{ root: classes.root }}>
              {choices.map((name) => (
                <MenuItem
                  value={name}
                  classes={{ root: classes.root }}
                  key={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
}
