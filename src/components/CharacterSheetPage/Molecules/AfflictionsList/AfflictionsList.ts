import { Afflictions } from "../../CharacterSheetPageTypes";

const createAffliction = (name: string, description: string) => ({
  name,
  description,
});

export const afflictionsList: Afflictions = [
  createAffliction(
    "Asleep",
    "A sleeping creature is prone and unconscious. Another creature that can reach it can use an action to wake it up. Unless otherwise noted, taking damage removes this affliction."
  ),
  createAffliction(
    "Blinded",
    "A blinded creature cannot see. It treats its surroundings as totally obscured (see Obscurement). Other creatures make attack rolls with 1 boon against a blinded creature’s Defense or Agility. Perception challenge rolls that rely on sight automatically result in failure. Finally, the blinded creature’s Speed becomes 2 unless its normal Speed is lower"
  ),
  createAffliction(
    "Charmed",
    "A charmed creature sees the source of the affliction as a trusted friend and ally. The charmed creature cannot choose the creature that bestowed the affliction as the target of its attacks."
  ),
  createAffliction(
    "Compelled",
    "A compelled creature cannot use actions or move. Instead, during each fast turn (see Combat), the creature that bestowed the affliction can force the compelled creature to move up to its Speed or to use an action. The creature that bestowed the affliction makes all decisions on the compelled creature’s behalf."
  ),
  createAffliction("Dazed", "A dazed creature cannot use actions."),
  createAffliction(
    "Deafened",
    "A deafened creature cannot hear. Perception challenge rolls made to listen automatically result in failure."
  ),
  createAffliction(
    "Defenseless",
    "A defenseless creature cannot defend itself. Its Defense is 5, it cannot use actions, and its challenge rolls using attributes result in failure. The creature can still perceive its surroundings, however, and can make Perception challenge rolls as normal."
  ),
  createAffliction(
    "Diseased",
    "A diseased creature makes all attack rolls and challenge rolls with 1 bane."
  ),
  createAffliction(
    "Impaired",
    "A impaired creature makes all attack rolls and challenge rolls with 1 bane."
  ),
  createAffliction(
    "Poisoned",
    "A poisoned creature makes all attack rolls and challenge rolls with 1 bane."
  ),
  createAffliction(
    "Prone",
    "A prone creature lies on the ground. Other creatures ca move through its space. While prone, the creature can move by crawling or can use its move to stand up. The prone creature makes Strength and Agility rolls with 1 bane. Creatures that can reach the prone creature make all attack rolls against it with 1 boon, while creatures that cannot reach it make attack rolls against its Defense with 1 bane."
  ),
  createAffliction(
    "Slowed",
    "A slowed creature can take only a slow turn (see Combat), its Speed is halved, and it cannot benefit from increases to Speed."
  ),
  createAffliction(
    "Stunnned",
    "A stunned creature cannot move or use actions. The creature automatically gets a failure on any challenge rolls it would make. Other creatures make all attack rolls against the stunned creature with 1 boon."
  ),
  createAffliction(
    "Surprised",
    "A surprised creature cannot use actions, cannot move, and automatically gets a failure on any challenge rolls it would make"
  ),
  createAffliction(
    "Unconscious",
    "An unconscious creature is unable to act, move, or perceive its surroundings. The creature’s Defense is 5. It cannot use actions or move, and all its challenge rolls result in failure"
  ),
  createAffliction(
    "Frightened",
    "A frightened creature makes attack rolls and challenge rolls with 1 bane or 3 banes when it can see the source of the frightened affliction."
  ),
  createAffliction(
    "Grabbed",
    "The effects of the affliction depend on the creature’s Size. If the grabbed creature’s Size is equal to or smaller than that of the creature grabbing it, the grabbed creature cannot move away from the creature that grabbed it until it removes the affliction. If the grabbed creature’s Size is larger than that of the creature grabbing it, whenever the grabbed creature moves, the creature grabbing it can choose to move with it (by clinging to the grabbed creature’s body) or end the grab. (See Grab for more information on how to grab, and Escape for how to escape a grab.)"
  ),

  createAffliction(
    "Immobilized",
    "An immobilized creature has Speed 0 and cannot benefit from bonuses to Speed. Other creatures make all attack rolls against the immobilized creature with 1 boon."
  ),
];
