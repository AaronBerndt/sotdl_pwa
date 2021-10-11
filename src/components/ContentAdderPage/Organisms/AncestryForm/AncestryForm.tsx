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
import { Field, FieldArray, Form, Formik } from "formik";
import { uniq } from "lodash";
import React, { useState } from "react";
import {
  Characteristic,
  Talent,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import {
  Ancestry,
  DetailChoice,
} from "../../../CreateCharacterPage/CreateCharacterSheetPageTypes";
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

function AncestryForm({ ancestry }: Props) {
  const { mutate: updateContent, isLoading } = useEditContent("ancestry");

  return (
    <Formik
      enableReinitialize={true}
      initialValues={ancestry}
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
                        value={props.values.talents[i].name}
                        defaultValue={props.values.talents[i].name}
                        onChange={props.handleChange}
                      />
                      <TextField
                        fullWidth
                        multiline
                        name={`talents.${i}.description`}
                        label="Description"
                        value={props.values.talents[i].description}
                        defaultValue={props.values.talents[i].description}
                        onChange={props.handleChange}
                      />
                      <TextField
                        fullWidth
                        name={`talents.${i}.level`}
                        label="Level"
                        type="number"
                        value={props.values.talents[i].level}
                        defaultValue={props.values.talents[i].level}
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
                            <TextField
                              fullWidth
                              name={`characteristics.${i}.level`}
                              label="Level"
                              type="number"
                              defaultValue={
                                props.values.characteristics[i].level
                              }
                              value={props.values.characteristics[i].level}
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

            <h1>Detail Choices</h1>
            <FieldArray
              name="detailChoices"
              render={(arrayHelpers) => (
                <div>
                  {props.values.detailChoices.map(
                    (detailChoice: DetailChoice, i: number) => (
                      <div key={i}>
                        <Grid container>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="name"
                              name={`detailChoices.${i}.name`}
                              label="Name"
                              defaultValue={props.values.detailChoices[i].name}
                              value={props.values.detailChoices[i].name}
                              onChange={props.handleChange}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              fullWidth
                              name={`detailChoices.${i}.dice`}
                              label="Dice"
                              defaultValue={props.values.detailChoices[i].dice}
                              value={props.values.detailChoices[i].dice}
                              onChange={props.handleChange}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              fullWidth
                              name={`detailChoices.${i}.origin`}
                              label="Origin"
                              defaultValue={
                                props.values.detailChoices[i].origin
                              }
                              value={props.values.detailChoices[i].origin}
                              onChange={props.handleChange}
                              disabled
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              fullWidth
                              multiline
                              name={`detailChoices.${i}.choices`}
                              label="Choices"
                              defaultValue={
                                typeof detailChoice.choices === "string"
                                  ? props.values.detailChoices[i].choices
                                  : props.values.detailChoices[i].choices.join(
                                      "\n"
                                    )
                              }
                              value={
                                typeof detailChoice.choices === "string"
                                  ? props.values.detailChoices[i].choices
                                  : props.values.detailChoices[i].choices.join(
                                      "\n"
                                    )
                              }
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
                      arrayHelpers.push({
                        name: "",
                        dice: "3d6",
                        origin: "Ancestry",
                        choices: ["Test"],
                      })
                    }
                  >
                    Add a Choice
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

export default function AncestryFormList() {
  const { data: ancestries, isLoading } = useAncestries();
  const [currentAncestry, setCurrentAncestry] = useState("Dwarf");
  const [selectedBook, setSelectedBook] = useState<any>("None");

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

  return (
    <>
      {ancestries && (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select-book">Book</InputLabel>
            <Select
              id="grouped-select-book"
              onChange={(e) => setSelectedBook(e.target.value)}
              defaultValue="None"
            >
              <MenuItem value="None">None</MenuItem>
              {uniq(ancestries.map(({ book }: Ancestry) => book)).map(
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
              defaultValue={currentAncestry}
            >
              {ancestries
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
          {ancestries !== null && ancestriesFormObject[currentAncestry]()}
        </>
      )}
    </>
  );
}
