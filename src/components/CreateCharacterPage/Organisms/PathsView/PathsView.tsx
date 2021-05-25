import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import LevelSelector from "../../Atoms/LevelSelector/LevelSelector";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import PathsList from "../../Molecules/PathsList/PathsList";
import SelectedPathContent from "../../Molecules/SelectedPathContent/SelectedPathContent";

export default function PathsView() {
  const {
    novicePath,
    expertPath,
    masterPath,
    level,
  } = useCharacterBuilderContext();

  const { open: pathListOpen, toggleOpen: togglePathListOpen } = useToggle();
  const [currentPathType, setCurrentPathType] = useState("Novice");

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
                        <SelectedPathContent pathName={novicePath} />
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
                        <SelectedPathContent pathName={expertPath} />
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
                          <SelectedPathContent pathName={masterPath} />
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            ) : null}
          </Grid>
        </>
      )}
    </Grid>
  );
}
