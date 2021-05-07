import Grid from "@material-ui/core/Grid";
import { useCharacter } from "./hooks/useCharacters";

export default function CharacterSheetPage() {
  const { data: characterData, isLoading } = useCharacter(1);
  return <Grid></Grid>;
}
