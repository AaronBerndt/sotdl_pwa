import { Grid } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useCharacter } from "../CharacterSheetPage/hooks/useCharacters";
import { CharacterBuilderProvider } from "./context/CharacterBuilderContext";
import PickSpellsView from "./Organisms/PickSpellsView/PickSpellsView";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";

export default function PickSpellsPage() {
  const { characterId } = useParams<any>();
  const navigate = useNavigate();
  const { data: characterData, isLoading } = useCharacter(characterId);

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <CharacterBuilderProvider
      values={characterData ? { ...characterData?.data } : {}}
    >
      <Grid style={{ paddingBottom: "20px" }}>
        <PickSpellsView />;
      </Grid>
      <Grid style={{ paddingTop: "30px" }}>
        <StepperFooter
          steps={["Spells"]}
          activeStep={4}
          setActiveStep={Function}
        />
      </Grid>
    </CharacterBuilderProvider>
  );
}
