import {
  Grid,
  MenuItem,
  Select,
  List,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Spell } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import tranditionList from "../../../CharacterSheetPage/Shared/Tranditions";
import useSpells from "../../../CreateCharacterPage/hooks/useSpells";
import SpellListItem from "../../Atoms/SpellListItem/SpellListItem";
export default function SpellCompendiumView() {
  const [filter, setFilter] = useState({ name: "", value: {} });
  const [spellType, setSpellType] = useState("All");
  const [trandition, setTrandition] = useState("All");
  const [level, setLevel] = useState("All");
  const { data: spells, isLoading } = useSpells(filter);

  if (isLoading) {
    return <div>"Is Loading"</div>;
  }

  const onSearch = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, ...{ name: e.target.value } },
    });
  };

  const onTranditionSelect = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, tradition: e.target.value },
    });
  };

  const onSpellTypeSelect = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, type: e.target.value },
    });
  };

  const onSpellLevelSelect = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, level: e.target.value },
    });
  };

  const onSpellClear = (e: any) => {
    setSpellType("All");
    setTrandition("All");
    setLevel("All");
    setFilter({
      name: "",
      value: {},
    });
  };

  return (
    <Grid alignItems="center">
      <Grid
        container
        xs={12}
        style={{ paddingBottom: "5px", paddingLeft: "10px", paddingTop: "5px" }}
      >
        <TextField label="Spell Name" onChange={onSearch} />
      </Grid>

      <Grid container xs={12}>
        <Grid item xs={4} style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <FormControl>
            <InputLabel id="trandition">Tranditions</InputLabel>

            <Select
              labelId="trandition"
              defaultValue="All"
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
              labelId="type"
              defaultValue="All"
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
            <Select labelId="level" onChange={onSpellLevelSelect}>
              {[...Array(11).keys()].map((name) => (
                <MenuItem key={name} value={name.toString()}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Button onClick={onSpellClear}>Clear Filters</Button>
      </Grid>
      <List>
        {spells.map((spell: Spell, i: number) => (
          <SpellListItem spell={spell} key={i} />
        ))}
      </List>
    </Grid>
  );
}
