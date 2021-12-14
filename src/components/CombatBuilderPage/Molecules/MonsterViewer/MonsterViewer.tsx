import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
export type Props = {
  selectMonster: any;
};
export default function MonsterViewer({ selectMonster }: Props) {
  return (
    <Grid>
      <Grid item style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
        <Typography variant="h3">{selectMonster?.name}</Typography>
        <Typography variant="subtitle1">{`${selectMonster?.type} ${selectMonster?.difficulty}`}</Typography>
      </Grid>

      <Grid item style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
        <Typography variant="h4">Characteristics</Typography>
      </Grid>

      <Grid container style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
        {Object.entries(selectMonster?.characteristics).map(
          ([NAME, VALUE]: any, i) => (
            <Grid item xs={3}>
              <Typography>
                {NAME}: {VALUE}{" "}
                {[
                  "Strength",
                  "Agility",
                  "Will",
                  "Intellect",
                  "Perception",
                ].includes(NAME)
                  ? `(${VALUE - 10})`
                  : ""}
              </Typography>
            </Grid>
          )
        )}
      </Grid>

      <Grid item style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
        <Typography variant="h5">Actions</Typography>
        <List>
          {selectMonster?.actions
            .filter((action: any) => action.type === "Attack")
            .map((action: any) => (
              <ListItem>
                <ListItemText>{action.name}</ListItemText>
              </ListItem>
            ))}
        </List>
      </Grid>

      {selectMonster?.actions.filter((action: any) => action.type !== "Special")
        .length !== 0 && (
        <Grid item style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <Typography variant="h5">Special</Typography>
          <List>
            {selectMonster?.actions
              .filter((action: any) => action.type !== "Special")
              .map((action: any) => (
                <ListItem>
                  <ListItemText>{action.name}</ListItemText>
                </ListItem>
              ))}
          </List>
        </Grid>
      )}
      {selectMonster?.actions.filter(
        (action: any) => action.type !== "End of Round"
      ).length !== 0 && (
        <Grid item style={{ paddingBottom: "5px", paddingLeft: "10px" }}>
          <Typography variant="h5">End of Round</Typography>
          <List>
            {selectMonster?.actions
              .filter((action: any) => action.type !== "End of Round")
              .map((action: any) => (
                <ListItem>
                  <ListItemText>{action.name}</ListItemText>
                </ListItem>
              ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
}
