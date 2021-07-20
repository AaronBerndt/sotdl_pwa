import { Grid, TextField } from "@material-ui/core";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

export default function PickDetailsView() {
  const { name, setName } = useCharacterBuilderContext();
  const onNameTextFieldChange = (e: any) => {
    setName(e.target.value);
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
    </Grid>
  );
}
