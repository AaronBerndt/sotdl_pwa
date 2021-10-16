import { Typography, Box } from "@material-ui/core";
import { find } from "lodash";
import { Choices } from "../../CharacterSheetPageTypes";

type Props = {
  name: string;
  ancestry: string;
  level: number;
  novicePath: string;
  expertPath: string;
  masterPath: string;
  choices: Choices;
};

export default function CharacterNameTag({
  name,
  level,
  ancestry,
  novicePath,
  expertPath,
  masterPath,
  choices,
}: Props) {
  return (
    <div>
      <Typography variant="h6">{name}</Typography>
      <Box fontStyle="italic">
        <Typography variant="subtitle2">
          {`${ancestry}
${
  find(choices, {
    name: "Past Life",
  })
    ? find(choices, { name: "Past Life" })?.value
    : ""
}
	  ${
      masterPath
        ? masterPath
        : expertPath
        ? expertPath
        : novicePath
        ? novicePath
        : ""
    } ${level}`}
        </Typography>
      </Box>
    </div>
  );
}
