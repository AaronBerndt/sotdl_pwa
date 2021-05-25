import { Button, Grid } from "@material-ui/core";
import React from "react";
import LevelSelector from "../../Atoms/LevelSelector/LevelSelector";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import SelectedPathContent from "../../Molecules/SelectedPathContent/SelectedPathContent";

export default function PathsView() {
  const {
    novicePath,
    expertPath,
    masterPath,
    level,
  } = useCharacterBuilderContext();

  return (
    <Grid container>
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
                    <Button>Please Select Novice</Button>
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
                    <Button>Please Select Expert</Button>
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
                      <Button>Please Select Master</Button>
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
    </Grid>
  );
}
