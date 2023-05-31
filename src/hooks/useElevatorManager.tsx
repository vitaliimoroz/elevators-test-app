import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initElevators,
  updateElevatorsGlobalState
} from "../store/actions/elevators";
import {
  selectBuildingElevatorsState,
  selectBuildingFloorCalls
} from "../store/selectors/elevators";
import dissocPath from "ramda/es/dissocPath";
import BuildingType from "../types/building";
import { ElevatorsStateType } from "../types/payloads";

const useElevatorManager = (building: BuildingType) => {
  const dispatch = useDispatch();
  const elevatorsState = useSelector((state) =>
    selectBuildingElevatorsState(state, building.id)
  );
  const floorCalls = useSelector((state) =>
    selectBuildingFloorCalls(state, building.id)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let nextState: ElevatorsStateType = {
        elevators: {},
        floorCalls: { ...floorCalls }
      };
      if (elevatorsState) {
        // Iterate through each elevator
        for (let elevator = 1; elevator <= building.elevators; elevator++) {
          const currentFloor = elevatorsState[elevator].currentFloor;
          const direction = elevatorsState[elevator].direction;
          const inTransit = elevatorsState[elevator].inTransit;
          const destinationFloors = elevatorsState[elevator].destinationFloors;

          // If elevator is in transit, continue moving towards the destination floor
          if (inTransit) {
            const nextFloor =
              direction === "up" ? currentFloor + 1 : currentFloor - 1;
            nextState.elevators[elevator] = {
              ...elevatorsState[elevator],
              direction,
              currentFloor: nextFloor,
              inTransit: true,
              destinationFloors
            };
            // If the destination floor is reached, remove it from the destination floors array
            if (nextFloor === destinationFloors[0]) {
              const pendingDestinationFloors = destinationFloors.filter(
                (f: number) => f !== nextFloor
              );
              nextState.elevators[elevator] = {
                ...nextState.elevators[elevator],
                currentFloor: nextFloor,
                inTransit: !!pendingDestinationFloors.length,
                destinationFloors: pendingDestinationFloors
              };
            }
          } else {
            nextState.elevators[elevator] = { ...elevatorsState[elevator] };
          }
        }
        // check for any pending floor calls
        const calledFloors = Object.keys(floorCalls).sort().reverse();
        if (calledFloors.length) {
          for (let i = 0; i < calledFloors.length; i++) {
            const floor = parseInt(calledFloors[i], 10);

            // Find the closest elevator that is not in transit
            let closestElevator = null;
            let closestDistance = Infinity;
            for (let elevator = 1; elevator <= building.elevators; elevator++) {
              const distance = Math.abs(
                nextState.elevators[elevator].currentFloor - floor
              );

              if (distance < closestDistance) {
                if (!nextState.elevators[elevator].inTransit) {
                  closestElevator = elevator;
                  closestDistance = distance;
                }
              }
            }
            // If a closest elevator is found, update its state and start moving towards the floor
            if (closestElevator) {
              nextState.elevators[closestElevator] = {
                ...nextState.elevators[closestElevator],
                destinationFloors: [floor],
                inTransit: true,
                direction:
                  nextState.elevators[closestElevator].currentFloor - floor > 0
                    ? "down"
                    : "up"
              };
              nextState.floorCalls = dissocPath([floor], nextState.floorCalls);
            }
          }
        }
        console.log(nextState);
        dispatch(
          updateElevatorsGlobalState({
            buildingId: building.id,
            nextState
          })
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, building.id, building.elevators, elevatorsState, floorCalls]);

  useEffect(() => {
    dispatch(
      initElevators({ buildingId: building.id, elevators: building.elevators })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building.id]);

  return null;
};

export default useElevatorManager;
