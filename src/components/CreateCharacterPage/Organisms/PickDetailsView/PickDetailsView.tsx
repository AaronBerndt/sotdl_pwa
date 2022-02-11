import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@material-ui/core";
import useParties from "../../../ManagePartiesPage/hooks/useParties";
import { Party } from "../../../ManagePartiesPage/ManagePartiesPageTypes";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import ProfessionsForm from "../../Molecules/ProfessionsForm/ProfessionsForm";

export default function PickDetailsView() {
  const { name, setName, party, setPartyName, languages } =
    useCharacterBuilderContext();
  const { data: parties, isLoading } = useParties();

  const onNameTextFieldChange = (e: any) => {
    setName(e.target.value);
  };

  const onPartySelectChange = (e: any) => {
    setPartyName(e.target.value);
  };

  const onLanguagesSelectChange = (e: any) => {
    setPartyName(e.target.value);
  };

  return (
    <Grid style={{ paddingLeft: "20px" }} spacing={2}>
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
            <InputLabel variant="standard" htmlFor="language">
              Languages
            </InputLabel>
            <Select
              multiple
              variant="outlined"
              inputProps={{
                name: "language",
                id: "language",
              }}
              defaultValue={languages}
              onChange={onLanguagesSelectChange}
            >
              {[
                "Common",
                "Dark Speech",
                "Dwarfish",
                "Elvish",
                "High Archaic",
                "Trollish",
                "Secret Language",
                "Dead Languages:",
              ].map((language: string, i: number) => (
                <MenuItem value={language} key={i}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid container>
        <ProfessionsForm />
      </Grid>
    </Grid>
  );
}
