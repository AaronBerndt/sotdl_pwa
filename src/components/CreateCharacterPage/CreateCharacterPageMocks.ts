import { RestHandler } from "msw";
import { ANCESTRIES_URL } from "../../api.config";
import { createGetMock } from "../../mocks/createHandlers";

const ancestryList = [
  {
    _id: "5e761e36cc874b7ccb18b0bc",
    name: "Human",
    description:
      "Determination, resourcefulness, and sheer numbers helped humanity rise from its humble, primitive origins to become the most widespread and numerous people in the world.  Few places have escaped human expansion, and settlements exist in mountains and swamps, desolate wastes and verdant plains. Human civilization has defined the last thousand years of history and continues even as the shadow falls.",
    languages: "Common",
    professions: "Common",
    talents: [
      {
        name: "Determined",
        description:
          "When you roll a 1 on the die from a boon, you can reroll the die and choose to use the new number.",
        level: 4,
      },
    ],
    characteristics: [
      {
        name: "Strength",
        value: 10,
        level: 0,
      },
      {
        name: "Agility",
        value: 10,
        level: 0,
      },
      {
        name: "Agility",
        value: 10,
        level: 0,
      },
      {
        name: "Will",
        value: 10,
        level: 0,
      },
      {
        name: "Health",
        value: 5,
        level: 4,
      },
    ],
  },
];

const mocks: RestHandler[] = [createGetMock(ANCESTRIES_URL, 200, ancestryList)];

export default mocks;
