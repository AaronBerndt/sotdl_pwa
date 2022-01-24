import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useCharacter } from "../CharacterSheetPage/hooks/useCharacters";
import { CharacterBuilderProvider } from "./context/CharacterBuilderContext";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";
import PickEquipmentView from "./Organisms/PickEquipmentView/PickEquipmentView";

export default function PickSpellsPage() {
  const { characterId } = useParams<any>();
  const { data: characterData, isLoading } = useCharacter(characterId);

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <CharacterBuilderProvider
      values={characterData ? { ...characterData?.data } : {}}
    >
      <Grid style={{ paddingBottom: "20px" }}>
        <PickEquipmentView />
      </Grid>
      <Grid style={{ paddingTop: "30px" }}>
        <StepperFooter
          steps={["Equipment"]}
          activeStep={4}
          setActiveStep={Function}
        />
      </Grid>
    </CharacterBuilderProvider>
  );
}
