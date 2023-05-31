import elevatorReducer from "../../../store/reducers/elevators";

describe("elevatorReducer", () => {
  const buildingId = "c22d5d7e-7160-4826-a8e5-ecae0c45a46f";
  it("should handle UPDATE_ELEVATOR_STATE action", () => {
    const initialState = {
      elevatorStates: {
        [buildingId]: {
          1: {
            currentFloor: 1,
            direction: "up",
            inTransit: false,
            destinationFloors: []
          }
        }
      },
      floorCalls: {}
    };

    const action = {
      type: "UPDATE_ELEVATOR_STATE",
      payload: {
        buildingId,
        elevator: 1,
        currentFloor: 3,
        destinationFloor: 5,
        inTransit: true
      }
    };

    const newState = elevatorReducer(initialState, action);

    expect(newState.elevatorStates[buildingId][1].currentFloor).toEqual(3);
    expect(newState.elevatorStates[buildingId][1].destinationFloors).toContain(
      5
    );
    expect(newState.elevatorStates[buildingId][1].inTransit).toEqual(true);
  });

  it("should handle REMOVE_DESTINATION_FLOOR action", () => {
    const initialState = {
      elevatorStates: {
        [buildingId]: {
          1: {
            currentFloor: 1,
            direction: "up",
            inTransit: false,
            destinationFloors: [2, 4, 5]
          }
        }
      },
      floorCalls: {}
    };

    const action = {
      type: "REMOVE_DESTINATION_FLOOR",
      payload: { buildingId, elevator: 1, floor: 4 }
    };

    const newState = elevatorReducer(initialState, action);

    expect(
      newState.elevatorStates[buildingId][1].destinationFloors
    ).not.toContain(4);
  });

  it("should handle REMOVE_FLOOR_CALL action", () => {
    const initialState = {
      numElevators: 1,
      elevatorStates: {
        [buildingId]: {
          1: {
            currentFloor: 1,
            direction: "up",
            inTransit: false,
            destinationFloors: []
          }
        }
      },
      floorCalls: {
        [buildingId]: {
          3: true,
          6: true
        }
      }
    };

    const action = {
      type: "REMOVE_FLOOR_CALL",
      payload: { buildingId, floor: 3 }
    };

    const newState = elevatorReducer(initialState, action);

    expect(newState.floorCalls[buildingId][3]).toBeUndefined();
  });

  it("should handle ADD_FLOOR_CALL action", () => {
    const initialState = {
      numElevators: 1,
      elevatorStates: {
        [buildingId]: {
          1: {
            currentFloor: 1,
            direction: "up",
            inTransit: false,
            destinationFloors: []
          }
        }
      },
      floorCalls: {
        [buildingId]: {
          3: true,
          6: true
        }
      }
    };

    const action = {
      type: "ADD_FLOOR_CALL",
      payload: { buildingId, floor: 4 }
    };

    const newState = elevatorReducer(initialState, action);

    expect(newState.floorCalls[buildingId][4]).toBeTruthy();
  });
});
