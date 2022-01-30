import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CompendiumSpellListItem from "../../../CompendiumPage/Atoms/SpellListItem/SpellListItem";
import useSpells from "../../../CreateCharacterPage/hooks/useSpells";
import { Spell } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import tranditionList from "../../../CharacterSheetPage/Shared/Tranditions";

export default function SpellsTable() {
  const [filter, setFilter] = useState<any>({ name: "", value: { name: "" } });
  const [spellType, setSpellType] = useState("All");
  const [tradition, setTradition] = useState("All");
  const [level, setLevel] = useState("All");

  const { data: spellList, isLoading } = useSpells(filter);

  console.log(spellList);

  if (isLoading) {
    return <p>Is Loading...</p>;
  }

  const onSearch = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, ...{ name: e.target.value } },
    });
  };

  const onSpellDescriptionSearch = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, ...{ description: e.target.value } },
    });
  };

  const onTranditionSelect = (e: any) => {
    const { tradition, ...rest } = filter.value;
    setTradition(e.target.value);
    setFilter({
      name: "Filter",
      value:
        e.target.value === "All"
          ? rest
          : { ...filter.value, tradition: e.target.value },
    });
  };

  const onSpellTypeSelect = (e: any) => {
    const { type, ...rest } = filter.value;

    setSpellType(e.target.value);
    setFilter({
      name: "Filter",
      value:
        e.target.value === "All"
          ? rest
          : { ...filter.value, type: e.target.value },
    });
  };

  const onSpellLevelSelect = (e: any) => {
    const { level, ...rest } = filter.value;
    setLevel(e.target.value);
    setFilter({
      name: "Filter",
      value:
        e.target.value === "All"
          ? rest
          : { ...filter.value, level: e.target.value },
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
          <TextField
            label="Spell Description"
            onChange={onSpellDescriptionSearch}
          />
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
          <CompendiumSpellListItem spell={spell} key={i} style={{}} />
        ))}
      </List>
    </Grid>
  );
}

