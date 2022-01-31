import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import { Spell } from "../../../CharacterSheetPage/Shared/SharedTypes";
import useSpells from "../../../CreateCharacterPage/hooks/useSpells";
import useEditContent from "../../hooks/useEditContent";
import { uniq } from "lodash";
import { Property } from "../../../CharacterSheetPage/CharacterSheetPageTypes";

type Props = {
  spell: Spell;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

function SpellForm({ spell }: Props) {
  const { mutate: updateContent, isLoading } = useEditContent("spell");
  return (
    <Formik
      enableReinitialize
      initialValues={spell}
      onSubmit={(values) => updateContent(values)}
    >
      {(props: any) => (
        <Form>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={props.values.name}
            disabled
          />
          <TextField
            fullWidth
            name="tradition"
            label="Trandition"
            disabled
            value={props.values.tradition}
          />
          <TextField
            fullWidth
            name="level"
            label="Level"
            disabled
            value={props.values.level}
          />

          <TextField
            fullWidth
            name="book"
            label="Book"
            disabled
            value={props.values.book}
            onChange={props.handleChange}
          />
          <TextField
            fullWidth
            name="type"
            label="Type"
            disabled
            value={props.values.type}
            onChange={props.handleChange}
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
          {props.values.type === "Attack" && (
            <TextField
              fullWidth
              name="damage"
              label="Damage"
              value={props?.values.damage}
              onChange={props.handleChange}
            />
          )}

          <h1>Spell Properties</h1>
          <FieldArray
            name="properties"
            render={(arrayHelpers) => (
              <div>
                {props.values.properties.map(
                  (property: Property, i: number) => (
                    <div key={i}>
                      <Grid container>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="name"
                            name={`properties.${i}.name`}
                            label="Name"
                            defaultValue={props.values.properties[i].name}
                            value={props.values.properties[i].name}
                            onChange={props.handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            name={`properties.${i}.description`}
                            label="Description"
                            defaultValue={
                              props.values.properties[i].description
                            }
                            value={props.values.properties[i].description}
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
                      description: "",
                    })
                  }
                >
                  Add a Property
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

export default function SpellFormList() {
  const { data: spells, isLoading } = useSpells(
    { name: "", value: "" },
    undefined,
    true
  );
  const [currentSpell, setCurrentSpell] = useState("");
  const [tradition, setTrandition] = useState<any>("Arcana");

  const classes = useStyles();

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  const onChange = (e: any) => setCurrentSpell(e.target.value);

  const ancestriesFormObject: any = spells
    ? Object.assign(
        {},
        ...Object.values(spells).map((ancestry: any) => ({
          [ancestry.name]: <SpellForm spell={ancestry} />,
        })),
        {
          default: <SpellForm spell={spells[0]} />,
        }
      )
    : null;

  return (
    <>
      {spells && (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select
              id="grouped-select"
              onChange={(e) => setTrandition(e.target.value)}
              defaultValue={tradition}
            >
              {uniq(spells.map(({ tradition }: Spell) => tradition)).map(
                (tradition: any, i) => (
                  <MenuItem value={tradition} key={i}>
                    {tradition}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Select Spell</InputLabel>
            <Select id="grouped-select" onChange={onChange}>
              {spells
                .filter(
                  ({ tradition: spellTrandition }: Spell) =>
                    spellTrandition === tradition
                )
                .map((spell: Spell) => (
                  <MenuItem value={spell.name} key={spell._id}>
                    {spell.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {ancestriesFormObject[currentSpell === "" ? "default" : currentSpell]}
        </>
      )}
    </>
  );
}

