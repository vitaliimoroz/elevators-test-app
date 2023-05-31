export type RemoveFloorCallType = {
  buildingId: string;
  floor: number;
};

export type UpdateElevatorStateType = {
  buildingId: string;
  elevator: number;
  currentFloor: number;
  destinationFloor?: number;
  inTransit?: boolean;
};

export type ElevatorsStateType = {
  elevators: {
    [key: number]: {
      direction: string;
      currentFloor: number;
      destinationFloors?: number[];
      inTransit?: boolean;
    };
  };
  floorCalls: {
    [key: number]: boolean;
  };
};

export type UpdateElevatorsGlobalStateType = {
  buildingId: string;
  nextState: ElevatorsStateType;
};

export type RemoveDestinationFloorType = {
  buildingId: string;
  elevator: number;
  floor: number;
};

export type InitElevatorsType = {
  buildingId: string;
  elevators: number;
};

export type AddFloorCallType = {
  buildingId: string;
  floor: number;
};

export type AddRemoveElevatorType = {
  buildingId: string;
  elevator: number;
};
