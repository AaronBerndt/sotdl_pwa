import { useQuery } from "react-query";
import axios from "axios";
import { CHARACTER_URL } from "../../../api.config";

const KEY = "Fetch Characters";
const FETCH_CHARACTER_KEY = "Fetch Character";
export default function useCharacters() {
  return useQuery(KEY, () => axios.get(CHARACTER_URL));
}

export function useCharacter(characterId: number) {
  return useQuery([FETCH_CHARACTER_KEY, characterId]);
}
