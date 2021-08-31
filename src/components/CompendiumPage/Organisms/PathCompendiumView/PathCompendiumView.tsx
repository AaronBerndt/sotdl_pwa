import React from "react";
export type Props = {
  sample: string;
};
export default function PathCompendiumView({ sample }: Props) {
  return <div>{sample}</div>;
}
