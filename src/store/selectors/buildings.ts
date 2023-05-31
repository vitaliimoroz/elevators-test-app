import { createSelector } from "reselect";
import identity from "ramda/es/identity";
import pathOr from "ramda/es/pathOr";

export const selectBuildings = createSelector(
  [pathOr([], ["buildings", "buildings"])],
  identity
);
