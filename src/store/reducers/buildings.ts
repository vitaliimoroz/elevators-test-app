import BuildingType from "../../types/building";
import { ACTIONS } from "../actions/buildings";

const initialState = {
  buildings: [] as BuildingType[]
};

const buildingsReducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case ACTIONS.SET_NUM_ELEVATORS:
      return {
        ...state,
        buildings: state.buildings.map((building) =>
          building.id === action.payload.buildingId
            ? { ...building, elevators: action.payload.count }
            : building
        )
      };
    case ACTIONS.SET_NUM_FLOORS:
      return {
        ...state,
        buildings: state.buildings.map((building) =>
          building.id === action.payload.buildingId
            ? { ...building, floors: action.payload.count }
            : building
        )
      };
    case ACTIONS.SET_NUM_BUILDINGS:
      return {
        ...state,
        buildings: action.payload
      };
    default:
      return state;
  }
};

export default buildingsReducer;
