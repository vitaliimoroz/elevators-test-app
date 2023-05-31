import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "theme-ui";
import useElevatorManager from "../../hooks/useElevatorManager";
import { setNumFloors, setNumElevators } from "../../store/actions/buildings";
import { addElevator, removeElevator } from "../../store/actions/elevators";
import BuildingType from "../../types/building";
import Elevator from "../Elevator";
import Floor from "../Floor";
import {
  BuildingContainer,
  ButtonsContainer,
  ElevatorsContainer
} from "./styled";

interface BuildingProps {
  building: BuildingType;
}

const Building = ({ building }: BuildingProps) => {
  const dispatch = useDispatch();
  useElevatorManager(building);

  const handleAddFloor = () => {
    dispatch(setNumFloors(building.id, building.floors + 1));
  };

  const handleRemoveFloor = () => {
    dispatch(setNumFloors(building.id, building.floors - 1));
  };

  const handleAddElevator = () => {
    dispatch(setNumElevators(building.id, building.elevators + 1));
    dispatch(
      addElevator({ buildingId: building.id, elevator: building.elevators + 1 })
    );
  };

  const handleRemoveElevator = () => {
    dispatch(setNumElevators(building.id, building.elevators - 1));
    dispatch(
      removeElevator({
        buildingId: building.id,
        elevator: building.elevators
      })
    );
  };

  return (
    <BuildingContainer>
      <ButtonsContainer>
        <Button variant="primary" onClick={handleAddFloor}>
          Add Floor
        </Button>
        <Button
          variant="secondary"
          onClick={handleRemoveFloor}
          disabled={building.floors === 2}
        >
          Remove Floor
        </Button>
        <Button variant="primary" onClick={handleAddElevator}>
          Add Elevator
        </Button>
        <Button
          onClick={handleRemoveElevator}
          variant="secondary"
          disabled={building.elevators === 1}
        >
          Remove Elevator
        </Button>
      </ButtonsContainer>
      {Array.from({ length: building.floors }, (_, index) => index + 1)
        .reverse()
        .map((floor) => (
          <Floor key={floor} floor={floor} buildingId={building.id} />
        ))}
      <ElevatorsContainer>
        {Array.from(
          { length: building.elevators },
          (_, index) => index + 1
        ).map((elevator, index) => (
          <Elevator elevator={elevator} buildingId={building.id} key={index} />
        ))}
      </ElevatorsContainer>
    </BuildingContainer>
  );
};

export default Building;
