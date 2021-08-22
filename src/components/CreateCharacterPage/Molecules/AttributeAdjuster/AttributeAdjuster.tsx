import {
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { find } from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import { filterAndSumValue } from "../../../../utils/arrayUtils";
import { lengthIsZero } from "../../../../utils/logic";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import useAncestries from "../../hooks/useAncestries";
export type Props = {
  label: string;
};

export type AdjusterProps = {
  title: string;
  value: string;
  disabled: boolean;
  onChange?: any;
};

const CardHeader = styled(MuiCardHeader)`
  background: black;
  color: white;
`;

const Adjuster = ({ title, value, disabled, onChange }: AdjusterProps) => (
  <Grid container item xs={12}>
    <Grid item xs={9}>
      <Typography variant="h6">{title}</Typography>
    </Grid>
    <Grid item xs={3}>
      <TextField
        fullWidth
        variant="outlined"
        label=""
        value={value}
        disabled={disabled}
        onChange={onChange ? onChange : () => false}
      />
    </Grid>
  </Grid>
);

export default function AttributeAdjuster({ label }: Props) {
  const {
    ancestry: selectedAncestry,
    characteristics,
    overrides,
    setOverrides,
  } = useCharacterBuilderContext();
  const [newOverride, setNewOverrides] = useState(0);
  const { data: ancestries, isLoading: ancestryLoading } = useAncestries();

  if (ancestryLoading) {
    return <div>Is loading</div>;
  }

  const { characteristics: ancestryCharacteristics } = find(ancestries, {
    name: selectedAncestry ? selectedAncestry : "Dwarf",
  });

  const { value: ancestryValue } = find(ancestryCharacteristics, {
    name: label,
  });

  const levelUpValue = filterAndSumValue(characteristics, label, "name");
  const overrideValue = find(overrides, { name: label });

  const onChange = (e: any) => {
    const overrideValue = parseInt(e.target.value);
    if (Number(overrideValue)) {
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
    }
  };
  return (
    <Card>
      <CardHeader title={label} titleTypographyProps={{ variant: "h5" }} />
      <CardContent>
        <Grid container direction="column">
          <Adjuster
            title="Total"
            value={`${
              Number(ancestryValue) +
              Number(levelUpValue) +
              (overrideValue ? overrideValue.value : 0)
            }`}
            disabled={true}
          />
          <Adjuster title="Ancestry" value={ancestryValue} disabled={true} />
          <Adjuster title="Level Up" value={levelUpValue} disabled={true} />
          <Adjuster
            title="Overide"
            value={overrideValue ? overrideValue.value : 0}
            disabled={false}
            onChange={onChange}
          />
        </Grid>
      </CardContent>
    </Card>
  );
}
