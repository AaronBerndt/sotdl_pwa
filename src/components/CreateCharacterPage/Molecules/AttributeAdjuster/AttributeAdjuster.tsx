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
    overrides,
    setOverrides,
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
  const overrideValue = find(overrides, { name: label });

  const onChange = (e: any) => {
    const overrideValue = parseInt(e.target.value);
    if (overrideValue === 0) {
      setOverrides((prev: any) =>
        prev.filter(({ name }: any) => name === label)
      );
    } else {
      setOverrides((prev: any) => {
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
  };

  return (
    <Grid container direction="row">
      <Grid container item xs={3}>
        <TextField
          variant="outlined"
          defaultValue={label}
          value={`${label} ${
            Number(ancestryValue) +
            Number(levelUpValue) +
            (overrideValue ? overrideValue.value : 0)
          }`}
          disabled
        />
      </Grid>
      <Grid container item xs={2}>
        <TextField
          variant="outlined"
          defaultValue={ancestryValue}
          type="number"
          disabled
        />
      </Grid>
      <Grid container item xs={2}>
        <TextField
          variant="outlined"
          defaultValue={levelUpValue}
          type="number"
          onChange={onChange}
        />
      </Grid>

      <Grid container item xs={2}>
        <TextField
          variant="outlined"
          defaultValue={overrideValue ? overrideValue.value : 0}
          type="number"
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
}
