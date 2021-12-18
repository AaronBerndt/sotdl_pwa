import { Grid, List, ListItem } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import useParties from "./hooks/useParties";
import { Party } from "./ManagePartiesPageTypes";

export default function ManagePartiesPage() {
  const navigate = useNavigate();
  const { data: partiesData, isLoading } = useParties();

  if (isLoading) {
    return <p>...Loading</p>;
  }
  return (
    <Grid container alignContent="center">
      <List>
        <ListItem
          button
          onClick={() => {
            navigate(`/create_party/`);
          }}
        >
          Create Party
        </ListItem>
        {partiesData.map((party: Party, i: number) => (
          <ListItem
            button
            key={i}
            onClick={() => {
              navigate(`/edit_party/${party._id}`);
            }}
          >
            {party.name}
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
