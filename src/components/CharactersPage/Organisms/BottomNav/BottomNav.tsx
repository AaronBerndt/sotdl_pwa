import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { indexOf } from "lodash";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiCharacter, GiHood, GiSecretBook } from "react-icons/gi";

const pathList = ["/characters", "/compendium", "/game_master"];
export default function BottomNav({ components }: any) {
  let { pathname } = useLocation();
  const [value, setValue] = useState(
    pathname === "/" ? 0 : indexOf(pathList, pathname)
  );
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      {components}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(pathList[newValue]);
        }}
        style={{ position: "sticky" }}
      >
        <BottomNavigationAction label="Characters" icon={<GiCharacter />} />
        <BottomNavigationAction label="Compendium" icon={<GiSecretBook />} />
        <BottomNavigationAction label="Game Master" icon={<GiHood />} />
      </BottomNavigation>
    </Paper>
  );
}
