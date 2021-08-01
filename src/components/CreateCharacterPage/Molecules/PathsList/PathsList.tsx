import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import {
  DetailChoices,
  Path,
  PathType,
} from "../../CreateCharacterSheetPageTypes";
import usePaths from "../../hooks/usePaths";
import PathContent from "../PathContent/PathContent";

type Props = {
  pathType: PathType;
  toggleClose: Function;
};

export default function PathsList({
  pathType,
  toggleClose,
}: Props): JSX.Element {
  const { open, toggleOpen } = useToggle();
  const [selectedPath, setSelectedPath] = useState(0);
  const { data: paths, isLoading } = usePaths();
  const {
    novicePath,
    expertPath,
    masterPath,
    setPath,
    setDetailChoices,
  } = useCharacterBuilderContext();

  if (isLoading) {
    return <div>Is loading</div>;
  }

  const pathObject: any = {
    novice: novicePath,
    expert: expertPath,
    master: masterPath,
  };

  const filteredPaths = paths.filter(({ type }: Path) => type === pathType);

  const onPathItemClick = (index: number) => {
    toggleOpen();
    setSelectedPath(index);
  };

  const onPickPathsButtonClick = () => {
    const { name, type, detailChoices } = filteredPaths[selectedPath];
    setDetailChoices((prev: DetailChoices) => [
      ...prev.filter(({ origin }) => origin === type),
      ...detailChoices,
    ]);

    toggleOpen();
    toggleClose();
    setPath(name, type);
  };

  return (
    <>
      <List>
        {filteredPaths.map((path: Path, i: number) => (
          <ListItem
            button
            key={i}
            onClick={() => onPathItemClick(i)}
            disabled={[novicePath, expertPath, masterPath].includes(path.name)}
          >
            <ListItemText primary={path.name} />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={() => toggleOpen()} fullScreen>
        <DialogTitle>
          <Typography variant="h6">
            {pathObject[pathType.toLowerCase()] === ""
              ? `Confirm ${filteredPaths[selectedPath].type} Path Change`
              : `Confirm ${filteredPaths[selectedPath].type} Path`}
          </Typography>{" "}
        </DialogTitle>
        <DialogContent>
          <PathContent pathName={filteredPaths[selectedPath].name} />
        </DialogContent>
        <DialogActions>
          <Grid container direction="row">
            <Grid item xs={8}>
              <Button
                variant="contained"
                onClick={() => onPickPathsButtonClick()}
                color="primary"
              >
                {pathObject[pathType.toLowerCase()] === ""
                  ? `Change ${filteredPaths[selectedPath].type} Path`
                  : `Choose ${filteredPaths[selectedPath].type} Path`}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button autoFocus onClick={() => toggleOpen()}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
