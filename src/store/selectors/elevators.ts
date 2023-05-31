import { createSelector } from "reselect";
import identity from "ramda/es/identity";
import pathOr from "ramda/es/pathOr";
import { createParameterSelector } from "./createParameterSelector";

const getBuildingIdParam = createParameterSelector<string, string>(identity);

export const selectBuildingElevatorsState = createSelector(
  [getBuildingIdParam, identity],
  (buildingId, state) =>
    pathOr(null, ["elevators", "elevatorStates", buildingId], state)
);

const getElevatorParams = createParameterSelector<
  Record<string, string | number>,
  Record<string, string | number>
>(identity);

export const selectElevatorState = createSelector(
  [getElevatorParams, identity],
  ({ buildingId, elevator }, state) =>
    pathOr(null, ["elevators", "elevatorStates", buildingId, elevator], state)
);

export const selectBuildingFloorCalls = createSelector(
  [getBuildingIdParam, identity],
  (buildingId, state) =>
    pathOr({}, ["elevators", "floorCalls", buildingId], state)
);

const getFloorParams = createParameterSelector<
  Record<string, string | number>,
  Record<string, string | number>
>(identity);

export const selectIsBuildingFloorSelected = createSelector(
  [getFloorParams, identity],
  ({ buildingId, floor }, state) =>
    pathOr(false, ["elevators", "floorCalls", buildingId, floor], state)
);
