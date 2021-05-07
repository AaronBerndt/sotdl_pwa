import { useQuery } from "react-query";
import axios from "axios";
import { CHARACTER_URL } from "../../../api.config";

const KEY = "Fetch Characters";
const FETCH_CHARACTER_KEY = "Fetch Character";

const fetchCharacters = () => axios.get(CHARACTER_URL);

export default function useCharacters() {
  return useQuery(KEY, fetchCharacters);
}

export function useCharacter(characterId: number) {
  return useQuery([FETCH_CHARACTER_KEY, characterId], fetchCharacters);
}
