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
import { useNavigate, useParams } from "react-router-dom";
import { Character } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import useCharacters from "../../../CharacterSheetPage/hooks/useCharacters";
import useEditParty from "../../hooks/useEditParty";
import { useParty } from "../../hooks/useParties";

export default function EditPartyView() {
  const navigate = useNavigate();
  const { partyId }: any = useParams<any>();
  const { data: party }: any = useParty(partyId);
  const { data: characters, isLoading } = useCharacters();

  const [partyName, setPartyName] = useState(!isLoading ? party?.name : "");
  const [partyMembers, setPartyMembers] = useState<string[]>(
    !isLoading ? party?.members : []
  );
  const { mutate: editParty } = useEditParty();

  const createPartyButtonOnClick = () => {
    editParty({ _id: partyId, name: partyName, members: partyMembers });
    navigate(`/manage_parties/`);
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
