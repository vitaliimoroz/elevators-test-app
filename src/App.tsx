import React from "react";
import { useForm } from "react-hook-form";
import { Label, Input, Button, Box, Text } from "theme-ui";
import { uuidv4 } from "./utils/math";
import { useDispatch, useSelector } from "react-redux";
import { setNumBuildings } from "./store/actions/buildings";
import { selectBuildings } from "./store/selectors/buildings";
import Building from "./components/Building";
import BuildingType from "./types/building";
import styled from "styled-components";
import { resetElevatorsState } from "./store/actions/elevators";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

type Inputs = {
  buildings: number;
};

const App = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const buildings = useSelector(selectBuildings) as BuildingType[];

  const onSubmit = (data: { buildings: number }) => {
    const newBuildings = Array.from({ length: data.buildings }, (_, i) => ({
      id: uuidv4(),
      floors: 2,
      elevators: 1
    }));
    dispatch(setNumBuildings(newBuildings));
    dispatch(resetElevatorsState());
  };

  return (
    <AppContainer>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="buildings" mb={2}>
          Number of buildings:
        </Label>
        <Input
          id="buildings"
          mb={2}
          {...register("buildings", { required: true, min: 1 })}
        />
        {errors.buildings && (
          <Text
            sx={{
              color: "warning",
              fontSize: 2,
              fontWeight: "bold",
              display: "block"
            }}
          >
            Please enter a valid number of buildings.
          </Text>
        )}
        <Button type="submit">Generate Buildings</Button>
      </Box>

      {buildings.map((building) => (
        <Building key={building.id} building={building} />
      ))}
    </AppContainer>
  );
};

export default App;
