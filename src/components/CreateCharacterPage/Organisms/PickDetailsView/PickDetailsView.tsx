import { Grid, makeStyles, TextField } from "@material-ui/core";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

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
