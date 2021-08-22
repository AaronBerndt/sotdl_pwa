import { Button, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useParams } from "react-router-dom";
import { useCharacter } from "../CharacterSheetPage/hooks/useCharacters";
import {
  CharacterBuilderProvider,
  useCharacterBuilderContext,
} from "./context/CharacterBuilderContext";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SwipeableViews from "react-swipeable-views";
import ChoiceView from "./Organisms/ChoiceView/ChoiceView";
import PickSpellsView from "./Organisms/PickSpellsView/PickSpellsView";
import PickEquipmentView from "./Organisms/PickEquipmentView/PickEquipmentView";
import PickDetailsView from "./Organisms/PickDetailsView/PickDetailsView";
import { Talent } from "../CharacterSheetPage/CharacterSheetPageTypes";
import AdjustAttributesView from "./Organisms/AttributesView/AdjustAttributesView";

export default function CreateCharacterPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { characterId } = useParams<any>();

  const { data: characterData } = useCharacter(characterId);
  const { talents } = useCharacterBuilderContext();

  const buildSteps = [
    "Ancestry&Paths",
    "Adjust Attributes",
    "Equipment",
    "Spells",
    "Details",
    "Wrap Up",
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <CharacterBuilderProvider
      values={url.includes("edit_character") ? { ...characterData?.data } : {}}
    >
      <Grid>
        <Grid container item xs={8}>
          <Button onClick={() => history.push("/")}>
            <ArrowBackIcon />
          </Button>
        </Grid>

        <Grid item>
          <SwipeableViews
            index={activeStep}
            enableMouseEvents
            onChangeIndex={(index) => {
              setActiveStep(index);
              window.scrollTo(0, 0);
            }}
          >
            <ChoiceView />
            <AdjustAttributesView />
            <PickSpellsView />
            <PickEquipmentView />
            <PickDetailsView />
          </SwipeableViews>
        </Grid>
      </Grid>
      <Grid>
        <StepperFooter
          steps={buildSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </Grid>
    </CharacterBuilderProvider>
  );
}
