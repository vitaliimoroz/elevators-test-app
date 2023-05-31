import styled from "styled-components";

type ElevatorProps = {
  floor: number;
  index: number;
};

export const ElevatorContainer = styled.div<ElevatorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 95px;
  background-color: yellow;
  position: absolute;
  transition: all 1s ease 0s;
  bottom: ${({ floor }) => 100 * (floor - 1) + "px"};
  left: ${({ index }) => index * 50 + (index - 1) * 70 + "px"};
`;

type DoorProps = {
  isOpen: boolean;
};

export const DoorLeft = styled.div<DoorProps>`
  width: 50%;
  height: 100%;
  background-color: silver;
  border-right: 1px solid black;
  position: absolute;
  left: 0;
  transform-origin: left;
  transition: transform 1s ease 0s;
  transform: ${({ isOpen }: DoorProps) =>
      isOpen ? "translate(-100%, 0px);" : "translate(0px, 0px)"}
    0.5s linear;
`;

export const DoorRight = styled.div<DoorProps>`
  width: 50%;
  height: 100%;
  background-color: silver;
  border-left: 1px solid black;
  position: absolute;
  right: 0;
  transform-origin: right;
  transition: transform 1s ease 0s;
  transform: ${({ isOpen }: DoorProps) =>
    isOpen ? "translate(100%, 0px);" : "translate(0px, 0px)"};
`;
