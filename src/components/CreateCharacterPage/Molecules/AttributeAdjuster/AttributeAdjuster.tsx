import { Grid, TextField, Typography } from "@material-ui/core";
import { find } from "lodash";
import { filterAndSumValue } from "../../../../utils/arrayUtils";
import { lengthIsZero } from "../../../../utils/logic";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import useAncestries from "../../hooks/useAncestries";
export type Props = {
  label: string;
};

export default function AttributeAdjuster({ label }: Props) {
  const {
    ancestry: selectedAncestry,
    characteristics,
    overides,
    setOverides,
  } = useCharacterBuilderContext();
  const { data: ancestries, isLoading: ancestryLoading } = useAncestries();

  if (ancestryLoading) {
    return <div>Is loading</div>;
  }

  const { characteristics: ancestryCharacteristics } = find(ancestries, {
    name: selectedAncestry,
  });

  const { value: ancestryValue } = find(ancestryCharacteristics, {
    name: label,
  });

  const levelUpValue = filterAndSumValue(characteristics, label, "name");
  const overrideValue = find(overides, { name: label });

  return (
    <Grid container direction="column">
      <Grid item xs={2}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid container item>
        <Grid item xs={8}>
          <TextField variant="outlined" defaultValue="Total Score" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            value={
              ancestryValue +
              levelUpValue +
              (overrideValue ? overrideValue.value : 0)
            }
            type="number"
            disabled
          />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={8}>
          <TextField variant="outlined" defaultValue="Ancestry" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            defaultValue={ancestryValue}
            type="number"
            disabled
          />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={8}>
          <TextField variant="outlined" defaultValue="Level up" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            defaultValue={levelUpValue}
            type="number"
            disabled
          />
        </Grid>
      </Grid>

      <Grid container item>
        <Grid item xs={8}>
          <TextField variant="outlined" defaultValue="Overide" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            defaultValue={0}
            type="number"
            onChange={(e) => {
              const overrideValue = parseInt(e.target.value);
              if (overrideValue === 0) {
                setOverides((prev: any) =>
                  prev.filter(({ name }: any) => name === label)
                );
              } else {
                setOverides((prev: any) => {
                  const alreadyExists = find(prev, { name: label });
                  return lengthIsZero(prev)
                    ? [{ name: label, value: overrideValue }]
                    : alreadyExists
                    ? prev.map((prevValue: any) =>
                        prevValue.name !== label
                          ? prevValue
                          : { name: label, value: overrideValue }
                      )
                    : [
                        ...prev,
                        {
                          name: label,
                          value: overrideValue,
                        },
                      ];
                });
              }
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
