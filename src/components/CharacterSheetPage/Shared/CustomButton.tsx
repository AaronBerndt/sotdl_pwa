import React from "react";
import MuiButton, { ButtonProps } from "@mui/material/Button";

interface ButtonOptions {
  onMouseDown: any;
  onTouchStart: any;
  onMouseUp: any;
  onMouseLeave: any;
  onTouchEnd: any;
}

const Button = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }> & ButtonOptions
) => {
  return <MuiButton {...props}>{props.children}</MuiButton>;
};

export default Button;


