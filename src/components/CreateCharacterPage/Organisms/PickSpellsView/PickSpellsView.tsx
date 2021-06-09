import { Grid } from "@material-ui/core";
import PickSpellList from "../../Molecules/PickSpellList/PickSpellList";
import TranditionSelect from "../../Molecules/TranditionSelect/TranditionSelect";
export default function PickSpellsView() {
  return (
    <Grid>
      <Grid item>
        <TranditionSelect />
      </Grid>
      <Grid item>
        <PickSpellList />
      </Grid>
    </Grid>
  );
}
