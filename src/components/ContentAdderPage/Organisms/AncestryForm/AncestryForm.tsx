import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { useFormik } from "formik";
import { find, uniq } from "lodash";
import React, { useEffect, useState } from "react";
import { Ancestry } from "../../../CreateCharacterPage/CreateCharacterSheetPageTypes";
import useAncestries from "../../../CreateCharacterPage/hooks/useAncestries";

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
  console.log(ancestry);
  const formik = useFormik({
    initialValues: ancestry
      ? ancestry
      : {
          name: "",
          description: "",
          characteristics: [],
          talents: [],
          detailChoices: [],
          book: "",
        },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
}
export default function AncestryFormList(): JSX.Element {
  const { data: ancestries, isLoading } = useAncestries();
  const [currentAncestry, setCurrentAncestry] = useState("");

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
          [ancestry.name]: <AncestryForm ancestry={ancestry} />,
        })),
        {
          default: <AncestryForm ancestry={ancestries[0]} />,
        }
      )
    : null;

  console.log(currentAncestry, ancestriesFormObject);
  return (
    <>
      {ancestries && (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Select Ancestry</InputLabel>
            <Select
              id="grouped-select"
              onChange={onChange}
              defaultValue={ancestries[0].name}
            >
              {ancestries.map((ancestry: Ancestry) => (
                <MenuItem value={ancestry.name} key={ancestry._id}>
                  {ancestry.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {
            ancestriesFormObject[
              currentAncestry === "" ? "default" : currentAncestry
            ]
          }
        </>
      )}
    </>
  );
}
