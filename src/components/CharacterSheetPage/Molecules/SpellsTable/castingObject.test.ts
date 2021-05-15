import createCastingObject from "./castingObject";
describe("createCastingObjectTest", () => {
  it("1 Power", () => {
    expect(createCastingObject(1)).toStrictEqual({
      0: 2,
      1: 1,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    });
  });

  it("3 Power", () => {
    expect(createCastingObject(3)).toStrictEqual({
      0: 4,
      1: 2,
      2: 1,
      3: 1,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    });
  });
});
