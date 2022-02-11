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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lengthIsZero } from "../../../../utils/logic";
import SpellListItem from "../../Atoms/SpellListItem/SpellListItem";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import tranditionList from "../../Shared/Tranditions";

type Props = {
  compendium?: boolean;
  pickSpell?: boolean;
};
export default function SpellsTable({ compendium, pickSpell }: Props) {
  const [filter, setFilter] = useState<any>({ name: "", value: { name: "" } });
  const [spellType, setSpellType] = useState("All");
  const [tradition, setTradition] = useState("All");
  const [level, setLevel] = useState("All");
  const { spells, _id } = useCharacterAttributes();
  const navigate = useNavigate();

  const onSearch = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, ...{ name: e.target.value } },
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
      <Grid item xs={12}>
        <Button onClick={() => navigate(`/edit_character/${_id}/spells`)}>
          Manage Spells
        </Button>
      </Grid>

      {!lengthIsZero(spells) ? (
        <>
          <Grid
            container
            xs={12}
            style={{
              paddingBottom: "5px",
              paddingLeft: "10px",
              paddingTop: "5px",
            }}
          >
            <Grid item xs={6}>
              <TextField label="Spell Name" onChange={onSearch} />
            </Grid>

            <Grid item xs={6}>
              <Button onClick={onSpellClear}>Clear Filters</Button>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid
              item
              xs={4}
              style={{ paddingBottom: "5px", paddingLeft: "10px" }}
            >
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
            {spells.map((spell: any, i: number) => (
              <SpellListItem spell={spell} key={i} style={{}} />
            ))}
          </List>
        </>
      ) : (
        <p>No Spells </p>
      )}
    </Grid>
  );
}
