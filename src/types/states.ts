import ElevatorType from "./elevator";

export type ElevatorsState = {
  floorCalls: {
    // buildingId
    [key: string]: {
      // floor
      [key: number]: boolean;
    };
  };
  elevatorStates: {
    // buildingId
    [key: string]: {
      // elevator number
      [key: number]: ElevatorType;
    };
  };
};
