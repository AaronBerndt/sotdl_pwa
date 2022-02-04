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
  IconButton,
  TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
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
  const [filter, setFilter] = useState<any>({
    name: "",
    value: { keyWordSearch: "" },
  });

  const [selectedPath, setSelectedPath] = useState(0);
  const { data: paths, isLoading } = usePaths(filter);
  const {
    novicePath,
    expertPath,
    masterPath,
    setPath,
    setDetailChoices,
    setChoices,
  } = useCharacterBuilderContext();

  if (isLoading) {
    return <div>Is loading</div>;
  }

  const pathObject: any = {
    novice: novicePath,
    expert: expertPath,
    master: masterPath,
  };

  const pathLevelObject: any = {
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

    setChoices((prev: any) =>
      prev.filter(({ level }: any) => level !== pathLevelObject[type])
    );

    toggleOpen();
    toggleClose();
    setPath(name, type);
    window.scrollTo(0, 0);
  };

  const onSearch = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, ...{ keyWordSearch: e.target.value } },
    });
  };

  const onClearFilters = (e: any) => {
    setFilter({
      name: "",
      value: { name: "" },
    });
  };

  return (
    <Grid>
      <Grid
        container
        style={{ paddingBottom: "5px", paddingLeft: "10px", paddingTop: "5px" }}
      >
        <Grid item xs={12}>
          <TextField label="Keyword Search" onChange={onSearch} />
        </Grid>
        <Grid item>
          <Grid item xs={12}>
            <Button onClick={onClearFilters}>Clear Filters</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        {filteredPaths.length === 0 ? (
          <p>No Paths Match</p>
        ) : (
          <Grid>
            <List>
              {filteredPaths.map((path: Path, i: number) => (
                <ListItem
                  button
                  key={i}
                  onClick={() => onPathItemClick(i)}
                  disabled={[novicePath, expertPath, masterPath].includes(
                    path.name
                  )}
                >
                  <ListItemText primary={path.name} />
                </ListItem>
              ))}
            </List>
            <Dialog open={open} onClose={() => toggleOpen()} fullScreen>
              <DialogTitle
                style={{
                  background: "#262e37",
                  color: "white",
                }}
              >
                <Grid container direction="row">
                  <Grid item xs={11}>
                    <Typography variant="h6">
                      {pathObject[pathType.toLowerCase()] === ""
                        ? `Confirm ${filteredPaths[selectedPath].type} Path Change`
                        : `Confirm ${filteredPaths[selectedPath].type} Path`}
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={() => toggleOpen()}
                      aria-label="close"
                    >
                      <Close />
                    </IconButton>
                  </Grid>
                </Grid>
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
                    <Button
                      autoFocus
                      onClick={() => toggleOpen()}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Dialog>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
