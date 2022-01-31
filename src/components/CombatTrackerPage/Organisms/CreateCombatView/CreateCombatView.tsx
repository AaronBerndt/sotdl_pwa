import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Monster } from "../../CombatTrackerPageTypes";
import useMonsters from "../../hooks/useMonsters";
import { uniq } from "lodash";

export default function CreateCombatView() {
  const [filter, setFilter] = useState<any>({ name: "", value: { name: "" } });
  const [combatName, setCombatName] = useState("");
  const [monstersInCombat, setMonstersInCombat] = useState<string[]>([]);
  const { data: monstersData, isLoading } = useMonsters({
    name: "",
    value: { name: "" },
  });

  const [monsterType, setMonsterType] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [level, setLevel] = useState("All");

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const addMonsterButtonClick = (id: string) => {
    setMonstersInCombat((prev) => [...prev, id]);
  };

  const onSearch = (e: any) => {
    setFilter({
      name: "Filter",
      value: { ...filter.value, ...{ name: e.target.value } },
    });
  };

  const onMonsterTypeSelect = (e: any) => {
    const { type: monsterType, ...rest } = filter.value;
    setMonsterType(e.target.value);
    setFilter({
      name: "Filter",
      value:
        e.target.value === "All"
          ? rest
          : { ...filter.value, type: e.target.value },
    });
  };

  const onDifficultySelect = (e: any) => {
    const { difficulty, ...rest } = filter.value;
    setDifficulty(e.target.value);
    setFilter({
      name: "Filter",
      value:
        e.target.value === "All"
          ? rest
          : { ...filter.value, difficulty: e.target.value },
    });
  };

  const onFilterClear = (e: any) => {
    setMonsterType("All");
    setDifficulty("All");
    setFilter({
      name: "",
      value: { name: "" },
    });
  };

  return (
    <Grid>
      <Grid container>
        <Grid item xs={4} style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <FormControl>
            <InputLabel id="monsterType">Type</InputLabel>

            <Select
              autoWidth
              labelId="monsterType"
              defaultValue="All"
              value={monsterType}
              onChange={onMonsterTypeSelect}
            >
              {[
                "All",
                ...uniq(monstersData.map(({ type }: Monster) => type)),
              ].map((name: any, i) => (
                <MenuItem key={i} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={4} style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <FormControl>
            <InputLabel id="difficulty">Difficulty</InputLabel>

            <Select
              autoWidth
              labelId="difficulty"
              defaultValue="All"
              value={difficulty}
              onChange={onDifficultySelect}
            >
              {[
                "All",
                ...uniq(monstersData.map(({ difficulty }: any) => difficulty)),
              ].map((name: any, i) => (
                <MenuItem key={i} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>

        <Grid item>
          <Button onClick={onFilterClear}>Clear Filters</Button>
        </Grid>
      </Grid>
      <Grid item>
        <List>
          <ListItem>
            <ListItemText primary={"Name"} />
            <ListItemText primary={"Type"} />
            <ListItemText primary={"difficulty"} />
          </ListItem>

          {monstersData.map((monster: Monster) => (
            <ListItem key={monster._id}>
              <ListItemText primary={monster.name} secondary={monster.book} />
              <ListItemText primary={monster.type} />
              <ListItemText primary={monster.difficulty} />
              <ListItemSecondaryAction>
                <Button onClick={() => addMonsterButtonClick(monster._id)}>
                  Add
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}


