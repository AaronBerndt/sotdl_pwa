import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { filter, find, groupBy, upperFirst } from "lodash";
import React, { useState } from "react";
import { filterAndSumValue } from "../../../../utils/arrayUtils";
import { lengthIsZero } from "../../../../utils/logic";
import {
  Characteristic,
  Spell,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import tranditionList from "../../../CharacterSheetPage/Shared/Tranditions";
import PickSpellItem from "../../../CreateCharacterPage/Atoms/PickSpellItem/PickSpellItem";
import useSpells from "../../../CreateCharacterPage/hooks/useSpells";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import {
  keyObject,
  talentNameObject,
} from "../../CreateCharacterPageConstants";
import useAncestries from "../../hooks/useAncestries";
import usePaths from "../../hooks/usePaths";

type Props = {
  compendium?: boolean;
  pickSpell?: boolean;
};
export default function SpellsTable({ compendium, pickSpell }: Props) {
  const {
    ancestry: selectedAncestry,
    novicePath,
    expertPath,
    masterPath,
    choices,
    overrides,
    level: selectedLevel,
  } = useCharacterBuilderContext();

  const [spellFilter, setFilter] = useState<any>({
    name: "",
    value: { name: "" },
  });
  const [spellType, setSpellType] = useState("All");
  const [tradition, setTradition] = useState("All");
  const [level, setLevel] = useState("All");
  const { data: spellList, isLoading } = useSpells(spellFilter);
  const { data: ancestries, isLoading: ancestryLoading } = useAncestries();
  const { data: paths, isLoading: pathsIsLoading } = usePaths();

  if (isLoading || ancestryLoading || pathsIsLoading) {
    return <p>Is Loading...</p>;
  }

  const { characteristics: ancestryCharacteristics } = find(ancestries, {
    name: selectedAncestry ? selectedAncestry : "Dwarf",
  });

  const powerFromPath = [novicePath, expertPath, masterPath].every(
    (value) => value === ""
  )
    ? []
    : groupBy(
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
              choices
                .map(({ name }: any) => name)
                .includes(talentNameObject[novicePath])
            ) {
              const choiceObject = find(choices, {
                name: talentNameObject[novicePath],
              });

              const subPathKey = keyObject[novicePath];

              const subPathData = find(object[subPathKey], {
                name: choiceObject.value,
              });

              object = subPathData;
            }

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
      )[upperFirst("Power")];

  const powerFromOverides = filter(overrides, { name: "Power" });

  let { value: powerFromAncestry } = find(ancestryCharacteristics, {
    name: "Power",
  });

  const totalPower =
    filterAndSumValue(powerFromOverides, "Power", "name") +
    Number(powerFromAncestry) +
    filterAndSumValue(powerFromPath, "Power", "name");

  const onSearch = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...spellFilter.value, ...{ name: e.target.value } },
    });
  };

  const onTranditionSelect = (e: any) => {
    const { tradition, ...rest } = spellFilter.value;
    setTradition(e.target.value);
    setFilter({
      name: "Filter",
      value:
        e.target.value === "All"
          ? rest
          : { ...spellFilter.value, tradition: e.target.value },
    });
  };

  const onSpellTypeSelect = (e: any) => {
    const { type, ...rest } = spellFilter.value;

    setSpellType(e.target.value);
    setFilter({
      name: "Filter",
      value:
        e.target.value === "All"
          ? rest
          : { ...spellFilter.value, type: e.target.value },
    });
  };

  const onSpellLevelSelect = (e: any) => {
    const { level, ...rest } = spellFilter.value;
    setLevel(e.target.value);
    setFilter({
      name: "Filter",
      value:
        e.target.value === "All"
          ? rest
          : { ...spellFilter.value, level: e.target.value },
    });
  };

  const onSpellClear = (e: any) => {
    setSpellType("All");
    setTradition("All");
    setLevel("All");
    setFilter({
      name: "",
      value: { name: "" },
    });
  };

  return (
    <Grid alignItems="center">
      <Grid
        container
        xs={12}
        style={{ paddingBottom: "5px", paddingLeft: "10px", paddingTop: "5px" }}
      >
        <Grid item xs={6}>
          <TextField label="Spell Name" onChange={onSearch} />
        </Grid>

        <Grid item xs={6}>
          <Button onClick={onSpellClear}>Clear Filters</Button>
        </Grid>
      </Grid>

      <Grid container xs={12}>
        <Grid item xs={4} style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <FormControl>
            <InputLabel id="tradition">Traditions</InputLabel>

            <Select
              autoWidth
              labelId="tradition"
              defaultValue="All"
              value={tradition}
              onChange={onTranditionSelect}
            >
              {["All", ...tranditionList].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel id="type">Type</InputLabel>
            <Select
              autoWidth
              labelId="type"
              value={spellType}
              onChange={onSpellTypeSelect}
            >
              {["All", "Attack", "Utility"].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel id="level">Level</InputLabel>
            <Select
              autoWidth
              value={level}
              labelId="level"
              onChange={onSpellLevelSelect}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {[...Array(11).keys()].map((name) => (
                <MenuItem key={name} value={name.toString()}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <List>
        {spellList.map((spell: Spell, i: number) => (
          <PickSpellItem spell={spell} key={i} style={{}} power={totalPower} />
        ))}
      </List>
    </Grid>
  );
}
