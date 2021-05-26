import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { sumArray } from "../../../../utils/arrayUtils";
import useToggle from "../../../hooks/useToggle";
import LevelSelector from "../../Atoms/LevelSelector/LevelSelector";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import useCharacteristicList from "../../hooks/useCharacteristicsList";
import PathsList from "../../Molecules/PathsList/PathsList";

export default function PathsView() {
  const {
    novicePath,
    expertPath,
    masterPath,
    level,
  } = useCharacterBuilderContext();

  const { open: pathListOpen, toggleOpen: togglePathListOpen } = useToggle();
  const [currentPathType, setCurrentPathType] = useState("Novice");
  const characteristicsList = useCharacteristicList();

  console.log(characteristicsList);
  const pathContentButtonClick = (pathType: string) => {
    setCurrentPathType(pathType);
    togglePathListOpen();
  };

  return (
    <Grid container>
      {pathListOpen ? (
        <PathsList
          pathType={currentPathType}
          toggleClose={() => togglePathListOpen()}
        />
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
                {Object.entries(characteristicsList).map((entry) => {
                  const [NAME, VALUES] = entry;

                  const characteristicsValues = VALUES.map(
                    ({ value }: any) => value
                  );

                  return (
                    <Typography>{`${NAME}: +${sumArray(
                      characteristicsValues
                    )}`}</Typography>
                  );
                })}

                <Typography variant="h6">Talents</Typography>
              </>
            ) : null}
          </Grid>
        </>
      )}
    </Grid>
  );
}
