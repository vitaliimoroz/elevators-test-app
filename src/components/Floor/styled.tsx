import styled from "styled-components";

export const FloorContainer = styled.div`
  width: 50px;
  height: 100px;
  border-top: 5px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  cursor: pointer;
`;

type FloorNumberProps = {
  isSelected: boolean;
};

export const FloorNumber = styled.div<FloorNumberProps>`
  font-size: 18px;
  color: ${({ isSelected }) => (isSelected ? "yellow" : "white")};
`;
