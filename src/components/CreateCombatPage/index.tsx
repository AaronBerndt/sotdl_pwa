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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCombatTemplates from "../CombatTrackerPage/hooks/useCombatTemplates";
import useParties from "../ManagePartiesPage/hooks/useParties";
import { Party } from "../ManagePartiesPage/ManagePartiesPageTypes";
import useCreateCombat from "./hooks/useCreateCombat";
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
  const [party, setParty] = useState("");
  const [combatTemplate, setCombatTemplate] = useState("");
  const { data: partiesData, isLoading: partiesIsLoading } = useParties();
  const { mutate: createCombat } = useCreateCombat();
  const { data: templates, isLoading: combatTemplatesIsLoading } =
    useCombatTemplates();

  if (partiesIsLoading || combatTemplatesIsLoading) {
    return <p>...Loading</p>;
  }

  const onPartyChange = (e: any) => {
    setParty(e.target.value);
  };

  const onCombatTemplateChange = (e: any) => {
    setCombatTemplate(e.target.value);
  };

  const onStartCombat = () => {
    if (![party, combatTemplate].includes("")) {
      createCombat({ partyId: party, combatTemplateId: combatTemplate });
    }
  };

  return (
    <Grid container alignContent="center">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-party">Select Party</InputLabel>
        <Select id="select-party" onChange={onPartyChange}>
          {partiesData.map((party: Party) => (
            <MenuItem value={party.name} key={party._id}>
              {party.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-template">
          Select Combat Template
        </InputLabel>
        <Select id="select-template" onChange={onCombatTemplateChange}>
          {templates.map((template: any) => (
            <MenuItem value={template.name} key={template._id}>
              {template.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={onStartCombat}>Create Combat</Button>
    </Grid>
  );
}
