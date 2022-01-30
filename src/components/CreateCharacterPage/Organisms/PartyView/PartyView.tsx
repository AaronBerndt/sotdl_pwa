import React from "react";
export type Props = {
  sample: string;
};
export default function PartyView({ sample }: Props) {
  return <div>{sample}</div>;
}

