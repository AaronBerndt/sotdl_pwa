import { Grid, Typography, Avatar, Select, MenuItem } from "@material-ui/core";
import { find, groupBy } from "lodash";
import React, { useState } from "react";
import {
  Characteristic,
  Talent,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import tranditionList from "../../../CharacterSheetPage/Shared/Tranditions";
import ContentAccordion from "../../Atoms/ContentAccordion/ContentAccordion";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { keyObject } from "../../CreateCharacterPageConstants";
import usePaths from "../../hooks/usePaths";
export type Props = {
  pathName: string;
};
export default function PathContent({ pathName }: Props) {
  const [currentView, setCurrentView] = useState({
    name: "None",
    viewKey: "",
  });
  const { data: paths, isLoading } = usePaths();
  const { level: selectedLevel } = useCharacterBuilderContext();

  const path = find(paths, { name: pathName });

  if (isLoading) {
    return <p>Is Loading</p>;
  }

  const levelUpArray = groupBy(
    [...path.characteristics, ...path.talents],
    "level"
  );

  const onChange = (e: any) => {
    e.target.value === "None"
      ? setCurrentView({
          name: "None",
          viewKey: "",
        })
      : setCurrentView({
          name: `${e.target.value}`,
          viewKey: keyObject[pathName],
        });
  };

  return (
    <Grid>
      <Grid container>
        <Grid xs={10}>
          {
            <Typography variant="h4">
              {currentView.name === "None"
                ? path.name
                : `${path.name} - ${currentView.name}`}
            </Typography>
          }
        </Grid>
        <Grid xs={2} justify="flex-end">
          {<Avatar variant="square" />}
        </Grid>
      </Grid>
      <Grid>{<Typography variant="body2">{path.description}</Typography>}</Grid>
      {path.name === "Warrior" && (
        <>
          <Grid>{<Typography variant="h4">Discipline</Typography>}</Grid>
          <Grid>
            <Select defaultValue="None" onChange={onChange}>
              <MenuItem value={"None"}>None</MenuItem>
              {path.disciplines.map((discipline: any) => (
                <MenuItem value={discipline.name}>{discipline.name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </>
      )}
      {path.name === "Priest" && (
        <>
          <Grid>{<Typography variant="h4">Faith</Typography>}</Grid>
          <Grid>
            <Select defaultValue="None" onChange={onChange}>
              <MenuItem value={"None"}>None</MenuItem>
              {path.faiths.map((faith: any) => (
                <MenuItem value={faith.name}>{faith.name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </>
      )}

      {path.name === "Magician" && (
        <>
          <Grid>{<Typography variant="h4">Focus</Typography>}</Grid>
          <Grid>
            <Select defaultValue="None" onChange={onChange}>
              <MenuItem value={"None"}>None</MenuItem>
              {tranditionList.map((tradition) => (
                <MenuItem value={tradition}>{tradition}</MenuItem>
              ))}
            </Select>
          </Grid>
        </>
      )}
      {path.name === "Rogue" && (
        <>
          <Grid>{<Typography variant="h4">Knack</Typography>}</Grid>
          <Grid>
            <Select defaultValue="None" onChange={onChange}>
              <MenuItem value={"None"}>None</MenuItem>
              {path.knacks.map((knack: any) => (
                <MenuItem value={knack.name}>{knack.name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </>
      )}

      <Grid>
        {Object.entries(levelUpArray).map((group) => {
          const [LEVEL] = group;

          let currentPath = path;
          if (currentView.name !== "None") {
            currentPath = find(path[currentView.viewKey], {
              name: currentView.name,
            });
          }

          const talentList = currentPath.talents.filter(
            ({ level }: Talent) => level === parseInt(LEVEL)
          );

          const characteristicsList = currentPath.characteristics.filter(
            ({ level }: Characteristic) => level === parseInt(LEVEL)
          );

          return (
            <>
              <ContentAccordion
                header={`Level ${LEVEL} ${
                  currentView.name === "None"
                    ? path.name
                    : `${path.name} - ${currentView.name}`
                }`}
                defaultExpanded={selectedLevel >= parseInt(LEVEL)}
                details={
                  <Grid>
                    <Typography variant="h6">Characteristics</Typography>
                    {characteristicsList.map(
                      (characteristic: Characteristic) => (
                        <Typography>{`${characteristic.name}: +${characteristic.value}`}</Typography>
                      )
                    )}

                    <Typography variant="h6">Talents</Typography>
                    {talentList.map((talent: Talent) => (
                      <ContentAccordion
                        defaultExpanded={true}
                        header={talent.name}
                        details={talent.description}
                      />
                    ))}
                  </Grid>
                }
              />
            </>
          );
        })}
      </Grid>
    </Grid>
  );
}
