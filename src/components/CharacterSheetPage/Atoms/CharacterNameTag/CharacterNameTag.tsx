import { Typography, Box } from "@material-ui/core";

type Props = {
  name: string;
  ancestry: string;
  level: number;
  novicePath: string;
  expertPath: string;
  masterPath: string;
};

export default function CharacterNameTag({
  name,
  level,
  ancestry,
  novicePath,
  expertPath,
  masterPath,
}: Props) {
  return (
    <div>
      <Typography variant="h6">{name}</Typography>
      <Box fontStyle="italic">
        <Typography variant="subtitle2">
          {`${ancestry} ${
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
