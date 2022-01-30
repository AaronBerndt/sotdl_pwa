import { Button, Grid, Typography } from "@mui/material";
import { Close } from "@material-ui/icons";
import { find } from "lodash";
import { useEffect } from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { talentNameObject } from "../../CreateCharacterPageConstants";
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
    choices,
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

  let subPathName;
  if (novicePath !== "Adept") {
    subPathName = find(choices, {
      name: talentNameObject[novicePath],
    })?.value;
  }

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
                    <Typography variant="h6">{`Novice Path: ${novicePath} ${
                      novicePath === "Adept" ? "" : `- ${subPathName}`
                    }`}</Typography>
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

