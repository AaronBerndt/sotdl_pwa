import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useCharacter } from "../CharacterSheetPage/hooks/useCharacters";
import { CharacterBuilderProvider } from "./context/CharacterBuilderContext";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";
import AdjustAttributesView from "./Organisms/AttributesView/AdjustAttributesView";

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
        <AdjustAttributesView />
      </Grid>
      <Grid style={{ paddingTop: "30px" }}>
        <StepperFooter
          steps={["Adjust Attributes"]}
          activeStep={4}
          setActiveStep={Function}
        />
      </Grid>
    </CharacterBuilderProvider>
  );
}
