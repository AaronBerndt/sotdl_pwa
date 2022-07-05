import { Grid, List, ListItem } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Button, IconButton, ListItemSecondaryAction } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "../../../CharactersPage/Organisms/BottomNav/BottomNav";
import { Combat } from "../../CombatTrackerPageTypes";
import useCombats from "../../hooks/useCombats";
import useDeleteCombat from "../../hooks/useDeleteCombat";
import CombatOrderList from "../../Organisms/CombatOrderList/CombatOrderList";
import CreateCombatModal from "../../Organisms/CreateCombatModal/CreateCombatModal";
export default function CombatsTable() {
  const { combatId } = useParams<any>();
  console.log(combatId);
  const navigate = useNavigate();
  const { data: combatData, isLoading } = useCombats();
  const { mutate: deleteCombat } = useDeleteCombat();

  if (isLoading) {
    return <p>... Is Loading</p>;
  }

  return (
    <Grid container alignContent="center">
      {combatId !== undefined ? (
        <CombatOrderList combatId={combatId} />
      ) : (
        <List>
          {combatData.map((combat: Combat) => (
            <ListItem
              button
              onClick={() => navigate(`/combats/${combat._id}`)}
              key={combat._id}
            >
              {combat._id}
              <ListItemSecondaryAction>
                <IconButton onClick={() => deleteCombat(combat._id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <BottomNav components={<CreateCombatModal />} />
    </Grid>
  );
}
