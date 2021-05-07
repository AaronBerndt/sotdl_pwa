import { Button } from "@material-ui/core";
import { filterAndSum } from "../../../../utils/arrayUtils";
import { Characteristics, CharacterState } from "../../CharacterSheetPageTypes";

type Props = {
  characteristics: Characteristics;
  characterState: CharacterState;
};

export default function HealthWorkspace({
  characteristics,
  characterState,
}: Props) {
  const maxHealth = filterAndSum(characteristics, "Health", "name");
  const currentHealth = maxHealth - characterState.currentDamage;

  return (
    <>
      <Button>{`${currentHealth}/${maxHealth}`}</Button>
    </>
  );
}
