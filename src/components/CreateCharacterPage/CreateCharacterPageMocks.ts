import { RestHandler } from "msw";
import {
  ANCESTRIES_URL,
  EQUIPMENT_URL,
  PATH_URL,
  SPELLS_URL,
} from "../../api.config";
import { createGetMock } from "../../mocks/createHandlers";

export const ancestryList = [
  {
    id: 1,
    book: "Core",
    name: "Human",
    description:
      "Determination, resourcefulness, and sheer numbers helped humanity rise from its humble, primitive origins to become the most widespread and numerous people in the world.  Few places have escaped human expansion, and settlements exist in mountains and swamps, desolate wastes and verdant plains. Human civilization has defined the last thousand years of history and continues even as the shadow falls.",
    talents: [
      {
        name: "Languages and Professions",
        description: "You Speak Common",
        level: 0,
      },

      {
        name: "Attributes Increase",
        description: "Increase one by 1",
        level: 0,
      },

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
        name: "Corruption",
        value: 0,
        level: 0,
      },
      {
        name: "Insanity",
        value: 0,
        level: 0,
      },
      {
        name: "Power",
        value: 0,
        level: 0,
      },
      {
        name: "Size",
        value: 1,
        level: 0,
      },
      {
        name: "Speed",
        value: 10,
        level: 0,
      },
      {
        name: "Health",
        value: 5,
        level: 4,
      },
    ],
    detailChoices: [
      {
        name: "Background",
        origin: "Ancestry",
        choices: [
          "You died and returned to life. You start the game with 1d6 Insanity.",
          "The faerie held you prisoner for 1d20 years",
        ],
      },
      {
        name: "Religion",
        origin: "Ancestry",
        choices: [
          "You belong to the Cult of the New God",
          "You Have no religion.",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Dwarf",
    description:
      "Dwarfs live under the mountains in elaborate subterranean cities. From them, they launch expeditions deep into the earth to pry gold and silver from the unyielding rock. They hoard their treasures in great vaults and view other peoples with distrust, suspecting them all of coveting their wealth. The dwarfs have few friends and gain little aid when the forces of darkness overrun their strongholds to lay claim to their vaults. Thus many dwarfs wander the lands, homeless, friendless, searching for a new place to call their own",

    characteristics: [
      {
        name: "Strength",
        value: 10,
        level: 0,
      },
      {
        name: "Agility",
        value: 9,
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
        name: "Perception",
        value: 1,
        level: 0,
      },
      {
        name: "Corruption",
        value: 0,
        level: 0,
      },
      {
        name: "Insanity",
        value: 0,
        level: 0,
      },
      {
        name: "Power",
        value: 0,
        level: 0,
      },
      {
        name: "Speed",
        value: 8,
        level: 0,
      },

      {
        name: "Size",
        value: 0.5,
        level: 0,
      },
      {
        name: "Health",
        value: 4,
        level: 0,
      },

      {
        name: "Health",
        value: 5,
        level: 4,
      },
    ],
    talents: [
      {
        name: "Languages and Professions",
        description: "You Speak Common",
        level: 0,
      },
      {
        name: "Darksight",
        description:
          "You can see in areas obscured by shadows or\r\ndarkness within medium range as if those areas were lit. Beyond this distance, you treat darkness as shadows and shadows as lit.",
        level: 0,
      },
      {
        name: "Hated Creature",
        description:
          "Choose a creature from the Hatred table. Your hatred grants 1 boon on attack rolls made against creatures you hate.",
        level: 0,
      },
      {
        name: "Robust Constitution",
        description:
          "You take half damage from poison. You make challenge rolls with 1 boon to avoid or remove the poisoned affliction.",
        level: 0,
      },
      {
        name: "Shake it Off",
        description:
          "You can use an action to heal damage equal to your healing rate and remove one of the following afflictions: fatigued, impaired, or poisoned. Once you use this talent, you cannot use it again until after you complete a rest.",
        level: 4,
      },
    ],
    detailChoices: [
      {
        name: "Background",
        origin: "Ancestry",
        choices: [
          "You sold your soul to a devil to gain wealth. The devil betrayed you and left you penniless. You start the game with 1 Corruption",
        ],
      },
      {
        name: "Hatred",
        origin: "Ancestry",
        choices: ["Elves", "Orcs"],
      },
      {
        name: "Age",
        origin: "Ancestry",
        choices: [
          "You are a child, 20 years old or younger",
          "You are a venerable adult, 151 years old or older.",
        ],
      },
    ],
  },
];

export const pathsList = [
  {
    name: "Warrior",
    type: "Novice",
    description:
      "Extensive training with weapons and studying numerous fighting styles teach warriors how to fight and survive on the battlefield. Their skills depend on being physically fit, quick and nimble, or a combination of both. Upon completing their training, warriors can pick up and fight with almost any weapon, striking with greater precision and greater force than anyone else.",
    talents: [
      {
        name: "Attributes Increase",
        description: "Increase two by 1",
        level: 1,
      },
      {
        name: "Languages and Professions",
        description: "You add one common, martial, or wilderness profession.",
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
        value: 1,
        level: 5,
      },
      {
        name: "Health",
        value: 5,
        level: 8,
      },
    ],
    disciplines: [
      {
        name: "Spellguard",
        description: "Magic Guard of Spells",
        characteristics: [
          {
            name: "Health",
            value: 4,
            level: 1,
          },
          {
            name: "Power",
            value: 1,
            level: 1,
          },
        ],
        talents: [
          {
            name: "Brutal Recovery",
            description:
              "You can  use an action to heal damage equal to your healing rate. Until the end of the next round, your attacks with melee weapons deal 1d6 extra damage. Once you use  this talent, you must wait until you complete a rest before you can use it again. ",
            level: 1,
          },
        ],
      },
      {
        name: "Brawler",
        description: "Fights stuff",
        characteristics: [
          {
            name: "Health",
            value: 5,
            level: 1,
          },
        ],
        talents: [
          {
            name: "Brutal Recovery",
            description:
              "You can  use an action to heal damage equal to your healing rate. Until the end of the next round, your attacks with melee weapons deal 1d6 extra damage. Once you use  this talent, you must wait until you complete a rest before you can use it again. ",
            level: 1,
          },
        ],
      },
    ],

    detailChoices: [
      {
        name: "Training",
        origin: "Novice",
        choices: [
          "You spent time in service to a knight as a squire. You learned how to fight, ride, care for your gear, and conduct yourself in a proper and noble manner",
        ],
      },
    ],
  },
  {
    name: "Magician",
    type: "Novice",
    description:
      "Magicians strive to reach the heights of magical power. If they follow this journey to its end, choosing paths to complement what they have learned, they join the most powerful users of magic in the world.\r\nHopeful magicians must first discover a tradition of magic to begin learning spells. Discovery can be accidental, resulting from being affected by a spell, stumbling into an area steeped in magical energy, or finding power within oneself.",
    talents: [
      {
        name: "Attributes Increase",
        description: "Increase two by 1",
        level: 1,
      },
      {
        name: "Languages and Professions",
        description:
          "You read all\r\nthe languages you know how to speak. In addition, you add one academic area of knowledge of your choice.",
        level: 1,
      },
      {
        name: "Magic",
        description:
          "You discover one tradition. Then, make three choices. For each choice, you either discover another tradition or learn a spell from a tradition you have discovered.",
        level: 1,
      },
      {
        name: "Cantrip",
        description:
          "Whenever you discover a tradition, you learn an extra rank 0 spell from that tradition.",
        level: 1,
      },
      {
        name: "Sense Magic",
        description: "You learn the sense magic spel",
        level: 1,
      },
      {
        name: "New magic",
        description:
          "Make two choices. For each choice, you either\r\ndiscover a new tradition or learn a spell from a\r\ntradition you have discovered.",
        level: 2,
      },
      {
        name: "Spell Recovery",
        description:
          "You can use an action to heal damage\r\nequal to your healing rate and regain one casting you expended of a spell you learned. Once you use\r\nthis talent, you cannot use it again until after you complete a rest.",
        level: 2,
      },
      {
        name: "New Magic",
        description: "You discover a tradition or learn one spell.",
        level: 5,
      },
      {
        name: "Counterspell",
        description:
          "When a creature you can\r\nsee attacks you with a spell,\r\nyou can use a triggered action to\r\ncounter it. The triggering creature makes the attack roll with 1 bane and\r\nyou make the challenge roll to resist it with 1 boon.\r\n",
        level: 5,
      },
      {
        name: "New Magic",
        description: "You discover a tradition or learn one spell.",
        level: 8,
      },
      {
        name: "Improved Spell Recoveryj",
        description:
          "When you use Spell Recovery, you regain two castings instead of one",
        level: 8,
      },
    ],
    characteristics: [
      {
        name: "Health",
        value: 2,
        level: 1,
      },
      {
        name: "Power",
        value: 1,
        level: 1,
      },
      {
        name: "Health",
        value: 2,
        level: 2,
      },
      {
        name: "Health",
        value: 2,
        level: 5,
      },
      {
        name: "Power",
        value: 1,
        level: 5,
      },
      {
        name: "Health",
        value: 2,
        level: 8,
      },
    ],
    detailChoices: [
      {
        name: "Training",
        origin: "Novice",
        choices: ["You discovered magic from a book or scroll."],
      },
    ],
  },
  {
    name: "Rogue",
    type: "Novice",
    description:
      "Rogues always have a trick up their sleeves. Using a combination of luck and skill, rogues can usually find  solutions to their problems.",
    talents: [
      {
        name: "Attributes Increase",
        description: "Increase two by 1",
        level: 1,
      },
      {
        name: "Languages and Professions",
        description: "You add one common, criminal, or wilderness profession.",
        level: 1,
      },

      {
        name: "Nimble Recovery",
        description: "Choose a roguery talent from the ones described below.",
        level: 1,
      },
      {
        name: "Roguery Talent",
        description: "Choose a roguery talent from the ones described below.",
        choices: [
          {
            name: "Rogue Magic",
            description:
              "You gain the following benefits: •  Increase your Power by 1. •  Discover one tradition of your choice. •  Discover another tradition or learn one spell from a tradition you have discovered.",
          },

          {
            name: "Backstab",
            description:
              "Once per round, when you use a basic or swift weapon to attack a  target creature and you made the attack roll with at least 1 boon, the attack  deals 1d6 extra damage.",
          },
          {
            name: "Brutal Backstab",
            description:
              "Backstab The extra damage from your Backstab talent increases to 2d6.",
            requirement: "Backstab",
          },
        ],
        level: 2,
      },
      {
        name: "Roguery Talent",
        description: " Choose a roguery talent from the ones described below.",
        choices: [
          {
            name: "Rogue Magic",
            description:
              "You gain the following benefits: •  Increase your Power by 1. •  Discover one tradition of your choice. •  Discover another tradition or learn one spell from a tradition you have discovered.",
          },
          {
            name: "Backstab",
            description:
              "Once per round, when you use a basic or swift weapon to attack a  target creature and you made the attack roll with at least 1 boon, the attack  deals 1d6 extra damage.",
          },
          {
            name: "Brutal Backstab",
            description:
              "Backstab The extra damage from your Backstab talent increases to 2d6.",
            requirement: "Backstab",
          },
        ],

        level: 8,
      },
    ],
    rogueTalents: [
      {
        name: "Rogue Magic",
        description:
          "You gain the following benefits: •  Increase your Power by 1. •  Discover one tradition of your choice. •  Discover another tradition or learn one spell from a tradition you have discovered.",
      },
      {
        name: "Backstab",
        description:
          "Once per round, when you use a basic or swift weapon to attack a  target creature and you made the attack roll with at least 1 boon, the attack  deals 1d6 extra damage.",
      },
      {
        name: "Brutal Backstab",
        description:
          "Backstab The extra damage from your Backstab talent increases to 2d6.",
        requirement: "Backstab",
      },
    ],
    characteristics: [
      {
        name: "Health",
        value: 3,
        level: 1,
      },
      {
        name: "Health",
        value: 3,
        level: 2,
      },
      {
        name: "Health",
        value: 3,
        level: 5,
      },
    ],
    detailChoices: [
      {
        name: "Training",
        origin: "Novice",
        choices: [
          "Your techniques helped you survive in a city’s mean streets or on the frontiers of civilization.",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Assassin",
    description:
      "Assassins specialize in the art of murder. They learn the best ways to speed their victims to the grave, whether using a strangling cord, poison in a cup, or a knife slid between the ribs. Assassins avoid fair fights, preferring to skulk in the shadows, where they can watch for the perfect time to strike.",
    type: "Expert",
    talents: [
      {
        name: "Attributes Increase",
        description: "Increase two by 1",
        level: 3,
      },

      {
        name: "Languages and Professions",
        description:
          "You can speak another language or you add a common or criminal profession.",
        level: 3,
      },
      {
        name: "Assassinate",
        description:
          "When a surprised creature or a creature from which you are hidden takes damage from your attack, it must make a Strength challenge roll. The target makes the roll with 1 boon for each point of Size it is larger than you. On a failure, it takes damage equal to its Health.",
        level: 3,
      },
      {
        name: "Disguise Expertise",
        description:
          "If you have a disguise kit, you can use an action to expend a use from the kit to don a disguise.",
        level: 3,
      },
      {
        name: "Quick Reflexes",
        description:
          "You can use a triggered action on your turn to hide or retreat.",
        level: 3,
      },
      {
        name: "Manufacture Poison",
        description:
          "You can use an action and an alchemist’s kit to create a dose of poison. You must spend at least 1 minute concentrating, during which time you use the kit and special ingredients worth 5 cp. At the end of this time, you create one dose of poison. The poison retains potency until you complete a rest.",
        level: 6,
      },
      {
        name: "Killer’s Eye",
        description:
          "You can use an action on your turn to choose one creature within long range from which you are hidden. Make a Perception challenge roll. On a success, you know where best to attack the target for 1 minute. Until the effect ends, when you attack the target, you make your attack roll with 1 boon and the attack deals 2d6 extra damage.",
        level: 9,
      },
    ],
    characteristics: [
      {
        name: "Perception",
        value: 3,
        level: 3,
      },
      {
        name: "Health",
        value: 3,
        level: 3,
      },
      {
        name: "Health",
        value: 3,
        level: 6,
      },
      {
        name: "Health",
        value: 3,
        level: 9,
      },
    ],
    detailChoices: [
      {
        name: "Story Development",
        origin: "Expert",
        choices: [
          "You are a professional killer. You take contracts to eliminate specific individuals. You might limit your targets to the guilty, the evil, or the corrupt. Or you might kill anyone if the price is right.",
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Blade",
    type: "Master",
    description:
      "Blades are master knife-fighters. Quick and precise strikes pierce their enemies’ defenses and deliver painful, bleeding wounds. Many blades have criminal backgrounds, developing their techniques after long use of these concealable weapons.",
    talents: [
      {
        name: "Attributes Increase",
        description: "Increase three by 1",
        level: 7,
      },

      {
        name: "Languages and Professions",
        description: "You can speak another language or add a profession.",
        level: 7,
      },

      {
        name: "Bleed",
        description:
          "Your attacks with daggers, knives, and similar off-hand weapons can leave bleeding wounds. When the total of your attack roll is 20 or higher with such a weapon and exceeds the target number by at least 5, the target suffers a bleeding wound that lasts until the target heals damage or until a creature uses an action to stanch the wound. While suffering from the wound, the target is fatigued and takes 1d6 extra damage at the end of each round.",
        level: 7,
      },
      {
        name: "Swift Blade",
        description:
          "You can use a triggered action on your turn to attack with a dagger or knife.",
        level: 10,
      },
    ],
    characteristics: [
      {
        name: "Health",
        value: 4,
        level: 7,
      },
      {
        name: "Health",
        value: 4,
        level: 10,
      },
    ],
  },
];

export const spellList = [
  {
    _id: "60cfaaa49b4a6f765555c0c7",
    name: "Acid Darts",
    tradition: "Alchemy",
    attribute: "Intellect",
    damage: "1d6,1d3",
    type: "Attack",
    level: "2",
    description:
      "You fling three acidic, gelatinous blobs from your hand.\nDivide the blobs among the targets. For each blob, make an\nIntellect attack roll against the target’s Agility. On a success,\nthe target takes 1d6 damage and, at the end of the round,\ntakes 1d3 extra damage unless it uses an action to remove\nthe acid.",
    book: "Demon Lord Companion",
    properties: [
      {
        name: "Target",
        description: "Up to three creatures or objects within medium range",
      },
      {
        name: "Attack Roll 20+",
        description:
          "The target takes 1d3 extra damage at the end of each round for 1 minute or until it uses an action to remove the acid.",
      },
    ],
  },
  {
    _id: "60cfaaa49b4a6f765555c2dd",
    name: "Flense",
    tradition: "Air",
    attribute: "Will",
    damage: "2d6+3",
    type: "Attack",
    level: "1",
    description:
      "Windborne grit scours your target. Make a Will attack roll\nagainst the target’s Strength. On a success, the target\ntakes 2d6 + 3 damage. A living creature that becomes\nincapacitated by this damage dies instantly, its flesh (if any)\nstripped from its bones.",
    book: "Shadow of the Demon Lord",
    properties: [
      {
        name: "Target",
        description: "One creature or object within short range",
      },
      {
        name: "Attack Roll 20+",
        description: "The target takes 2d6 extra damage.",
      },
    ],
  },
];

export const equipmentList = [
  {
    id: 123468,
    name: "Axe",
    description: "",
    itemType: "weapon",
    damage: "1d6 +1",
    requirement: 0,
    hands: 1,
    properties: [],
    type: "Basic",
    price: "1 ss",
    availability: "C",
    equiped: false,
  },
  {
    id: 1,
    name: "Crossbow",
    description: "",
    requirement: 0,
    itemType: "weapon",
    damage: "1d6",
    hands: 2,
    properties: ["Range"],
    type: "Basic",
    price: "1 ss",
    availability: "C",
    equiped: false,
  },
  {
    id: 66664,
    name: "Shield",
    description: "",
    requirement: 0,
    itemType: "weapon",
    damage: "1",
    hands: 1,
    properties: ["Defensive + 1"],
    type: "Basic",
    price: "1 ss",
    availability: "C",
    equiped: false,
  },
  {
    id: 666647,
    name: "Large Shield",
    requirement: 0,
    description: "",
    itemType: "weapon",
    damage: "1d3",
    hands: 1,
    properties: ["Defensive + 2"],
    type: "Basic",
    price: "1 ss",
    availability: "C",
    equiped: false,
  },
  {
    id: 12346,
    name: "Light Armor",
    item_type: "Armor",
    description:
      "Scale is a woven mesh of small metal scales. It covers the torso, arms, and lower body. The suit also includes a helmet",
    itemType: "armor",
    requirement: 13,
    value: 2,
    type: "light",
    price: "100",
    availability: "on",
    equiped: false,
    properties: ["Agility"],
  },
  {
    id: 123467,
    name: "Scale",
    description:
      "Scale is a woven mesh of small metal scales. It covers the torso, arms, and lower body. The suit also includes a helmet",
    itemType: "armor",
    value: 16,
    requirement: 15,
    type: "heavy",
    price: "100",
    availability: "on",
    equiped: false,
    properties: [],
  },
  {
    id: 123,
    name: "Adventurer’s pack",
    item_type: "Gear",
    description: "Pack",
    itemType: "basic",
    price: "1 ss",
    availability: "common",
  },
  {
    id: 1234,
    name: "Candle",
    item_type: "Gear",
    description: "candle",
    itemType: "basic",
    price: "1 ss",
    availability: "uncommon",
  },
];

const mocks: RestHandler[] = [
  createGetMock(PATH_URL, 200, pathsList),
  createGetMock(ANCESTRIES_URL, 200, ancestryList),
  createGetMock(SPELLS_URL, 200, spellList),
  createGetMock(EQUIPMENT_URL, 200, equipmentList),
];

export default mocks;
