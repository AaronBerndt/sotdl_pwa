import { Button } from "@mui/material";
import styled from "styled-components";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

type Props = {
  currentHealth: number;
  onClick: Function;
};

const Div = styled.div`
  position: relative;
  cursor: pointer;
  text-align: center;
  margin-right: 10px;
`;

const HealthValue = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 27px;
`;

const Label = styled.div`
  font-size: 12px;
`;

export default function HealthWorkspaceButton({
  currentHealth,
  onClick,
}: Props) {
  const { health, injured } = useCharacterAttributes();

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={() => onClick()}
    >
      <Div>
        <HealthValue style={{ color: injured ? "red" : "" }}>
          {currentHealth}/{health}
        </HealthValue>
        <Label>Health</Label>
      </Div>
    </Button>
  );
}

