import { lengthIsZero } from "./logic";
it("lengthIsZero", () => {
  expect(lengthIsZero([])).toBeTruthy();
  expect(lengthIsZero([1])).toBeFalsy();
});
