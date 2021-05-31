import { Button, Collapse, Grid, Typography } from "@material-ui/core";
import { Close, ExpandLess, ExpandMore } from "@material-ui/icons";
import { useEffect } from "react";
import { sumArray } from "../../../../utils/arrayUtils";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import useToggle from "../../../hooks/useToggle";
import AttributeAccordion from "../../Atoms/AttributeAccordion/AttributeAccordion";
import ChoiceAccordion from "../../Atoms/ChoiceAccordion/ChoiceAccordion";
import ContentAccordion from "../../Atoms/ContentAccordion/ContentAccordion";
import LangOrProfesssionAccordion from "../../Atoms/LangOrProfesssionAccordion/LangOrProfesssionAccordion";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { PathType } from "../../CreateCharacterSheetPageTypes";
import useCharacteristicList from "../../hooks/useCharacteristicsList";
import useTalentList from "../../hooks/useTalentList";

type Props = {
  toggleOpen: Function;
  currentPathType: string;
  updateCurrentPathType: Function;
};
export default function PathsView({
  toggleOpen,
  updateCurrentPathType,
}: Props) {
  const {
    novicePath,
    expertPath,
    masterPath,
    level,
    setPath,
  } = useCharacterBuilderContext();

  const { open: talentsOpen, toggleOpen: toggleTalentsOpen } = useToggle();
  const {
    open: futureTalentsOpen,
    toggleOpen: toggleFutureTalentsOpen,
  } = useToggle();

  const characteristicsList = useCharacteristicList();
  const { talentList, futureLevels } = useTalentList();

  const pathContentButtonClick = (pathType: PathType) => {
    updateCurrentPathType(pathType);
    toggleOpen();
  };

  useEffect(() => {
    if (level < 1) {
      setPath("", "Novice");
    }

    if (level < 3) {
      setPath("", "Expert");
    }

    if (level < 7) {
      setPath("", "Master");
    }
  });

  return (
    <Grid container direction="column">
      {level !== 0 ? (
        <>
          <Grid item>
            {level >= 1 && (
              <>
                {novicePath === "" ? (
                  <Button onClick={() => pathContentButtonClick("Novice")}>
                    Please Select Novice
                  </Button>
                ) : (
                  <Grid container>
                    <Typography variant="h6">{`Novice Path: ${novicePath}`}</Typography>
                    <Button onClick={() => pathContentButtonClick("Novice")}>
                      <Close />
                    </Button>
                  </Grid>
                )}
              </>
            )}
          </Grid>
          <Grid item>
            {level >= 3 && (
              <>
                {expertPath === "" ? (
                  <Button onClick={() => pathContentButtonClick("Expert")}>
                    Please Select Expert
                  </Button>
                ) : (
                  <Grid container>
                    <Typography variant="h6">{`Expert Path: ${expertPath}`}</Typography>
                    <Button onClick={() => pathContentButtonClick("Expert")}>
                      <Close />
                    </Button>
                  </Grid>
                )}
              </>
            )}
          </Grid>
          <Grid item>
            <Grid>
              {level >= 7 && (
                <>
                  {masterPath === "" ? (
                    <Button onClick={() => pathContentButtonClick("Master")}>
                      Please Select Master
                    </Button>
                  ) : (
                    <Grid container>
                      <Typography variant="h6">{`Master Path: ${masterPath}`}</Typography>
                      <Button onClick={() => pathContentButtonClick("Expert")}>
                        <Close />
                      </Button>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </Grid>

          <Typography variant="h6">Characteristics</Typography>
          {Object.entries(characteristicsList).map((entry, i) => {
            const [NAME, VALUES] = entry;

            const characteristicsValues = VALUES.map(({ value }: any) => value);

            return (
              <Typography key={i}>{`${NAME}: +${sumArray(
                characteristicsValues
              )}`}</Typography>
            );
          })}

          <Button onClick={() => toggleTalentsOpen()}>
            <Typography variant="h6">{`Talents(${talentList.length})`}</Typography>
            {talentsOpen ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={!talentsOpen} timeout="auto" unmountOnExit>
            {talentList.map(
              (talent: Talent): JSX.Element =>
                talent.name === "Languages and Professions" ? (
                  <LangOrProfesssionAccordion talent={talent} />
                ) : talent.name === "Attributes Increase" ? (
                  <AttributeAccordion talent={talent} />
                ) : talent.choices !== undefined ? (
                  <ChoiceAccordion talent={talent} choicesRemains={true} />
                ) : (
                  <ContentAccordion
                    defaultExpanded={false}
                    header={talent.name}
                    details={talent.description}
                  />
                )
            )}
          </Collapse>
          {futureLevels.length !== 0 && (
            <>
              <Button onClick={() => toggleFutureTalentsOpen()}>
                <Typography variant="h6">{`Future Talents(${futureLevels.length})`}</Typography>
                {futureTalentsOpen ? <ExpandLess /> : <ExpandMore />}
              </Button>
              <Collapse in={futureTalentsOpen} timeout="auto" unmountOnExit>
                {futureLevels.map((talent: Talent) => (
                  <ContentAccordion
                    defaultExpanded={false}
                    header={talent.name}
                    details={talent.description}
                  />
                ))}
              </Collapse>
            </>
          )}
        </>
      ) : null}
    </Grid>
  );
}
