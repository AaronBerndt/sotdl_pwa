const FETCH_URL = "https://sotdl-api-fetch.vercel.app/api";
// const FETCH_URL = "http://localhost:3000/api";
const EDIT_URL = "https://sotdl-api-edit.vercel.app/api";
// const EDIT_URL = "http://localhost:3000/api";
const INSERT_URL = "https://sotdl-api-insert.vercel.app/api";
// const INSERT_URL = "http://localhost:3000/api";
const DELETE_URL = "https://sotdl-api-delete.vercel.app/api";
const TARGET_URL = "https://sotdl-api-targeting.vercel.app/api";
// const TARGET_URL = "http://localhost:3000/api";
const COMBAT_TRACKER_URL = "https://sotdl-api-combat.vercel.app/api";

export const CHARACTER_URL = `${FETCH_URL}/characters`;
export const UPDATE_CHARACTER_HEALTH_URL = `${EDIT_URL}/updateCharacterHealth`;
export const UPDATE_CHARACTER_AFFLICTIONS = `${EDIT_URL}/updateCharacterAfflications`;
export const UPDATE_CHARACTER_EXPENDED_LIST = `${EDIT_URL}/updateCharacterExpendedList`;
export const UPDATE_GEAR_STATUS_URL = `${EDIT_URL}/updateEquipCharacterGear`;
export const UPDATE_CURRENCY_URL = `${EDIT_URL}/update_currency`;
export const UPDATE_OVERRIDE_URL = `${EDIT_URL}/updateCharacterOverrides`;
export const UPDATE_TEMPORARYEFFECTS_URL = `${EDIT_URL}/updateCharacterTemporaryEffects`;
export const FULL_REST_URL = `${EDIT_URL}/updateCharacterFullRest`;

export const CREATE_CHARACTER_URL = `${INSERT_URL}/insertIntoCharacters`;
export const CREATE_RANDOM_CHARACTER_URL = `${INSERT_URL}/insertIntoCharactersRandom`;
export const ANCESTRIES_URL = `${FETCH_URL}/ancestries`;
export const PATH_URL = `${FETCH_URL}/paths`;
export const SPELLS_URL = `${FETCH_URL}/spells`;
export const EQUIPMENT_URL = `${FETCH_URL}/items`;
export const PARTIES_URL = `${FETCH_URL}/parties`;
export const MONSTER_URL = `${FETCH_URL}/monsters`;
export const COMBAT_TEMPLATES_URL = `${FETCH_URL}/combatTemplates`;

export const EDIT_SPELL_URL = `${EDIT_URL}/updateSpells`;
export const EDIT_ITEM_URL = `${EDIT_URL}/updateItems`;
export const EDIT_ANCESTRY_URL = `${EDIT_URL}/updateAncestries`;
export const EDIT_PATH_URL = `${EDIT_URL}/updatePaths`;
export const EDIT_CHARACTER_URL = `${EDIT_URL}/updateCharacters`;
export const EDIT_PARTY_URL = `${EDIT_URL}/updateParty`;

export const CREATE_SPELL_URL = `${INSERT_URL}/insertIntoSpells`;
export const CREATE_ITEM_URL = `${INSERT_URL}/insertIntoItems`;
export const CREATE_ANCESTRY_URL = `${INSERT_URL}/insertIntoAncestries`;
export const CREATE_PATH_URL = `${INSERT_URL}/insertIntoPaths`;
export const CREATE_PARTY_URL = `${INSERT_URL}/insertIntoParties`;

export const DELETE_CHARACTER_URL = `${DELETE_URL}/deleteCharacter`;
export const COMBAT_URL = `${FETCH_URL}/combats`;
export const CREATE_COMBAT_URL = `${INSERT_URL}/insertIntoCombat`;
export const CREATE_COMBAT_TEMPLATE_URL = `${INSERT_URL}/insertIntoCombatTemplates`;
export const DELETE_COMBAT_URL = `${FETCH_URL}/deleteCombat`;
export const EDIT_COMBAT_URL = `${EDIT_URL}/updateCombats`;
export const DELETE_PARTY_URL = `${DELETE_URL}/deleteParty`;

export const ATTACK_TARGET_URL = `${TARGET_URL}/targetWithAttack`;
export const HEAL_TARGET_URL = `${TARGET_URL}/targetWithHeal`;
export const DAMAGE_TARGET_URL = `${TARGET_URL}/targetWithDamage`;
export const UPDATE_ROUND_URL = `${COMBAT_TRACKER_URL}/updateCurrentRound`;
export const TEMPORARYEFFECTS_TARGET_URL = `${TARGET_URL}/targetWithTemporaryEffect`;
export const UPDATE_COMBAT_TURN_COUNTER_URL = `${COMBAT_TRACKER_URL}/updateCombatTurnCounter`;
export const UPDATE_COMBATANT_TURN_TYPE_URL = `${COMBAT_TRACKER_URL}/updateCombatantTurnType`;
