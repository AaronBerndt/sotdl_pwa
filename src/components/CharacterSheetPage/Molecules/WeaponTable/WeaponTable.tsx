import {
  ButtonGroup,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import RollAttackButton from "../../Atoms/RollAttackButton/RollAttackButton";
import RollDamageButton from "../../Atoms/RollDamageButton/RollDamageButton";
import { Weapon } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function WeaponTable() {
  const {
    items: { weapons },
  } = useCharacterAttributes();

  return (
    <List>
      {weapons
        .filter(({ equiped }: any) => equiped)
        .map((weapon, i) => (
          <ListItem key={i} button>
            <ListItemText primary={weapon.name} />
            <ListItemSecondaryAction>
              <ButtonGroup>
                <RollAttackButton
                  rollReason={weapon.name}
                  attributeToUse=""
                  attackRoll={weapon.attackRoll ? weapon.attackRoll : ""}
                />
                <RollDamageButton
                  rollReason={weapon.name}
                  damage={weapon.damageRoll}
                />
              </ButtonGroup>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
}
