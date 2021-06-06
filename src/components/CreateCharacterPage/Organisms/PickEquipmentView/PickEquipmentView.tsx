import React from "react";
export type Props = {
  sample: string;
};
export default function PickEquipmentView({ sample }: Props) {
  return <div>{sample}</div>;
}
