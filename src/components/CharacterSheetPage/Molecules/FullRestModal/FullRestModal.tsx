import { Button, Dialog } from "@material-ui/core";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import useFullRest from "../../hooks/useFullRest";
import { GiCampfire } from "react-icons/gi";

export default function FullRestModal() {
  const { open, toggleOpen } = useToggle();

  const { mutate: takeFullRest } = useFullRest();

  return (
    <>
      <Button size="large" onClick={() => toggleOpen()}>
        <GiCampfire size="2em" />
      </Button>
      <Dialog open={open} onClose={() => toggleOpen()}>
        {[1, 2, 3, 4].map((day) => (
          <Button
            onClick={() => {
              takeFullRest({ days: day });
              toggleOpen();
            }}
          >
            {day} Day
          </Button>
        ))}
      </Dialog>
    </>
  );
}
