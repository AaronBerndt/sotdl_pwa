import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { useCombat } from "../../../CombatTrackerPage/hooks/useCombats";
import { useParty } from "../../../ManagePartiesPage/hooks/useParties";
import { Target, Targets } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

type Props = {
  open: boolean;
  targetReason: string;
  toggleOpen: Function;
  actionFunction: any;
  totalBB?: number;
};

const Div = styled.div`
  position: relative;
  cursor: pointer;
  text-align: center;
  margin-right: 10px;
`;

const AttributeValue = styled.div`
  font-size: 26px;
  font-weight: 500;
  line-height: 27px;
`;
const AttributeFooter = styled(AttributeValue)`
  font-size: 12px;
`;

export default function TargetModal(props: Props) {
  const { open, targetReason, toggleOpen, actionFunction } = props;
  const { partyId, activeCombat, _id } = useCharacterAttributes();
  const { data: party, isLoading: partyLoading }: any = useParty(partyId);
  const { data: currentCombat, isLoadingL: combatLoading }: any =
    useCombat(activeCombat);
  const [targets, setTargets] = useState<Targets>([]);
  const [extraDamage, setExtraDamage] = useState(0);
  const [extraDice, setExtraDice] = useState(0);

  const isNegative = Math.sign(props?.totalBB ? props?.totalBB : 0) === -1;

  const [boonAmount, setBoonAmount] = useState(
    !isNegative ? props?.totalBB : 0
  );

  console.log(props?.totalBB);
  const [baneAmount, setBaneAmount] = useState(isNegative ? props?.totalBB : 0);

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

  const onExtraDiceButtonClick = () => {
    setExtraDice((prev) => prev + 1);
  };

  const onExtraDamageButtonClick = () => {
    setExtraDamage((prev) => prev + 1);
  };

  const onClearDamageButtonClick = () => {
    setExtraDamage(0);
    setExtraDice(0);
  };

  const onBaneButtonClick = () => {
    setBaneAmount((prev) => (prev ? prev : 0) + 1);
    setBoonAmount(0);
  };

  const onBoonButtonClick = () => {
    setBoonAmount((prev) => (prev ? prev : 0) + 1);
    setBaneAmount(0);
  };

  const onClearButtonClick = () => {
    setBoonAmount(0);
    setBaneAmount(0);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{targetReason}</DialogTitle>
      {targetReason === "Choose Targets to damage" && (
        <>
          <Grid container xs={12}>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={6}>
                  <Button onClick={onExtraDiceButtonClick}>
                    <Div>
                      <AttributeValue>{extraDice}</AttributeValue>
                      <AttributeFooter>Dice</AttributeFooter>
                    </Div>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={onExtraDamageButtonClick}>
                    <Div>
                      <AttributeValue>{extraDamage}</AttributeValue>
                      <AttributeFooter>Damage</AttributeFooter>
                    </Div>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth onClick={onClearDamageButtonClick}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      {targetReason === "Choose Targets to attack" && (
        <>
          <Grid container xs={12}>
            <Grid item xs={6}>
              <Button onClick={onBaneButtonClick}>
                <Div>
                  <AttributeValue>{baneAmount}</AttributeValue>
                  <AttributeFooter>Bane</AttributeFooter>
                </Div>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={onBoonButtonClick}>
                <Div>
                  <AttributeValue>{boonAmount}</AttributeValue>
                  <AttributeFooter>Boon</AttributeFooter>
                </Div>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={onClearButtonClick}>
              Clear
            </Button>
          </Grid>
        </>
      )}

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
