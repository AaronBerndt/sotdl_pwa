import { Button, MobileStepper, useTheme } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import useCreateChracter from "../../hooks/useCreateCharacter";
type Props = {
  steps: string[];
  activeStep: number;
  setActiveStep: Function;
};
export default function StepperFooter({
  steps,
  activeStep,
  setActiveStep,
}: Props) {
  const { path } = useRouteMatch();
  const history = useHistory();
  const theme = useTheme();
  const { mutate: createCharacter } = useCreateChracter();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    history.push(`${path}/${steps[activeStep]}`);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    history.push(`${path}/${steps[activeStep]}`);
  };

  const onFinishOnClick = () => createCharacter();

  return (
    <MobileStepper
      variant="dots"
      steps={4}
      position="static"
      activeStep={activeStep}
      nextButton={
        <>
          {activeStep === 4 ? (
            <Button onClick={onFinishOnClick}> Finish</Button>
          ) : (
            <Button size="small" onClick={handleNext}>
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          )}
        </>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
