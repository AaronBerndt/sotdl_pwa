const createChoices = (choiceArray) =>
  choiceArray.map((choice) => ({
    name: choice,
    value: choice,
  }));

function plopIndex(plop) {
  return [
    plop.setGenerator("component", {
      description: "add new component",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Enter in component name",
        },
        {
          type: "checkbox",
          name: "componentType",
          message: "Enter in componentType",
          choices: createChoices([
            "Atoms",
            "Molecules",
            "Organisms",
            "Hook",
            "Context",
          ]),
        },
        {
          type: "checkbox",
          name: "componentGroup",
          message: "Enter in componentGroup",
          choices: createChoices([
            "CharacterSheetPage",
            "CharactersPage",
            "CreateCharacterPage",
            "CombatTrackerPage",
          ]),
        },
      ],
      actions: ({ name, componentType, componentGroup }) => {
        const fileName = {
          component: `${name}.tsx`,
          test: `${name}.test.tsx`,
          story: `${name}.stories.tsx`,
        };
        const createAddAction = (templateFile) => ({
          type: "add",
          path: `./src/components/${componentGroup}/${componentType}/${name}/${fileName[templateFile]}`,
          templateFile: `./templates/${templateFile}.hbs`,
        });
        return [
          createAddAction("component"),
          createAddAction("test"),
          createAddAction("story"),
        ];
      },
    }),
  ];
}

module.exports = plopIndex;
