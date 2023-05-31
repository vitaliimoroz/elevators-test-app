type ElevatorType = {
  currentFloor: number;
  direction: "up" | "down" | "idle";
  inTransit: boolean;
  destinationFloors: number[];
};
export default ElevatorType;
