import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import {
  Characteristic,
  Talent,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import { Ancestry } from "../../../CreateCharacterPage/CreateCharacterSheetPageTypes";
import useAncestries from "../../../CreateCharacterPage/hooks/useAncestries";
import useEditContent from "../../hooks/useEditContent";

type Props = {
  ancestry: Ancestry;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

function AncestryForm({ ancestry }: Props): JSX.Element {
  const { mutate: updateContent, isLoading } = useEditContent("ancestry");
  return (
    <Formik
      initialValues={ancestry}
      onSubmit={(values, actions) => {
        console.log(values);
        updateContent(values);
      }}
    >
      {(props: any) => (
        <Form>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={props.values.name}
            onChange={props.handleChange}
            disabled
          />
          <TextField
            fullWidth
            multiline
            id="description"
            name="description"
            label="Description"
            value={props.values.description}
            onChange={props.handleChange}
          />
          <TextField
            fullWidth
            id="book"
            name="book"
            label="Book"
            disabled
            value={props.values.book}
            onChange={props.handleChange}
          />

          <h1>Talents</h1>
          <FieldArray
            name="talents"
            render={(arrayHelpers) => (
              <div>
                {props.values.talents.map((talent: Talent, i: number) => (
                  <div key={i}>
                    <TextField
                      fullWidth
                      id="name"
                      name={`talents.${i}.name`}
                      label="Name"
                      defaultValue={talent.name}
                      onChange={props.handleChange}
                    />
                    <TextField
                      fullWidth
                      multiline
                      name={`talents.${i}.description`}
                      label="Description"
                      defaultValue={talent.description}
                      onChange={props.handleChange}
                    />
                    <TextField
                      fullWidth
                      name={`talents.${i}.level`}
                      label="Level"
                      type="number"
                      defaultValue={talent.level}
                      onChange={props.handleChange}
                    />

                    <Button
                      variant="contained"
                      onClick={() => arrayHelpers.remove(i)}
                    >
                      -
                    </Button>
                  </div>
                ))}
                <Button
                  variant="contained"
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({ name: "", description: "", level: 0 })
                  }
                >
                  Add a Talent
                </Button>
              </div>
            )}
          />
          <h1>Characteristics</h1>
          <FieldArray
            name="characteristics"
            render={(arrayHelpers) => (
              <div>
                {props.values.characteristics.map(
                  (characteristic: Characteristic, i: number) => (
                    <div key={i}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Autocomplete
                            options={[
                              "Strength",
                              "Agility",
                              "Will",
                              "Intellect",
                              "Perception",
                              "Speed",
                              "Size",
                              "Corruption",
                              "Insanity",
                              "Power",
                              "Health",
                            ].map((name) => ({ title: name, value: name }))}
                            defaultValue={{
                              title: characteristic.name,
                              value: characteristic.name,
                            }}
                            getOptionLabel={(option: any) => option.title}
                            onChange={(e, value) => {
                              props.setFieldValue(
                                `characteristics.${i}.name`,
                                value?.title
                              );
                            }}
                            renderInput={(params: any) => (
                              <TextField
                                fullWidth
                                name={`characteristics.${i}.name`}
                                {...params}
                                variant="standard"
                                label="Name"
                                placeholder="Languages"
                                onChange={props.handleChange}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            type="number"
                            name={`characteristics.${i}.value`}
                            label="Value"
                            value={characteristic.value}
                            onChange={props.handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            name={`characteristics.${i}.level`}
                            label="Level"
                            type="number"
                            value={characteristic.level}
                            onChange={props.handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            onClick={() => arrayHelpers.remove(i)}
                          >
                            -
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  )
                )}

                <Button
                  variant="contained"
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({ name: "", value: 0, level: 0 })
                  }
                >
                  Add a Characteristic
                </Button>
              </div>
            )}
          />

          {isLoading && <LinearProgress />}
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default function AncestryFormList() {
  const { data: ancestries, isLoading } = useAncestries();
  const [currentAncestry, setCurrentAncestry] = useState("Dwarf");

  const classes = useStyles();

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  const onChange = (e: any) => {
    setCurrentAncestry(e.target.value);
  };

  const ancestriesFormObject: any = ancestries
    ? Object.assign(
        {},
        ...Object.values(ancestries).map((ancestry: any) => ({
          [ancestry.name]: () => <AncestryForm ancestry={ancestry} />,
        }))
      )
    : () => null;

  console.log(currentAncestry);
  return (
    <>
      {ancestries && (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Select Ancestry</InputLabel>
            <Select
              id="grouped-select"
              onChange={onChange}
              defaultValue={currentAncestry}
            >
              {ancestries.map((ancestry: Ancestry) => (
                <MenuItem value={ancestry.name} key={ancestry._id}>
                  {ancestry.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {ancestries !== null ? ancestriesFormObject[currentAncestry]() : null}
        </>
      )}
    </>
  );
}
