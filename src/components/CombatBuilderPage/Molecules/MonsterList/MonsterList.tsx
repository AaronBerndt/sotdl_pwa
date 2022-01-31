import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
} from "@mui/material";
import { chunk } from "lodash";
import { useState } from "react";
import useMonsters, {
  useMonsterDifficulty,
  useMonsterTypes,
} from "../../../CombatTrackerPage/hooks/useMonsters";
type Props = {
  addMonsterButtonClick: Function;
  selectMonster: Function;
};
export default function MonsterList({
  addMonsterButtonClick,
  selectMonster,
}: Props) {
  const [filter, setFilter] = useState<any>({ name: "", value: { name: "" } });
  const { data: monstersData, isLoading: monsterDataIsLoading } = useMonsters(
    filter
  );
  const {
    data: monsterTypes,
    isLoading: monsterTypesIsLoading,
  } = useMonsterTypes();
  const {
    data: monsterTypeDifficulties,
    isLoading: monsterTypeDifficultiesIsLoading,
  } = useMonsterDifficulty();

  const [monsterType, setMonsterType] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  if (
    monsterDataIsLoading ||
    monsterTypesIsLoading ||
    monsterTypeDifficultiesIsLoading
  ) {
    return <p>...Loading</p>;
  }

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
    <>
      <Grid container alignContent="center">
        <Grid item xs={4} style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <TextField label="Monster Name" onChange={onSearch} />
        </Grid>

        <Grid item xs={3} style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <FormControl>
            <InputLabel id="monsterType">Type</InputLabel>

            <Select
              autoWidth
              labelId="monsterType"
              defaultValue="All"
              value={monsterType}
              onChange={onMonsterTypeSelect}
            >
              {["All", ...monsterTypes].map((name: any, i) => (
                <MenuItem key={i} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={3} style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <FormControl>
            <InputLabel id="difficulty">Difficulty</InputLabel>

            <Select
              autoWidth
              labelId="Difficulty"
              defaultValue="All"
              value={difficulty}
              onChange={onDifficultySelect}
            >
              {["All", ...monsterTypeDifficulties].map((name: any, i) => (
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

          {chunk(monstersData, 50)[0].map((monster: any) => (
            <ListItem
              key={monster._id}
              button
              onClick={() => selectMonster(monster)}
            >
              <ListItemText primary={monster.name} secondary={monster.book} />
              <ListItemText primary={monster.type} />
              <ListItemText primary={monster.difficulty} />
              <ListItemSecondaryAction>
                <Button
                  onClick={() =>
                    addMonsterButtonClick(monster._id, monstersData)
                  }
                >
                  Add
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}


