import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FormTypeSelector from "./Atoms/FormTypeSelector/FormTypeSelector";
import AncestryFormList from "./Organisms/AncestryForm/AncestryForm";
import PathFormList from "./Organisms/PathForm/PathForm";
import SpellFormList from "./Organisms/SpellForm/SpellForm";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function ContentAdderPage() {
  const [formType, setFormType] = useState("ancestry");
  const history = useHistory();

  const formToRender: any = {
    ancestry: <AncestryFormList />,
    path: <PathFormList />,
    item: null,
    spell: <SpellFormList />,
  };

  return (
    <Grid>
      <Grid container item xs={8}>
        <Button onClick={() => history.push("/")}>
          <ArrowBackIcon />
        </Button>
      </Grid>

      <Grid item>
        <FormTypeSelector selectFormType={setFormType} formType={formType} />
      </Grid>
      <Grid>{formToRender[formType]}</Grid>
    </Grid>
  );
}
