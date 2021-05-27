import { AppBar, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { CharacterBuilderProvider } from "./context/CharacterBuilderContext";
import Routes from "./CreateCharacterSheetPageRoutes";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";

export default function CreateCharacterPage() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const buildSteps = ["Name", "Ancestry", "Paths", "Attributes", "Spells", ""];
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    history.push(`${path}/${activeStep}`);
  }, [activeStep, path, history]);
  return (
    <Grid>
      <CharacterBuilderProvider>
        <AppBar>{buildSteps[activeStep]}</AppBar>
        <Routes />
        <StepperFooter activeStep={activeStep} setActiveStep={setActiveStep} />
      </CharacterBuilderProvider>
    </Grid>
  );
}
