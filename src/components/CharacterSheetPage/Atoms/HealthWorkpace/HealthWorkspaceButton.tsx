import { Button, Grid } from "@material-ui/core";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

type Props = {
  currentHealth: number;
  onClick: Function;
};

export default function HealthWorkspaceButton({
  currentHealth,
  onClick,
}: Props) {
  const { health } = useCharacterAttributes();

  return (
    <Button variant="contained" color="primary" onClick={() => onClick()}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {currentHealth}/{health}
        </Grid>
        <Grid item xs={12}>
          Health
        </Grid>
      </Grid>
    </Button>
  );
}
