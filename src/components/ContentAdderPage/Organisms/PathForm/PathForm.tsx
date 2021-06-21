import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import {
  Characteristic,
  Talent,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import { Path } from "../../../CreateCharacterPage/CreateCharacterSheetPageTypes";
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
  const { mutate: updateContent } = useEditContent("path");

  return (
    <Formik
      initialValues={path}
      onSubmit={(values, actions) => {
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
                      name={`talents.${i}.name`}
                      label="Name"
                      defaultValue={talent.name}
                    />
                    <TextField
                      fullWidth
                      multiline
                      name={`talents.${i}.description`}
                      label="Description"
                      defaultValue={talent.description}
                    />
                    <TextField
                      fullWidth
                      name={`talents.${i}.level`}
                      label="Level"
                      type="number"
                      defaultValue={talent.level}
                    />

                    <Button
                      variant="contained"
                      onClick={() => arrayHelpers.remove(i)}
                    >
                      -
                    </Button>
                  </div>
                ))}
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
                            type="number"
                            name={`characteristic.${i}.value`}
                            label="Value"
                            value={characteristic.value}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            name={`characteristic.${i}.level`}
                            label="Level"
                            type="number"
                            value={characteristic.level}
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
                  Add a Talent
                </Button>
              </div>
            )}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default function PathFormList() {
  const { data: paths, isLoading } = usePaths();
  const [currentPath, setCurrentPath] = useState("");

  const classes = useStyles();

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  const onChange = (e: any) => {
    setCurrentPath(e.target.value);
  };

  const ancestriesFormObject: any = paths
    ? Object.assign(
        {},
        ...Object.values(paths).map((ancestry: any) => ({
          [ancestry.name]: <PathForm path={ancestry} />,
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
            <InputLabel htmlFor="grouped-select">Select Path</InputLabel>
            <Select
              id="grouped-select"
              onChange={onChange}
              defaultValue={paths[0].name}
            >
              {paths.map((ancestry: Path) => (
                <MenuItem value={ancestry.name} key={ancestry._id}>
                  {ancestry.name}
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
