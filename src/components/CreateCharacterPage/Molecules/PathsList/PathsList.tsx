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
} from "@material-ui/core";
import { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { Path } from "../../CreateCharacterSheetPageTypes";
import usePaths from "../../hooks/usePaths";
import PathContent from "../PathContent/PathContent";

type Props = {
  pathType: "novice" | "expert" | "master";
};
export default function PathsList({ pathType }: Props) {
  const { open, toggleOpen } = useToggle();
  const [selectedPath, setSelectedPath] = useState(0);
  const { data: paths, isLoading } = usePaths();
  const {
    novicePath,
    expertPath,
    masterPath,
    setPath,
  } = useCharacterBuilderContext();

  if (isLoading) {
    return <div>Is loading</div>;
  }

  const pathObject = {
    novice: novicePath,
    expert: expertPath,
    master: masterPath,
  };

  const onPathItemClick = (index: number) => {
    toggleOpen();
    setSelectedPath(index);
  };

  const onPickPathsButtonClick = () => {
    const { name, type } = paths[selectedPath];
    toggleOpen();
    setPath(name, type);
  };

  return (
    <>
      <List>
        {paths
          .filter(({ type }: Path) => type === pathType)
          .map((path: Path, i: number) => (
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
        <DialogTitle>
          <Typography variant="h6">
            {pathObject[pathType] === ""
              ? `Confirm ${paths[selectedPath].type} Path Change`
              : `Confirm ${paths[selectedPath].type} Path`}
          </Typography>{" "}
        </DialogTitle>
        <DialogContent>
          <PathContent pathName={paths[selectedPath].name} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onPickPathsButtonClick()} color="primary">
            {pathObject[pathType] === ""
              ? `Change ${paths[selectedPath].type} Path`
              : `Pick ${paths[selectedPath].type} Path`}
          </Button>
          <Button autoFocus onClick={() => toggleOpen()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
