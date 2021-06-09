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
    "Ancestry&Paths",
    "Adjust Attributes",
    "Equipment",
    "Spells",
    "Details",
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  const newPath = `${path}/${buildSteps[activeStep]}`;
  useEffect(() => {
    history.push(newPath);
  }, [history, newPath]);

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
