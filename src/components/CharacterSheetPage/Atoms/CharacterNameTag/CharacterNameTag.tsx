import { Typography, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

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
  const { id } = useCharacterAttributes();
  const history = useHistory();
  return (
    <div onClick={() => history.push(`/edit_character/${id}`)}>
      <Typography variant="h6">{name}</Typography>
      <Box fontStyle="italic">
        <Typography variant="subtitle2">
          {`${ancestry} ${
            novicePath
              ? novicePath
              : expertPath
              ? expertPath
              : masterPath
              ? masterPath
              : ""
          } ${level}`}
        </Typography>
      </Box>
    </div>
  );
}
