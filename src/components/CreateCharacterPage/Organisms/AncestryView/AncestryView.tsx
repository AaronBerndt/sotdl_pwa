import { Button, Grid, Typography } from "@mui/material";
import { Close } from "@material-ui/icons";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
type Props = {
  toggleOpen: Function;
};
export default function AncestryView({ toggleOpen }: Props) {
  const { ancestry } = useCharacterBuilderContext();

  return (
    <>
      {ancestry === "" ? (
        <Button onClick={() => toggleOpen()}>Please Select Ancestry</Button>
      ) : (
        <Grid container>
          <Typography variant="h6">{`Ancestry: ${ancestry}`}</Typography>
          <Button
            onClick={() => {
              toggleOpen();
              window.scrollTo(0, 0);
            }}
          >
            <Close />
          </Button>
        </Grid>
      )}
    </>
  );
}

