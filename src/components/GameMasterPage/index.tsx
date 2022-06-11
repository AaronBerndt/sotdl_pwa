import { Grid, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import BottomNav from "../CharactersPage/Organisms/BottomNav/BottomNav";

export default function GameMasterPage() {
  const navigate = useNavigate();
  return (
    <Grid container alignContent="center">
      <Grid item xs={12}>
        <Button
          onClick={() => {
            navigate(`/content_adder/`);
          }}
          fullWidth
        >
          Add/Edit Content
        </Button>
        <Button
          onClick={() => {
            navigate(`/manage_parties/`);
          }}
          fullWidth
        >
          Manage Parties
        </Button>
        <Button
          onClick={() => {
            navigate(`/combat_builder/`);
          }}
          fullWidth
        >
          Combat Builder
        </Button>
        <Button
          onClick={() => {
            navigate(`/combats/`);
          }}
          fullWidth
        >
          Combats
        </Button>
      </Grid>
      <BottomNav />
    </Grid>
  );
}
