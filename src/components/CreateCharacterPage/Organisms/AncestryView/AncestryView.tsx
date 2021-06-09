import { Button, Grid, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
type Props = {
  toggleOpen: Function;
};
export default function AncestryView({ toggleOpen }: Props) {
  const { ancestry } = useCharacterBuilderContext();

  console.log(ancestry);
  return (
    <>
      {ancestry === "" ? (
        <Button onClick={() => toggleOpen()}>Please Select Ancestry</Button>
      ) : (
        <Grid container>
          <Typography variant="h6">{`Ancestry: ${ancestry}`}</Typography>
          <Button onClick={() => toggleOpen()}>
            <Close />
          </Button>
        </Grid>
      )}
    </>
  );
}
