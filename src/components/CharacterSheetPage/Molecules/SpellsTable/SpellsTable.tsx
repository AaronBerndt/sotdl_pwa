import { List } from "@material-ui/core";
import useSpells from "../../../CreateCharacterPage/hooks/useSpells";
import SpellListItem from "../../Atoms/SpellListItem/SpellListItem";
import { Spell } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function SpellsTable() {
  const { spells } = useCharacterAttributes();
  const { data: spellList, isLoading } = useSpells(spells);

  if (isLoading) {
    return <p>Is Loading...</p>;
  }
  return (
    <List>
      {spellList.map((spell: Spell, i: number) => (
        <SpellListItem spell={spell} key={i} />
      ))}
    </List>
  );
}
