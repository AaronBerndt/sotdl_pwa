import {
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { find, groupBy, upperFirst } from "lodash";
import styled from "styled-components";
import { filterAndSumValue } from "../../../../utils/arrayUtils";
import { lengthIsZero } from "../../../../utils/logic";
import { Characteristic } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import useAncestries from "../../hooks/useAncestries";
import usePaths from "../../hooks/usePaths";
export type Props = {
  label: string;
};

export type AdjusterProps = {
  title: string;
  value: string;
  disabled: boolean;
  onChange?: any;
};

const keyObject: any = {
  Warrior: "disciplines",
  Magician: "focuses",
  Priest: "faiths",
  Rogue: "knacks",
};

const talentName: any = {
  Warrior: "Discipline",
  Magician: "Tradition Focus",
  Priest: "Faith",
  Rogue: "Knack",
};

const CardHeader = styled(MuiCardHeader)`
  background: #242528;
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
    novicePath,
    expertPath,
    masterPath,
    characteristics,
    choices,
    overrides,
    setOverrides,
    level: selectedLevel,
  } = useCharacterBuilderContext();
  const { data: ancestries, isLoading: ancestryLoading } = useAncestries();
  const { data: paths, isLoading: pathsIsLoading } = usePaths();

  if (ancestryLoading || pathsIsLoading) {
    return <div>Is loading</div>;
  }

  const isPastLife = find(choices, { name: "Past Life" });
  console.log(isPastLife);

  const { characteristics: ancestryCharacteristics } = find(ancestries, {
    name: selectedAncestry ? selectedAncestry : "Dwarf",
  });

  let pastLifeAncestryCharacteristics;

  if (isPastLife) {
    const { characteristics: pastLifeChars } = find(ancestries, {
      name: selectedAncestry ? selectedAncestry : "Dwarf",
    });

    pastLifeAncestryCharacteristics = pastLifeChars;
  }

  const pathValue = groupBy(
    [
      { name: novicePath, type: "path" },
      { name: expertPath, type: "path" },
      { name: masterPath, type: "path" },
    ]
      .map(({ name, type }: any) => {
        let object = find(paths, {
          name,
        });

        if (
          name === novicePath &&
          novicePath !== "" &&
          choices.map(({ name }: any) => name).includes(talentName[novicePath])
        ) {
          const choiceObject = find(choices, {
            name: talentName[novicePath],
          });

          const subPathKey = keyObject[novicePath];

          const subPathData = find(object[subPathKey], {
            name: choiceObject.value,
          });

          object = subPathData;
        }

        console.log(object);
        return groupBy(
          object?.characteristics.filter(
            ({ level }: Characteristic) => level <= selectedLevel
          ),
          "name"
        );
      })
      .map((path) => Object.values(path).flat())
      .filter((list) => !lengthIsZero(list))
      .flat(),
    "name"
  )[upperFirst(label)];

  let { value: ancestryValue } = find(ancestryCharacteristics, {
    name: label,
  });

  if (isPastLife) {
    let { value: pastLifeValue } = find(pastLifeAncestryCharacteristics, {
      name: label,
    });
    ancestryValue = ancestryValue + pastLifeValue;
  }

  const levelUpValue = filterAndSumValue(
    characteristics.filter(({ id }: any) => id),
    label,
    "name"
  );
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
              (overrideValue ? overrideValue.value : 0) +
              (pathValue ? filterAndSumValue(pathValue, label, "name") : 0)
            }`}
            disabled={true}
          />
          <Adjuster title="Ancestry" value={ancestryValue} disabled={true} />
          <Adjuster
            title="Path"
            value={pathValue ? filterAndSumValue(pathValue, label, "name") : 0}
            disabled={true}
          />
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
