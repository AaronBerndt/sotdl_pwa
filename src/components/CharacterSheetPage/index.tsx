import Grid from "@material-ui/core/Grid";
import CharacterNameTag from "./Atoms/CharacterNameTag/CharacterNameTag";
import { useCharacter } from "./hooks/useCharacters";

export default function CharacterSheetPage() {
  const { data: characterData, isLoading } = useCharacter(1);
  /* const { data: characterData, isLoading } = useCharacters(); */
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <CharacterNameTag {...characterData?.data} />
      </Grid>
      <Grid item xs={4}>
        <div>Health</div>
      </Grid>
    </Grid>
  );
}
