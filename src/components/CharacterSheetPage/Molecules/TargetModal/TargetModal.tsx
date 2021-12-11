import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { useParty } from "../../../ManagePartiesPage/hooks/useParties";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

type Props = {
  open: boolean;
  targerReason: string;
  toggleOpen: Function;
  actionFunction: any;
};
export default function TargetModal(props: Props) {
  const { open, targerReason, toggleOpen, actionFunction } = props;
  const { partyId, _id } = useCharacterAttributes();
  const { data: party, isLoading }: any = useParty(partyId);
  const [targets, setTargets] = useState<string[]>([]);

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const onToggleClick = (id: any) => {
    if (!targets.includes(id)) {
      setTargets((prev) => [...prev, id]);
    } else {
      setTargets((prev) => prev.filter((prevId) => prevId !== id));
    }
  };

  const performActionOnClick = () => {
    actionFunction(targets);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{targerReason}</DialogTitle>
      <List>
        {party.map((partyMember: any) => (
          <ListItem
            key={partyMember._id}
            button
            dense
            onClick={() => onToggleClick(partyMember._id)}
          >
            <Checkbox
              edge="start"
              checked={targets.includes(partyMember?._id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={partyMember._id === _id ? "Self" : partyMember.name}
            />

            <ListItemSecondaryAction>{`${partyMember.currentHealth}/${partyMember.health}`}</ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button
          onClick={performActionOnClick}
          variant="contained"
          color="primary"
        >
          Perform Action
        </Button>
        <Button onClick={() => toggleOpen()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
