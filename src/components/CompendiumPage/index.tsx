import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FormTypeSelector from "../ContentAdderPage/Atoms/FormTypeSelector/FormTypeSelector";
import SpellsTable from "../CharacterSheetPage/Molecules/SpellsTable/SpellsTable";

export default function CompendiumPage() {
  const [compendiumType, setCompendiumType] = useState("spell");
  const history = useHistory();

  const formToRender: any = {
    ancestry: null,
    path: null,
    monster: null,
    item: null,
    spell: <SpellsTable compendium={true} />,
  };

  return (
    <Grid>
      <Grid container item xs={8}>
        <Button onClick={() => history.push("/")}>
          <ArrowBackIcon />
        </Button>
      </Grid>

      <Grid item style={{ paddingLeft: "10px" }}>
        <FormTypeSelector
          selectFormType={setCompendiumType}
          formType={compendiumType}
        />
      </Grid>
      <Grid>{formToRender[compendiumType]}</Grid>
    </Grid>
  );
}
