import Grid from "@material-ui/core/Grid";
import { useCharacter } from "./hooks/useCharacters";

export default function CharacterSheetPage() {
  const { data: characterData, isLoading } = useCharacter(1);
  /* const { data: characterData, isLoading } = useCharacters(); */
  return <Grid>{characterData?.data.name}</Grid>;
}
