import { Button, Collapse, Grid, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import { sumArray } from "../../../../utils/arrayUtils";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import useToggle from "../../../hooks/useToggle";
import ContentAccordion from "../../Atoms/ContentAccordion/ContentAccordion";
import LevelSelector from "../../Atoms/LevelSelector/LevelSelector";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { PathType } from "../../CreateCharacterSheetPageTypes";
import useCharacteristicList from "../../hooks/useCharacteristicsList";
import useTalentList from "../../hooks/useTalentList";
import PathsList from "../../Molecules/PathsList/PathsList";

export default function PathsView() {
  const {
    novicePath,
    expertPath,
    masterPath,
    level,
  } = useCharacterBuilderContext();

  const { open: pathListOpen, toggleOpen: togglePathListOpen } = useToggle();
  const { open: talentsOpen, toggleOpen: toggleTalentsOpen } = useToggle();
  const {
    open: futureTalentsOpen,
    toggleOpen: toggleFutureTalentsOpen,
  } = useToggle();
  const [currentPathType, setCurrentPathType] = useState<PathType>("Novice");
  const characteristicsList = useCharacteristicList();
  const { talentList, futureLevels } = useTalentList();

  const pathContentButtonClick = (pathType: PathType) => {
    setCurrentPathType(pathType);
    togglePathListOpen();
  };

  return (
    <Grid container>
      {pathListOpen ? (
        <Grid container direction="column" alignItems="center">
          <Typography variant="h6">{`${currentPathType} Path`}</Typography>
          <PathsList
            pathType={currentPathType}
            toggleClose={() => togglePathListOpen()}
          />
        </Grid>
      ) : (
        <>
          <Grid>
            <LevelSelector />
          </Grid>
          <Grid container direction="column">
            {level !== 0 ? (
              <>
                <Grid item>
                  {level >= 1 && (
                    <>
                      {novicePath === "" ? (
                        <Button
                          onClick={() => pathContentButtonClick("Novice")}
                        >
                          Please Select Novice
                        </Button>
                      ) : (
                        <Typography variant="h6">{`Novice Path: ${novicePath}`}</Typography>
                      )}
                    </>
                  )}
                </Grid>
                <Grid item>
                  {level >= 3 && (
                    <>
                      {expertPath === "" ? (
                        <Button
                          onClick={() => pathContentButtonClick("Expert")}
                        >
                          Please Select Expert
                        </Button>
                      ) : (
                        <Typography variant="h6">{`Expert Path: ${expertPath}`}</Typography>
                      )}
                    </>
                  )}
                </Grid>
                <Grid item>
                  <Grid>
                    {level >= 7 && (
                      <>
                        {masterPath === "" ? (
                          <Button
                            onClick={() => pathContentButtonClick("Master")}
                          >
                            Please Select Master
                          </Button>
                        ) : (
                          <Typography variant="h6">{`Master Path: ${masterPath}`}</Typography>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>

                <Typography variant="h6">Characteristics</Typography>
                {Object.entries(characteristicsList).map((entry, i) => {
                  const [NAME, VALUES] = entry;

                  const characteristicsValues = VALUES.map(
                    ({ value }: any) => value
                  );

                  return (
                    <Typography key={i}>{`${NAME}: +${sumArray(
                      characteristicsValues
                    )}`}</Typography>
                  );
                })}

                <Button onClick={() => toggleTalentsOpen()}>
                  <Typography variant="h6">Talents</Typography>
                  {talentsOpen ? <ExpandLess /> : <ExpandMore />}
                </Button>
                <Collapse in={!talentsOpen} timeout="auto" unmountOnExit>
                  {talentList.map((talent: Talent) => (
                    <ContentAccordion
                      defaultExpanded={false}
                      header={talent.name}
                      details={talent.description}
                    />
                  ))}
                </Collapse>
                {futureLevels.length !== 0 && (
                  <>
                    <Button onClick={() => toggleFutureTalentsOpen()}>
                      <Typography variant="h6">{` Future Talents(${futureLevels.length})`}</Typography>
                      {futureTalentsOpen ? <ExpandLess /> : <ExpandMore />}
                    </Button>
                    <Collapse
                      in={futureTalentsOpen}
                      timeout="auto"
                      unmountOnExit
                    >
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
        </>
      )}
    </Grid>
  );
}
