import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Character } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import useCharacters from "../../../CharacterSheetPage/hooks/useCharacters";
import useCreateParty from "../../hooks/useCreateParty";

export default function CreatePartyView() {
  const { data: characters, isLoading } = useCharacters();
  const [partyName, setPartyName] = useState("");
  const [partyMembers, setPartyMembers] = useState<string[]>([]);
  const { mutate: createParty } = useCreateParty();

  const createPartyButtonOnClick = () => {
    createParty({ name: partyName, members: partyMembers });
  };

  const onMemberSelect = (e: any) => {
    const values = e.target.value;
    if (values.length !== 0) {
      setPartyMembers((prev: any) => [...prev, ...values]);
    }
  };

  if (isLoading) {
    return <p>Is Loading</p>;
  }
  return (
    <Grid alignContent="center">
      <Grid item>
        <TextField
          label="Party Name"
          variant="outlined"
          onChange={(e) => setPartyName(e.target.value)}
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth focused>
          <InputLabel> Select Party Members</InputLabel>
          <Select
            multiple
            value={partyMembers}
            onChange={onMemberSelect}
            renderValue={(selected: any) => selected.join(", ")}
          >
            {characters.map(({ name, _id }: Character) => (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button onClick={createPartyButtonOnClick}>Create Party</Button>
      </Grid>
    </Grid>
  );
}
