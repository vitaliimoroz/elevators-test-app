import React from "react";
import { useSelector } from "react-redux";
import { ElevatorContainer, DoorLeft, DoorRight } from "./styled";
import { selectElevatorState } from "../../store/selectors/elevators";

interface ElevatorProps {
  buildingId: string;
  elevator: number;
}

const Elevator = ({ buildingId, elevator }: ElevatorProps) => {
  const elevatorState = useSelector((state) =>
    selectElevatorState(state, { buildingId, elevator })
  );
  const isOpen = elevatorState?.currentFloor > 1 && !elevatorState?.inTransit;
  return (
    <ElevatorContainer
      index={elevator}
      floor={elevatorState?.currentFloor || 1}
    >
      {elevatorState?.currentFloor}
      <DoorLeft isOpen={isOpen} />
      <DoorRight isOpen={isOpen} />
    </ElevatorContainer>
  );
};

export default Elevator;
