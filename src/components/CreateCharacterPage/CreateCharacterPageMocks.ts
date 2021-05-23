import { RestHandler } from "msw";
import { ANCESTRIES_URL, PATH_URL } from "../../api.config";
import { createGetMock } from "../../mocks/createHandlers";

export const ancestryList = [
  {
    id: 1,
    book: "Core",
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
        name: "Intellect",
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

const pathsList = [
  {
    name: "Warrior",
    type: "Novice",
    description:
      "Extensive training with weapons and studying numerous fighting styles teach warriors how to fight and survive on the battlefield. Their skills depend on being physically fit, quick and nimble, or a combination of both. Upon completing their training, warriors can pick up and fight with almost any weapon, striking with greater precision and greater force than anyone else. Although all warriors know how to fight, they distinguish themselves by the weapons they wield. Some favor archery and put their focus on ranged weapons. Others fight with swords and axes, using their might to overcome their foes. Others still favor swift weapons, slipping rapier or saber strikes through their enemies’ defenses. Warriors come from all backgrounds. They are howling barbarians tumbling out from the depth of the wilderness, veteran soldiers marching in the Empire’s armies, hard-bitten mercenaries, mystics who transform their bodies into weapons, or anyone else who knows how to win battles through superior skill at arms.",
    attributes: "+1 to two",
    professions: "You add one common, martial, or wilderness profession.",
    talents: [
      {
        name: "Determined",
        description:
          "When you roll a 1 on the die from a boon, you can reroll the die and choose to use the new number.",
        level: 1,
      },
      {
        name: "Catch Your Breath",
        description:
          "You can use an action or a triggered action on your turn to heal damage equal to your healing rate. Once you use this talent, you cannot use it again until after you complete a rest.",
        level: 1,
      },
      {
        name: "Weapon Training",
        description:
          "When attacking with a weapon, you make the attack roll with 1 boon.",
        level: 1,
      },
      {
        name: "Combat Prowess",
        description: "Your attacks with weapons deal 1d6 extra damage.",
        level: 2,
      },
      {
        name: "Forceful Strike",
        description:
          "When the total of your attack roll is 20 or higher and exceeds the target number by at least 5, the attack deals 1d6 extra damage.",
        level: 2,
      },
      {
        name: "Combat Expertise",
        description:
          "When you use an action to attack with a weapon, you either deal 1d6 extra damage with that attack or make another attack against a different target at any point before the end of your turn.",
        level: 5,
      },
      {
        name: "Grit",
        description: "You can use Catch Your Breath twice between each rest.",
        level: 8,
      },
      {
        name: "Combat Mastery",
        description:
          "When you use an action to attack with a weapon, you either deal 1d6 extra damage with that attack or make another attack against a different target at any point before the end of your turn. This talent is cumulative with Combat Expertise. You must choose a different target for each attack you make.",
        level: 8,
      },
    ],
    characteristics: [
      {
        name: "Health",
        value: 5,
        level: 1,
      },
      {
        name: "Health",
        value: 5,
        level: 2,
      },
      {
        name: "Health",
        value: 5,
        level: 5,
      },
      {
        name: "Defense",
        value: 5,
        level: 5,
      },
      {
        name: "Health",
        value: 5,
        level: 8,
      },
    ],
  },
];

const mocks: RestHandler[] = [
  createGetMock(PATH_URL, 200, pathsList),
  createGetMock(ANCESTRIES_URL, 200, ancestryList),
];

export default mocks;
