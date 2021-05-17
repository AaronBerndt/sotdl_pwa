import React from "react";
export type Props = {
  sample: string;
};
export default function ActionList({ sample }: Props) {
  return <div>{sample}</div>;
}
