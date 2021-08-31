import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SpellCompendiumView from "./Organisms/SpellCompendiumView/SpellCompendiumView";
import FormTypeSelector from "../ContentAdderPage/Atoms/FormTypeSelector/FormTypeSelector";

export default function ContentAdderPage() {
  const [compendiumType, setCompendiumType] = useState("spells");
  const history = useHistory();

  const formToRender: any = {
    ancestry: null,
    path: null,
    monster: null,
    item: null,
    spell: <SpellCompendiumView />,
  };

  return (
    <Grid>
      <Grid container item xs={8}>
        <Button onClick={() => history.push("/")}>
          <ArrowBackIcon />
        </Button>
      </Grid>

      <Grid item>
        <FormTypeSelector
          selectFormType={setCompendiumType}
          formType={compendiumType}
        />
      </Grid>
      <Grid>{formToRender[compendiumType]}</Grid>
    </Grid>
  );
}
