const FETCH_URL = "https://sotdl-api-fetch.vercel.app/api";
const EDIT_URL = "https://sotdl-api-edit.vercel.app/api";
const INSERT_URL = "https://sotdl-api-insert.vercel.app/api";

export const CHARACTER_URL = `${FETCH_URL}/characters`;
export const UPDATE_CHARACTER_HEALTH_URL = `${EDIT_URL}/update_character_health`;
export const UPDATE_CHARACTER_AFFLICTIONS = `${EDIT_URL}/update_character_afflictions`;
export const UPDATE_CHARACTER_EXPENDED_LIST = `${EDIT_URL}/update_character_expended_list`;
export const UPDATE_GEAR_STATUS_URL = `${EDIT_URL}/update_gear_status`;
export const UPDATE_CURRENCY_URL = `${EDIT_URL}/update_currency`;
export const UPDATE_OVERRIDE_URL = `${EDIT_URL}/update_overide`;

export const CREATE_CHARACTER_URL = `${INSERT_URL}/insertIntoCharacters`;
export const ANCESTRIES_URL = `${FETCH_URL}/ancestries`;
export const PATH_URL = `${FETCH_URL}/paths`;
export const SPELLS_URL = `${FETCH_URL}/spells`;
export const EQUIPMENT_URL = `${FETCH_URL}/items`;

export const EDIT_SPELL_URL = `${EDIT_URL}/updateSpells`;
export const EDIT_ITEM_URL = `${EDIT_URL}/updateItems`;
export const EDIT_ANCESTRY_URL = `${EDIT_URL}/updateAncestries`;
export const EDIT_PATH_URL = `${EDIT_URL}/updatePaths`;

export const CREATE_SPELL_URL = `${INSERT_URL}/insertIntoSpells`;
export const CREATE_ITEM_URL = `${INSERT_URL}/insertIntoItems`;
export const CREATE_ANCESTRY_URL = `${INSERT_URL}/insertIntoAncestries`;
export const CREATE_PATH_URL = `${INSERT_URL}/insertIntoPaths`;
