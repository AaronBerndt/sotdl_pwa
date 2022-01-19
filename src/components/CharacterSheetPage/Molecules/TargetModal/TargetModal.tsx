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
import { useCombat } from "../../../CombatTrackerPage/hooks/useCombats";
import { useParty } from "../../../ManagePartiesPage/hooks/useParties";
import { Target, Targets } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

type Props = {
  open: boolean;
  targerReason: string;
  toggleOpen: Function;
  actionFunction: any;
};

export default function TargetModal(props: Props) {
  const { open, targerReason, toggleOpen, actionFunction } = props;
  const { partyId, activeCombat, _id } = useCharacterAttributes();
  const { data: party, isLoading: partyLoading }: any = useParty(partyId);
  const { data: currentCombat, isLoadingL: combatLoading }: any =
    useCombat(activeCombat);
  const [targets, setTargets] = useState<Targets>([]);

  if (partyLoading || combatLoading) {
    return <p>...Loading</p>;
  }

  const onToggleClick = (id: any, type: string) => {
    if (!targets.includes(id)) {
      setTargets((prev) => [...prev, { id, type }]);
    } else {
      setTargets((prev) => prev.filter((prevId) => prevId !== id));
    }
  };

  const performActionOnClick = () => {
    toggleOpen();
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
            onClick={() => onToggleClick(partyMember._id, "player")}
          >
            <Checkbox
              edge="start"
              checked={targets
                .map(({ id }: Target) => id)
                .includes(partyMember?._id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={partyMember._id === _id ? "Self" : partyMember.name}
            />

            <ListItemSecondaryAction>{`${partyMember.currentHealth}/${partyMember.health}`}</ListItemSecondaryAction>
          </ListItem>
        ))}
        {currentCombat?.combatants.map((combatant: any) => (
          <ListItem
            key={combatant._id}
            button
            dense
            onClick={() => onToggleClick(combatant._id, "monster")}
          >
            <Checkbox
              edge="start"
              checked={targets
                .map(({ id }: Target) => id)
                .includes(combatant?._id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={combatant.name} />
            <ListItemText primary={combatant.damage} />
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button
          onClick={() => performActionOnClick()}
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
