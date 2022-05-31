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
import { Autocomplete } from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { uniq } from "lodash";
import { useState } from "react";
import { Ancestry } from "../../../CreateCharacterPage/CreateCharacterSheetPageTypes";
import useEditContent from "../../hooks/useEditContent";
import useEffects from "../../hooks/useEffects";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

function EffectForm({ effect }: any) {
  const { mutate: updateContent, isLoading } = useEditContent("effect");

  return (
    <Formik
      enableReinitialize={true}
      initialValues={effect}
      onSubmit={(values: any) => {
        const { detailChoices, ...rest } = values;
        const choicesArray = detailChoices.map((detailChoice: any) => {
          const { choices, ...choiceRest } = detailChoice;

          return {
            ...choiceRest,
            choices:
              typeof detailChoice.choices === "string"
                ? choices.split("\n")
                : choices,
          };
        });

        const newValues = {
          ...rest,
          detailChoices: choicesArray,
        };

        return updateContent(newValues);
      }}
    >
      {(props: any) => {
        return (
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
            <FieldArray
              name="characteristics"
              render={(arrayHelpers) => (
                <div>
                  {props.values.characteristics.map(
                    (characteristic: any, i: number) => (
                      <div key={i}>
                        <Grid container>
                          <Grid item xs={6}>
                            <Autocomplete
                              options={[
                                "Health",
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
                                "Defense",
                                "Spells",
                                "Traditions",
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
                                <Field
                                  component={TextField}
                                  {...params}
                                  name={`characteristics.${i}.name`}
                                  label="Name"
                                  variant="standard"
                                  fullWidth
                                />
                              )}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              fullWidth
                              name={`characteristics.${i}.value`}
                              label="Value"
                              defaultValue={
                                props.values.characteristics[i].value
                              }
                              value={props.values.characteristics[i].value}
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

            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
            {isLoading && <LinearProgress />}
          </Form>
        );
      }}
    </Formik>
  );
}

export default function EffectFormList() {
  const { data: effects, isLoading } = useEffects();
  const [selectedBook, setSelectedBook] = useState<any>("None");
  const [currentEffect, setCurrentEffect] = useState("Augmented Vitality");

  const classes = useStyles();

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  const onChange = (e: any) => {
    setCurrentEffect(e.target.value);
  };

  const effectFormObject: any = effects
    ? Object.assign(
        {},
        ...Object.values(effects).map((effect: any) => ({
          [effect.name]: () => <EffectForm effect={effect} />,
        }))
      )
    : () => null;

  return (
    <>
      {effects && (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select-book">Book</InputLabel>
            <Select
              id="grouped-select-book"
              onChange={(e) => setSelectedBook(e.target.value)}
              defaultValue="None"
            >
              <MenuItem value="None">None</MenuItem>
              {uniq(effects.map(({ book }: Ancestry) => book)).map(
                (book: any, i) => (
                  <MenuItem value={book} key={i}>
                    {book}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Select Ancestry</InputLabel>
            <Select
              id="grouped-select"
              onChange={onChange}
              defaultValue={currentEffect}
            >
              {effects
                .filter(({ book }: Ancestry) =>
                  selectedBook === "None" ? book : book === selectedBook
                )
                .map((ancestry: Ancestry) => (
                  <MenuItem value={ancestry.name} key={ancestry._id}>
                    {ancestry.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {effects !== null && effectFormObject[currentEffect]()}
        </>
      )}
    </>
  );
}
