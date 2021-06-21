import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import FormTypeSelector from "./Atoms/FormTypeSelector/FormTypeSelector";
import AncestryFormList from "./Organisms/AncestryForm/AncestryForm";
import PathFormList from "./Organisms/PathForm/PathForm";
import SpellFormList from "./Organisms/SpellForm/SpellForm";

export default function ContentAdderPage() {
  const [formType, setFormType] = useState("ancestry");

  const formToRender: any = {
    ancestry: <AncestryFormList />,
    path: <PathFormList />,
    item: null,
    spell: <SpellFormList />,
  };

  return (
    <Grid>
      <Grid item>
        <FormTypeSelector selectFormType={setFormType} formType={formType} />
      </Grid>
      <Grid>{formToRender[formType]}</Grid>
    </Grid>
  );
}
