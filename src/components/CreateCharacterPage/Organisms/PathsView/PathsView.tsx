import { Button, Grid, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useEffect } from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { PathType } from "../../CreateCharacterSheetPageTypes";

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
    ancestry,
  } = useCharacterBuilderContext();

  const pathContentButtonClick = (pathType: PathType) => {
    updateCurrentPathType(pathType);
    toggleOpen();
    window.scrollTo(0, 0);
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
            {level >= 1 && !["Jotun", "Centaur"].includes(ancestry) && (
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
        </>
      ) : null}
    </Grid>
  );
}
