import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import LevelSelector from "../../Atoms/LevelSelector/LevelSelector";
import { PathType } from "../../CreateCharacterSheetPageTypes";
import AncestryList from "../../Molecules/AncestryList/AncestryList";
import PathsList from "../../Molecules/PathsList/PathsList";
import AncestryView from "../AncestryView/AncestryView";
import PathsView from "../PathsView/PathsView";
export type Props = {
  sample: string;
};

export default function ChoiceView() {
  const {
    open: ancestryListOpen,
    toggleOpen: toggleAncestryListOpen,
  } = useToggle();

  const { open: pathListOpen, toggleOpen: togglePathListOpen } = useToggle();

  const [currentPathType, setCurrentPathType] = useState<PathType>("Novice");

  return (
    <Grid>
      <Grid>
        <LevelSelector />
      </Grid>
      {ancestryListOpen ? (
        <Grid container direction="column" alignItems="center">
          <Typography variant="h6">{`Select Ancestry`}</Typography>
          <AncestryList />
        </Grid>
      ) : pathListOpen ? (
        <Grid container direction="column" alignItems="center">
          <Typography variant="h6">{`${currentPathType} Path`}</Typography>
          <PathsList
            pathType={currentPathType}
            toggleClose={() => togglePathListOpen()}
          />
        </Grid>
      ) : (
        <Grid>
          <AncestryView toggleOpen={toggleAncestryListOpen} />
          <PathsView
            toggleOpen={togglePathListOpen}
            currentPathType={currentPathType}
            updateCurrentPathType={setCurrentPathType}
          />
        </Grid>
      )}
    </Grid>
  );
}
