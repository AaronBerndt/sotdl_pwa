import { Checkbox, List, ListItem, ListItemText } from "@material-ui/core";
import React, { useState } from "react";
import { useParty } from "../../../ManagePartiesPage/hooks/useParties";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function TargetModal() {
  const { partyId } = useCharacterAttributes();
  const { data: party, isLoading }: any = useParty(partyId);
  const [targets, setTargets] = useState<string[]>([]);

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const onToggleClick = () => {
    setTargets((prev) => [...prev]);
  };
  return (
    <>
      <List>
        {party.map((partyMember: any) => (
          <ListItem key={partyMember._id} button dense onClick={onToggleClick}>
            <Checkbox
              edge="start"
              checked={targets.includes(partyMember?._id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={partyMember.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
