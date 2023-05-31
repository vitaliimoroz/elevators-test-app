import Building from "../../types/building";

export const ACTIONS = {
  SET_NUM_FLOORS: "SET_NUM_FLOORS",
  SET_NUM_ELEVATORS: "SET_NUM_ELEVATORS",
  SET_NUM_BUILDINGS: "SET_NUM_BUILDINGS"
};

export const setNumFloors = (buildingId: string, count: number) => ({
  type: ACTIONS.SET_NUM_FLOORS,
  payload: { buildingId, count }
});
export const setNumElevators = (buildingId: string, count: number) => ({
  type: ACTIONS.SET_NUM_ELEVATORS,
  payload: { buildingId, count }
});
export const setNumBuildings = (buildings: Building[]) => ({
  type: ACTIONS.SET_NUM_BUILDINGS,
  payload: buildings
});
