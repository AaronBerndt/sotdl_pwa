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
  DetailChoice,
  Path,
} from "../../../CreateCharacterPage/CreateCharacterSheetPageTypes";
import usePaths from "../../../CreateCharacterPage/hooks/usePaths";
import useEditContent from "../../hooks/useEditContent";

type Props = {
  path: Path;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

function PathForm({ path }: Props) {
  const { mutate: updateContent, isLoading } = useEditContent("path");

  console.log(path);
  return (
    <Formik
      enableReinitialize
      initialValues={path}
      onSubmit={(values) => {
        const { detailChoices, ...rest } = values;
        const choicesArray = detailChoices.map((detailChoice: any) => {
          const { choices, ...choiceRest } = detailChoice;

          return {
            ...choiceRest,
            choices:
              typeof detailChoice.choices === "string"
                ? choices.split(",")
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
      {(props: any) => (
        <Form>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={props.values.name}
            disabled
          />
          <TextField
            fullWidth
            multiline
            id="type"
            name="type"
            label="Type"
            value={props.values.type}
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
            value={props.values.book}
            disabled
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
                            defaultValue={props.values.characteristics[i].value}
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
                            defaultValue={props.values.characteristics[i].level}
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
                        <Grid item xs={1}>
                          <Button
                            variant="contained"
                            onClick={() => arrayHelpers.remove(i)}
                          >
                            -
                          </Button>
                        </Grid>
                      </Grid>

                      <Grid style={{ paddingTop: "5px" }}>
                        <FieldArray
                          name={`detailChoices.${i}.choices`}
                          render={(arrayHelpers) => (
                            <>
                              <Grid container>
                                {props.values.detailChoices[i].choices.map(
                                  (choice: string, choice_i: number) => (
                                    <>
                                      <Grid item xs={11}>
                                        <TextField
                                          fullWidth
                                          name={`detailChoices.${i}.choices.${choice_i}`}
                                          defaultValue={
                                            props.values.detailChoices[i]
                                              .choices[choice_i]
                                          }
                                          value={choice}
                                          onChange={props.handleChange}
                                        />
                                      </Grid>{" "}
                                      <Grid item xs={1}>
                                        <Button
                                          variant="contained"
                                          onClick={() =>
                                            arrayHelpers.remove(choice_i)
                                          }
                                        >
                                          -
                                        </Button>
                                      </Grid>
                                    </>
                                  )
                                )}
                              </Grid>

                              <Button
                                variant="contained"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Add a Choice
                              </Button>
                            </>
                          )}
                        />
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
                      origin: "Path",
                      choices: [""],
                    })
                  }
                >
                  Add a Choice Group
                </Button>
              </div>
            )}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          {isLoading && <LinearProgress />}
        </Form>
      )}
    </Formik>
  );
}

export default function PathFormList() {
  const { data: paths, isLoading } = usePaths();
  const [currentPath, setCurrentPath] = useState("");
  const [path, setPath] = useState<any>("Novice");
  const [selectedBook, setSelectedBook] = useState<any>("None");

  const classes = useStyles();

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  const onChange = (e: any) => setCurrentPath(e.target.value);

  const ancestriesFormObject: any = paths
    ? Object.assign(
        {},
        ...Object.values(paths).map((path: any) => ({
          [path.name]: <PathForm path={path} />,
        })),
        {
          default: <PathForm path={paths[0]} />,
        }
      )
    : null;

  return (
    <>
      {paths && (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select
              id="grouped-select"
              onChange={(e) => setPath(e.target.value)}
              defaultValue={path}
            >
              {uniq(paths.map(({ type }: Path) => type)).map((type: any, i) => (
                <MenuItem value={type} key={i}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select-book">Book</InputLabel>
            <Select
              id="grouped-select-book"
              onChange={(e) => setSelectedBook(e.target.value)}
              defaultValue="None"
            >
              <MenuItem value="None">None</MenuItem>
              {uniq(paths.map(({ book }: Path) => book)).map((book: any, i) => (
                <MenuItem value={book} key={i}>
                  {book}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Select Path</InputLabel>
            <Select id="grouped-select" onChange={onChange}>
              {paths
                .filter(({ type }: Path) => type === path)
                .filter(({ book }: Path) =>
                  selectedBook === "None" ? book : book === selectedBook
                )
                .map((path: Path) => (
                  <MenuItem value={path.name} key={path._id}>
                    {path.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {ancestriesFormObject[currentPath === "" ? "default" : currentPath]}
        </>
      )}
    </>
  );
}
