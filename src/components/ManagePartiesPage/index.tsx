import { List, ListItem } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import useParties from "./hooks/useParties";
import { Party } from "./ManagePartiesPageTypes";

export default function ManagePartiesPage() {
  const history = useHistory();
  const { data: partiesData, isLoading } = useParties();

  return (
    <List>
      <ListItem
        button
        onClick={() => {
          history.push(`/manage_parties/create_party`);
        }}
      >
        Create Party
      </ListItem>
      {partiesData.map((party: Party, i: number) => (
        <ListItem
          button
          key={i}
          onClick={() => {
            history.push(`/manage_parties/edit_party/${party._id}`);
          }}
        >
          {party.name}
        </ListItem>
      ))}
    </List>
  );
}
