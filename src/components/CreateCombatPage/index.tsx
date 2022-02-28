import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useParties from "./hooks/useParties";
import { Party } from "./ManagePartiesPageTypes";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function CreateCombatPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { data: partiesData, isLoading } = useParties();
  const { data: partiesData, isLoading } = useParties();

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const onStartCombat = () => {};

  return (
    <Grid container alignContent="center">
      <Formik
        enableReinitialize
        initialValues={{ party: "", template: "" }}
        onSubmit={(values) => updateContent(values)}
      >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-select">Select Party</InputLabel>
          <Select id="grouped-select" onChange={onChange}>
            {partiesData.map((party: Party) => (
              <MenuItem value={party.name} key={party._id}>
                {party.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-select">Select Party</InputLabel>
          <Select id="grouped-select" onChange={onChange}>
            {partiesData.map((party: Party) => (
              <MenuItem value={party.name} key={party._id}>
                {party.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button>Start Combat</Button>
      </Formik>
    </Grid>
  );
}
