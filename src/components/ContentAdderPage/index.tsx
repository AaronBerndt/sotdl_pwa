import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormTypeSelector from "./Atoms/FormTypeSelector/FormTypeSelector";
import AncestryFormList from "./Organisms/AncestryForm/AncestryForm";
import PathFormList from "./Organisms/PathForm/PathForm";
import SpellFormList from "./Organisms/SpellForm/SpellForm";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EffectFormList from "./Organisms/EffectForm/EffectForm";

export default function ContentAdderPage() {
  const [formType, setFormType] = useState("ancestry");
  const navigate = useNavigate();

  const formToRender: any = {
    ancestry: <AncestryFormList />,
    path: <PathFormList />,
    item: null,
    spell: <SpellFormList />,
    effect: <EffectFormList />,
  };

  return (
    <Grid>
      <Grid container item xs={8}>
        <Button onClick={() => navigate("/")}>
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
