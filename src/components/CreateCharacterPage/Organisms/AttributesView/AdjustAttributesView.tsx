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
        "Size",
        "Speed",
        "Health",
      ].map((attribute: string) => (
        <div style={{ paddingBottom: 10 }}>
          <AttributeAdjuster label={attribute} />
        </div>
      ))}
    </Grid>
  );
}
