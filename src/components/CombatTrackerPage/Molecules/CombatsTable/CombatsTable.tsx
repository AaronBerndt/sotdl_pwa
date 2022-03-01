import { List, ListItem } from "@material-ui/core";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Combat } from "../../CombatTrackerPageTypes";
import useCombats from "../../hooks/useCombats";
import CombatOrderList from "../../Organisms/CombatOrderList/CombatOrderList";
export default function CombatsTable() {
  const { combatId } = useParams<any>();
  const navigate = useNavigate();
  const { data: combatData, isLoading } = useCombats();

  if (isLoading) {
    return <p>... Is Loading</p>;
  }

  return (
    <>
      {combatId !== undefined ? (
        <CombatOrderList combatId={combatId} />
      ) : (
        <List>
          {combatData.map((combat: Combat) => (
            <ListItem button onClick={() => navigate(`/combats/${combat._id}`)}>
              {combat._id}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
