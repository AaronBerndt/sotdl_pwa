import { Grid, Typography } from "@material-ui/core";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import AttributeAdjuster from "../../Molecules/AttributeAdjuster/AttributeAdjuster";
export default function AdjustAttributesView() {
  const { pointsToSpend } = useCharacterBuilderContext();

  return (
    <Grid justify="space-around">
      {["Strength", "Agility", "Will", "Intellect"].map((attribute: string) => (
        <AttributeAdjuster label={attribute} />
      ))}
    </Grid>
  );
}
