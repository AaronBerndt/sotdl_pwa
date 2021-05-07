import Grid from "@material-ui/core/Grid";
import CharacterNameTag from "./Atoms/CharacterNameTag/CharacterNameTag";
import HealthWorkspace from "./Atoms/HealthWorkpace/HealthWorkpace";
import { useCharacter } from "./hooks/useCharacters";

export default function CharacterSheetPage() {
  const { data: characterData, isLoading } = useCharacter(1);
  /* const { data: characterData, isLoading } = useCharacters(); */
  return (
    <>
      {isLoading ? (
        <p>Is Loading....</p>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CharacterNameTag {...characterData?.data} />
          </Grid>
          <Grid item xs={4}>
            <HealthWorkspace {...characterData?.data} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
