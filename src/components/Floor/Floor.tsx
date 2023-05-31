import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFloorCall } from "../../store/actions/elevators";
import { selectIsBuildingFloorSelected } from "../../store/selectors/elevators";
import { FloorContainer, FloorNumber } from "./styled";

interface FloorProps {
  floor: number;
  buildingId: string;
}

const Floor = ({ floor, buildingId }: FloorProps) => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state) =>
    selectIsBuildingFloorSelected(state, { buildingId, floor })
  );

  const handleFloorClick = () => {
    dispatch(addFloorCall({ buildingId, floor }));
  };

  return (
    <FloorContainer onClick={handleFloorClick}>
      <FloorNumber isSelected={isSelected}>{floor}</FloorNumber>
    </FloorContainer>
  );
};

export default Floor;
