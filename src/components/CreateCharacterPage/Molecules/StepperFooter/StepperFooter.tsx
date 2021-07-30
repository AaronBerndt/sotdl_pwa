import { Button, MobileStepper, useTheme } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Characteristic } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import useCreateChracter from "../../hooks/useCreateCharacter";
import useEditCharacter from "../../hooks/useEditCharacter";
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
  const {
    ancestry,
    level,
    novicePath,
    expertPath,
    masterPath,
    characteristics,
  } = useCharacterBuilderContext();
  const { mutate: createCharacter } = useCreateChracter();
  const { mutate: editCharacter } = useEditCharacter();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    history.push(`${path}/${steps[activeStep]}`);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    history.push(`${path}/${steps[activeStep]}`);
  };

  const onFinishOnClick = () => {
    path.includes("edit") ? editCharacter() : createCharacter();
    history.push(`/`);
  };

  console.log(
    characteristics.filter(
      (characteristics: Characteristic) => characteristics.level === 1
    )
  );
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
            <Button
              size="small"
              onClick={handleNext}
              disabled={
                ancestry === "" ||
                (level >= 1 &&
                  (novicePath === "" ||
                    ["Jotun", "Centaur"].includes(ancestry)) &&
                  characteristics.filter(
                    (characteristic: Characteristic) =>
                      characteristic.level === 1
                  ).length !== 2) ||
                (level >= 3 &&
                  expertPath === "" &&
                  characteristics.filter(
                    (characteristic: Characteristic) =>
                      characteristic.level === 3
                  ).length !== 2) ||
                (level >= 7 &&
                  masterPath === "" &&
                  characteristics.filter(
                    (characteristic: Characteristic) =>
                      characteristic.level === 7
                  ).length !== 3)
              }
            >
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
