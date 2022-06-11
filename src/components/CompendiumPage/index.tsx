import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FormTypeSelector from "../ContentAdderPage/Atoms/FormTypeSelector/FormTypeSelector";
import CompendiumSpellTable from "./Atoms/CompendiumSpellTable/CompendiumSpellTable";
import AncestryList from "../CreateCharacterPage/Molecules/AncestryList/AncestryList";
import PathsList from "../CreateCharacterPage/Molecules/PathsList/PathsList";
import PickEquipmentView from "../CreateCharacterPage/Organisms/PickEquipmentView/PickEquipmentView";
import BottomNav from "../CharactersPage/Organisms/BottomNav/BottomNav";

export default function CompendiumPage() {
  const [compendiumType, setCompendiumType] = useState("spell");
  const navigate = useNavigate();

  const formToRender: any = {
    ancestry: <AncestryList toggleClose={Function} compendiumView={true} />,
    path: (
      <PathsList
        toggleClose={Function}
        pathType="Novice"
        compendiumView={true}
      />
    ),
    monster: null,
    item: <PickEquipmentView compendiumView={true} />,
    spell: <CompendiumSpellTable />,
  };

  return (
    <Grid>
      <Grid item style={{ paddingLeft: "10px" }}>
        <FormTypeSelector
          selectFormType={setCompendiumType}
          formType={compendiumType}
        />
      </Grid>
      <Grid>{formToRender[compendiumType]}</Grid>
      <BottomNav />
    </Grid>
  );
}
