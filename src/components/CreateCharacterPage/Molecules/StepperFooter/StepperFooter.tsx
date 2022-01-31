import { Button, MobileStepper, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
  const { pathname: path } = useLocation();

  const { characterId } = useParams<any>();
  const navigate = useNavigate();
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
  };

  const handleBack = () => {
    if (steps.length === 1) {
      navigate(`/characters/${characterId}`);
    } else {
      setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    }
  };

  const onFinishOnClick = () => {
    path.includes("edit") ? editCharacter() : createCharacter();
    navigate(steps.length === 1 ? `/characters/${characterId}` : `/`);
  };

  return (
    <MobileStepper
      variant="dots"
      steps={4}
      position="bottom"
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


