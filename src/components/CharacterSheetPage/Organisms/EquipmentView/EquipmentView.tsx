import React from "react";
export type Props = {
  sample: string;
};
export default function EquipmentView({ sample }: Props) {
  return <div>{sample}</div>;
}
