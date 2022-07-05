import { DialogContent, Grid } from "@material-ui/core";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  TextField,
} from "@mui/material";
import { Field, Form, Formik, FormikFormProps, useFormikContext } from "formik";
import { find } from "lodash";
import DifficultyBox from "../../../CombatBuilderPage/Molecules/DifficultyBox/DifficultyBox";
import useToggle from "../../../hooks/useToggle";
import useParties from "../../../ManagePartiesPage/hooks/useParties";
import { Party } from "../../../ManagePartiesPage/ManagePartiesPageTypes";
import useFetchCombatTemplates from "../../hooks/useCombatTemplates";
import useCreateCombat from "../../hooks/useCreateCombat";

export default function CreateCombatModal() {
  const { open, toggleOpen } = useToggle();
  const { mutate: createCombat } = useCreateCombat();
  const { data: combatTemplates, isLoading: combatTemplatesIsLoading } =
    useFetchCombatTemplates();
  const { data: parties, isLoading: partiesIsLoading } = useParties();

  const values: any = {};
  const context = useFormikContext();
  console.log(context, values, combatTemplates);

  const onSubmit = (values: FormikFormProps) => {
    console.log(values);
  };

  if (partiesIsLoading && combatTemplatesIsLoading) {
    return <p>Is Loading</p>;
  }

  console.log(values);
  return (
    <>
      <Dialog fullScreen open={open} onClose={() => toggleOpen()}>
        <DialogContent>
          <Grid container alignContent="center">
            <Formik
              onSubmit={onSubmit}
              initialValues={{ partyId: "", combatTemplateId: "" }}
            >
              {(props: any) => (
                <Form>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={parties.map((party: Party) => ({
                        title: party.name,
                        value: party._id,
                      }))}
                      getOptionLabel={(option: any) => option.title}
                      onChange={(e, value) => {
                        props.setFieldValue(`partyId`, value?.title);
                      }}
                      renderInput={(params: any) => (
                        <Field
                          component={TextField}
                          {...params}
                          name={`partyId`}
                          label="Party"
                          variant="standard"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={combatTemplates.map((template: any) => ({
                        name: template.name,
                        value: template._id,
                      }))}
                      getOptionLabel={(option: any) => option.title}
                      onChange={(e, value) => {
                        props.setFieldValue(`combatTemplateId`, value?.title);
                      }}
                      renderInput={(params: any) => (
                        <Field
                          component={TextField}
                          {...params}
                          name={`combatTemplateId`}
                          label="Combat Template"
                          variant="standard"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                </Form>
              )}
            </Formik>
            {values["combatTemplateId"] && (
              <DifficultyBox
                monstersInCombat={
                  find(combatTemplates, {
                    _id: values["combatTemplateId"],
                  }).monstersInCombat
                }
              />
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOpen()}>Cancel</Button>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => toggleOpen()}
        fullWidth
      >
        Create New Combat
      </Button>
    </>
  );
}
