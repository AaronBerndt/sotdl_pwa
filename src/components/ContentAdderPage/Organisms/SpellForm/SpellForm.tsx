import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Spell } from "../../../CharacterSheetPage/Shared/SharedTypes";
import useSpells from "../../../CreateCharacterPage/hooks/useSpells";
import useEditContent from "../../hooks/useEditContent";

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
  const { mutate: updateContent } = useEditContent("spell");
  return (
    <Formik
      initialValues={spell}
      onSubmit={(values, actions) => {
        updateContent(values);
      }}
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
            />
          )}

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default function SpellFormList() {
  const { data: spells, isLoading } = useSpells();
  const [currentSpell, setCurrentSpell] = useState("");

  const classes = useStyles();

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  const onChange = (e: any) => {
    setCurrentSpell(e.target.value);
  };

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
            <InputLabel htmlFor="grouped-select">Select Spell</InputLabel>
            <Select
              id="grouped-select"
              onChange={onChange}
              defaultValue={spells[0].name}
            >
              {spells.map((spell: Spell) => (
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
