import {
  UpdateElevatorStateType,
  RemoveFloorCallType,
  RemoveDestinationFloorType,
  InitElevatorsType,
  AddFloorCallType,
  AddRemoveElevatorType,
  UpdateElevatorsGlobalStateType
} from "../../types/payloads";

export const ACTIONS = {
  UPDATE_ELEVATOR_STATE: "UPDATE_ELEVATOR_STATE",
  UPDATE_GLOBAL_STATE: "UPDATE_GLOBAL_STATE",
  REMOVE_DESTINATION_FLOOR: "REMOVE_DESTINATION_FLOOR",
  ADD_FLOOR_CALL: "ADD_FLOOR_CALL",
  REMOVE_FLOOR_CALL: "REMOVE_FLOOR_CALL",
  INIT_ELEVATORS: "INIT_ELEVATORS",
  ADD_ELEVATOR: "ADD_ELEVATOR",
  REMOVE_ELEVATOR: "REMOVE_ELEVATOR",
  RESET_STATE: "RESET_STATE"
};

export const resetElevatorsState = () => ({
  type: ACTIONS.RESET_STATE
});

export const updateElevatorState = (payload: UpdateElevatorStateType) => ({
  type: ACTIONS.UPDATE_ELEVATOR_STATE,
  payload
});

export const updateElevatorsGlobalState = (
  payload: UpdateElevatorsGlobalStateType
) => ({
  type: ACTIONS.UPDATE_GLOBAL_STATE,
  payload
});

export const removeDestinationFloor = (
  payload: RemoveDestinationFloorType
) => ({
  type: ACTIONS.REMOVE_DESTINATION_FLOOR,
  payload
});

export const removeFloorCall = (payload: RemoveFloorCallType) => ({
  type: ACTIONS.REMOVE_FLOOR_CALL,
  payload
});

export const addFloorCall = (payload: AddFloorCallType) => ({
  type: ACTIONS.ADD_FLOOR_CALL,
  payload
});

export const initElevators = (payload: InitElevatorsType) => ({
  type: ACTIONS.INIT_ELEVATORS,
  payload
});

export const addElevator = (payload: AddRemoveElevatorType) => ({
  type: ACTIONS.ADD_ELEVATOR,
  payload
});

export const removeElevator = (payload: AddRemoveElevatorType) => ({
  type: ACTIONS.REMOVE_ELEVATOR,
  payload
});
