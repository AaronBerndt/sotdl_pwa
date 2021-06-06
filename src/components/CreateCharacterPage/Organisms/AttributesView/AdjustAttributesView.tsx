import { Grid } from "@material-ui/core";
import AttributeAdjuster from "../../Molecules/AttributeAdjuster/AttributeAdjuster";
export default function AdjustAttributesView() {
  return (
    <Grid justify="space-around">
      {[
        "Strength",
        "Agility",
        "Will",
        "Intellect",
        "Speed",
        "Corruption",
        "Insanity",
        "Power",
      ].map((attribute: string) => (
        <AttributeAdjuster label={attribute} />
      ))}
    </Grid>
  );
}
