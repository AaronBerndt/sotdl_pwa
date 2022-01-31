const createAction = (name: string, description: string) => ({
  name,
  description,
});
export const actionObject = [
  createAction("Rush", "You move up to twice your Speed. "),
  createAction(
    "Retreat",
    "You move up to half your Speed. This movement does not trigger free attacks. "
  ),
  createAction(
    "Free Attack",
    "When a creature in your reach willingly moves out of your reach, you can use a triggered action to make an attack against that creature using a melee weapon you are wielding. "
  ),
  createAction(
    "Driving Attack",
    "You make the attack roll with  1 bane. On a success, you and the target move a  number of yards equal to your Strength modifier  in the same direction."
  ),
  createAction(
    "Guarded Attack",
    "You make the attack roll with 1 bane, but the next creature to make an attack roll against your Defense before the end of the round does so with 1 bane."
  ),
  createAction(
    "Lunging Attack",
    "You can increase your reach by  1 yard, but you make the attack roll with 1 bane."
  ),
  createAction(
    "Shifting Attack",
    "You make the attack roll with 1 bane. On a success, your movement does not trigger free attacks from the target until the end of the round."
  ),
  createAction(
    "Unbalancing Attack",
    "You make the attack roll with  1 bane. On a success, if the target is your Size or smaller, it must make an Agility challenge roll. On a failure, the target falls prone."
  ),

  createAction(
    "Called Shot",
    "You attack a specific location on the target’s body. You can use this option only if the target has a physical body. Make the attack roll with 2 banes. On a success, the attack has an additional effect as determined by the GM. Attacking a creature’s eyes might impose 1 bane on all rolls the target makes that rely on sight, for example."
  ),

  createAction(
    "Distant Shot",
    "You can attack a target that is beyond your weapon’s range, but no more than twice the weapon’s range. You make the attack roll with 1 bane."
  ),
  createAction(
    "Staggering Shot",
    "You make the attack roll with 2 banes. On a success, a target that is your Size or smaller must make an Agility challenge roll. On a failure, the target falls prone. "
  ),
  createAction(
    "Charge",
    "When you use an action to charge, you make attack rolls and challenge rolls with 1 bane until the end of the round. Move up to your Speed. At any point during your movement, make one attack with a melee weapon or with an attribute to knock down or shove a creature."
  ),

  createAction(
    "Knock Down",
    "Choose one target creature within your reach. Make a Strength attack roll against the target’s Agility. If the target is larger than you, make this roll with 1 bane for each point of Size it is larger. You make this roll with 1 boon if the target is smaller than you. On a success, the target falls prone."
  ),

  createAction(
    "Feint",
    "Choose one target creature within short range of you that can see you. Make an Agility attack roll against the target’s Perception. On a success, you make the next attack roll against the target’s Defense or Agility before the end of the next round with 2 boons. Alternatively, your movement does not trigger free attacks from the target for 1 round."
  ),
];


