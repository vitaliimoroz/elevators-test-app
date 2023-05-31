import { ElevatorsState } from "../../types/states";
import { ACTIONS } from "../actions/elevators";
import pathOr from "ramda/es/pathOr";
import assocPath from "ramda/es/assocPath";
import dissocPath from "ramda/es/dissocPath";
import lensPath from "ramda/es/lensPath";
import over from "ramda/es/over";
import filter from "ramda/es/filter";
import repeat from "ramda/es/repeat";
import compose from "ramda/es/compose";
import isEmpty from "ramda/es/isEmpty";
import reduce from "ramda/es/reduce";
import addIndex from "ramda/es/addIndex";
const reduceIndexed = addIndex(reduce);

const initialState: ElevatorsState = {
  elevatorStates: {},
  floorCalls: {}
};

const elevatorsReducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case ACTIONS.INIT_ELEVATORS: {
      const { buildingId, elevators } = action.payload;
      const elevatorStates = compose(
        reduceIndexed((acc, item, idx) => {
          acc[idx + 1] = item;
          return acc;
        }, {}),
        repeat({
          currentFloor: 1,
          direction: "up",
          inTransit: false,
          destinationFloors: []
        })
      )(elevators);
      return assocPath(["elevatorStates", buildingId], elevatorStates)(state);
    }
    case ACTIONS.ADD_ELEVATOR: {
      const { buildingId, elevator } = action.payload;
      return assocPath(["elevatorStates", buildingId, elevator], {
        currentFloor: 1,
        direction: "up",
        inTransit: false,
        destinationFloors: []
      })(state);
    }
    case ACTIONS.REMOVE_ELEVATOR: {
      const { buildingId, elevator } = action.payload;
      return dissocPath(["elevatorStates", buildingId, elevator])(state);
    }
    case ACTIONS.UPDATE_ELEVATOR_STATE: {
      const {
        buildingId,
        elevator,
        currentFloor,
        destinationFloor,
        inTransit
      } = action.payload;
      let currentElevatorState = pathOr(
        {},
        ["elevatorStates", buildingId, elevator],
        state
      );
      currentElevatorState.inTransit =
        inTransit || currentElevatorState.inTransit;
      currentElevatorState.currentFloor = currentFloor;
      if (destinationFloor) {
        currentElevatorState = assocPath(
          ["destinationFloors"],
          [...currentElevatorState.destinationFloors, destinationFloor]
        )(currentElevatorState);
        if (destinationFloor < currentFloor) {
          currentElevatorState.direction = "down";
        } else if (destinationFloor > currentFloor) {
          currentElevatorState.direction = "up";
        }
      }
      return assocPath(
        ["elevatorStates", buildingId, elevator],
        currentElevatorState
      )(state);
    }
    case ACTIONS.UPDATE_GLOBAL_STATE: {
      const { buildingId, nextState } = action.payload;

      return compose(
        assocPath(["floorCalls", buildingId], nextState.floorCalls),
        assocPath(["elevatorStates", buildingId], nextState.elevators)
      )(state);
    }

    case ACTIONS.REMOVE_DESTINATION_FLOOR: {
      const { buildingId, elevator, floor } = action.payload;
      const newState = over(
        lensPath(["elevatorStates", buildingId, elevator, "destinationFloors"]),
        filter((f: number) => f !== floor)
      )(state);

      const inTransit = !isEmpty(
        pathOr(
          [],
          ["elevatorStates", buildingId, elevator, "destinationFloors"],
          newState
        )
      );

      return assocPath(
        ["elevatorStates", buildingId, elevator, "inTransit"],
        inTransit
      )(newState);
    }

    case ACTIONS.ADD_FLOOR_CALL: {
      const { buildingId, floor } = action.payload;
      return assocPath(["floorCalls", buildingId, floor], true)(state);
    }

    case ACTIONS.REMOVE_FLOOR_CALL: {
      const { floor, buildingId } = action.payload;
      return dissocPath(["floorCalls", buildingId, floor])(state);
    }

    case ACTIONS.RESET_STATE: {
      return { ...initialState };
    }

    default:
      return state;
  }
};

export default elevatorsReducer;
