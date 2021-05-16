import { List } from "@material-ui/core";
import SpellListItem from "../../Atoms/SpellListItem/SpellListItem";
import { Spell } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function SpellsTable(): JSX.Element {
  const { spells } = useCharacterAttributes();

  return (
    <List>
      {spells.map((spell: Spell, i) => (
        <SpellListItem spell={spell} key={i} />
      ))}
    </List>
  );
}
