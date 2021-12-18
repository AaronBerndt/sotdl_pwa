import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate, useParams, useRouteMatch } from "react-router-dom";
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
import AdjustAttributesView from "./Organisms/AttributesView/AdjustAttributesView";
import LevelSelector from "./Atoms/LevelSelector/LevelSelector";
import useCreateRandomCharacter from "./hooks/useCreateRandomCharacter";

type Props = {
  characterData?: any;
};

function CreateRandomCharacterContent() {
  const navigate = useNavigate();
  const { mutate: createRandomCharacter } = useCreateRandomCharacter();
  const { level } = useCharacterBuilderContext();
  return (
    <Button
      onClick={() => {
        createRandomCharacter({ level });
        navigate("/");
      }}
    >
      Randomize Character
    </Button>
  );
}

function PageContent({ characterData }: Props) {
  const [showCreateCharacter, setShowCreateCharacter] = useState(characterData);
  const navigate = useNavigate();

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
      values={characterData ? { ...characterData?.data } : {}}
    >
      {!showCreateCharacter ? (
        <Grid>
          <Grid>
            <LevelSelector />
            <Grid>
              <Button onClick={() => setShowCreateCharacter(true)}>
                Create Character
              </Button>
            </Grid>
            <Grid>
              <CreateRandomCharacterContent />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid style={{ paddingBottom: "20px" }}>
            <Grid container item xs={8}>
              <Button onClick={() => navigate("/")}>
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
          <Grid style={{ paddingTop: "30px" }}>
            <StepperFooter
              steps={buildSteps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </Grid>
        </>
      )}
    </CharacterBuilderProvider>
  );
}

function EditCharacterWrapper() {
  const { characterId } = useParams<any>();
  const { data: characterData, isLoading } = useCharacter(characterId);

  if (isLoading) {
    return <p>...Loading</p>;
  }
  return <PageContent characterData={characterData} />;
}

export default function CreateCharacterPage() {
  const { url } = useRouteMatch();

  return (
    <>
      {url.includes("edit_character") ? (
        <EditCharacterWrapper />
      ) : (
        <PageContent />
      )}
    </>
  );
}
