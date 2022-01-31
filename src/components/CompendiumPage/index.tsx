import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormTypeSelector from "../ContentAdderPage/Atoms/FormTypeSelector/FormTypeSelector";
import CompendiumSpellTable from "./Atoms/CompendiumSpellTable/CompendiumSpellTable";

export default function CompendiumPage() {
  const [compendiumType, setCompendiumType] = useState("spell");
  const navigate = useNavigate();

  const formToRender: any = {
    ancestry: null,
    path: null,
    monster: null,
    item: null,
    spell: <CompendiumSpellTable />,
  };

  return (
    <Grid>
      <Grid container item xs={8}>
        <Button onClick={() => navigate("/")}>
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


