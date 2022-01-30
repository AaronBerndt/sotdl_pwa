import {
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import useParties from "../../../ManagePartiesPage/hooks/useParties";
import { Party } from "../../../ManagePartiesPage/ManagePartiesPageTypes";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

export default function PickDetailsView() {
  const { name, setName, party, setPartyName } = useCharacterBuilderContext();
  const { data: parties, isLoading } = useParties();

  const onNameTextFieldChange = (e: any) => {
    setName(e.target.value);
  };

  const onPartySelectChange = (e: any) => {
    setPartyName(e.target.value);
  };

  return (
    <Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Name"
          defaultValue={name}
          onChange={onNameTextFieldChange}
        />
      </Grid>
      <Grid item>
        {!isLoading && (
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="party">
              Party
            </InputLabel>
            <NativeSelect
              variant="outlined"
              inputProps={{
                name: "party",
                id: "party",
              }}
              defaultValue={party}
              onChange={onPartySelectChange}
            >
              {parties.map((party: Party, i: number) => (
                <option value={party._id} key={i}>
                  {party.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        )}
      </Grid>
      <Grid item>
        {!isLoading && (
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="party">
              Languages
            </InputLabel>
            <NativeSelect
              variant="outlined"
              inputProps={{
                name: "party",
                id: "party",
              }}
              defaultValue={party}
              onChange={onPartySelectChange}
            >
              {parties.map((party: Party, i: number) => (
                <option value={party._id} key={i}>
                  {party.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        )}
      </Grid>
    </Grid>
  );
}

