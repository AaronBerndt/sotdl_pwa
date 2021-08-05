import { Button, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useParams } from "react-router-dom";
import { useCharacter } from "../CharacterSheetPage/hooks/useCharacters";
import { CharacterBuilderProvider } from "./context/CharacterBuilderContext";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SwipeableViews from "react-swipeable-views";
import ChoiceView from "./Organisms/ChoiceView/ChoiceView";
import AdjustAttributesView from "./Organisms/AttributesView/AdjustAttributesView";
import PickSpellsView from "./Organisms/PickSpellsView/PickSpellsView";
import PickEquipmentView from "./Organisms/PickEquipmentView/PickEquipmentView";
import PickDetailsView from "./Organisms/PickDetailsView/PickDetailsView";

export default function CreateCharacterPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { characterId } = useParams<any>();

  const { data: characterData } = useCharacter(characterId);

  /* const characterData: any = queryClient.getQueryData([ */
  /*   FETCH_CHARACTER_KEY, */
  /*   parseInt(characterId), */
  /* ]); */

  const buildSteps = [
    "Ancestry&Paths",
    "Adjust Attributes",
    "Equipment",
    "Spells",
    "Details",
    "Wrap Up",
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  const newPath = `${url}/${buildSteps[activeStep]}`;
  useEffect(() => {
    history.push(newPath);
  }, [history, newPath]);

  return (
    <Grid>
      <CharacterBuilderProvider
        values={
          url.includes("edit_character") ? { ...characterData?.data } : {}
        }
      >
        {/* <AppBar>{buildSteps[activeStep]}</AppBar> */}
        <Grid container item xs={8}>
          <Button onClick={() => history.push("/")}>
            <ArrowBackIcon />
          </Button>
        </Grid>

        <SwipeableViews
          index={activeStep}
          enableMouseEvents
          onChangeIndex={(index) => {
            setActiveStep(index);
          }}
        >
          <ChoiceView />
          <AdjustAttributesView />
          <PickSpellsView />
          <PickEquipmentView />
          <PickDetailsView />
        </SwipeableViews>

        <StepperFooter
          steps={buildSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </CharacterBuilderProvider>
    </Grid>
  );
}
