import { AppBar, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { CharacterBuilderProvider } from "./context/CharacterBuilderContext";
import Routes from "./CreateCharacterSheetPageRoutes";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";

export default function CreateCharacterPage() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const buildSteps = [
    "Name",
    "Ancestry&Paths",
    "Adjust Attributes",
    "Equipment",
    "Spells",
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    history.push(`${path}/${buildSteps[activeStep]}`);
  }, [activeStep, path, history]);

  return (
    <Grid>
      <CharacterBuilderProvider>
        <AppBar>{buildSteps[activeStep]}</AppBar>
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
