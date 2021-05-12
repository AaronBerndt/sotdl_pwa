import React from "react";
import AttributeBoxList from "../../Molecules/AttributeBox/AttributeBox";
export default function AttributesView() {
  return (
    <div>
      <AttributeBoxList
        attributeList={[
          "Strength",
          "Agility",
          "Will",
          "Intellect",
          "Perception",
        ]}
      />
    </div>
  );
}
