import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useParams } from "react-router-dom";
import { useCharacter } from "../CharacterSheetPage/hooks/useCharacters";
import { CharacterBuilderProvider } from "./context/CharacterBuilderContext";
import Routes from "./CreateCharacterSheetPageRoutes";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";

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
        <Grid>
          <Routes />
        </Grid>
        <StepperFooter
          steps={buildSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </CharacterBuilderProvider>
    </Grid>
  );
}
